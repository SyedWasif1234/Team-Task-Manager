// AUTH SERVICE — BUSINESS LOGIC

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import UserRepositorie from '../repositories/user.repositorie.js';
import { AuthException } from '../exceptions/auth.exception.js';

// Lazy-load Resend only when the API key is configured
async function sendPasswordResetEmail(email, username, resetUrl) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // In dev / no-email mode, just log the link
    console.warn(`[WARN] RESEND_API_KEY not set. Reset URL for ${email}: ${resetUrl}`);
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: 'Team Task Manager <no-reply@yourdomain.com>',
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #111;">Reset your password</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>We received a request to reset the password for your Team Task Manager account.</p>
        <p>Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}"
           style="display:inline-block; margin: 20px 0; padding: 12px 28px; background:#6366f1; color:#fff;
                  text-decoration:none; border-radius:8px; font-weight:bold; font-size:15px;">
          Reset Password
        </a>
        <p style="color:#666; font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border:none; border-top:1px solid #eee; margin: 24px 0;" />
        <p style="color:#999; font-size:12px;">© ${new Date().getFullYear()} Team Task Manager</p>
      </div>
    `,
  });
}

class AuthService {

  _signToken(user) {
    return jwt.sign(
      {
        id:       user.id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }

  async login(email, password) {
    const user = await UserRepositorie.GetByEmail(email);
    const fakeHash = '$2b$10$7eqJtq9Idb9RzzO.TC2E5JwQjUhBa';

    if (!user) {
      await bcrypt.compare(password, fakeHash); // Prevent timing attacks
      throw AuthException.userNotFound();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw AuthException.invalidCredentials();
    }

    const token = this._signToken(user);
    console.log("Tokem :" , token)
    return { user, token };
  }

  async signup(username, email, password) {
    const existingUser = await UserRepositorie.GetByEmail(email);
    if (existingUser) {
      throw AuthException.userAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepositorie.create({ username, email, password: hashedPassword });

    const token = this._signToken(user);
    return { user, token };
  }

  async forgotPassword(email) {
    const user = await UserRepositorie.GetByEmail(email);

    // Always return the same message to prevent email enumeration attacks
    const genericMsg = 'If that email exists, a reset link has been sent.';

    if (!user) return { genericMsg };

    // Generate a secure random token and hash it for storage
    const rawToken    = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    await UserRepositorie.update(user.id, {
      resetToken:       hashedToken,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl    = `${frontendUrl}/reset-password?token=${rawToken}`;

    await sendPasswordResetEmail(email, user.username, resetUrl);

    return { genericMsg };
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user        = await UserRepositorie.findByResetToken(hashedToken);

    if (!user) {
      throw new Error('Invalid or expired reset link. Please request a new one.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserRepositorie.update(user.id, {
      password:          hashedPassword,
      lastPasswordChange: new Date(),
      resetToken:        null,
      resetTokenExpiry:  null,
    });

    return true;
  }
}

export default new AuthService();
