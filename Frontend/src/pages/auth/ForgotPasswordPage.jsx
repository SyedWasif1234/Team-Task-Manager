import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { authApi } from '../../api/auth.api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
          </Link>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--success)]/15 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-[var(--success)]" />
              </div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">Check your email</h1>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                If an account exists for {email}, we've sent password reset instructions.
              </p>
              <Link to="/login">
                <Button variant="ghost" icon={ArrowLeft}>Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Forgot password?</h1>
              <p className="text-sm text-[var(--text-secondary)] mb-6">Enter your email and we'll send you a reset link.</p>

              {error && (
                <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-sm rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />
                <Button type="submit" className="w-full" loading={loading}>
                  Send Reset Link
                </Button>
              </form>

              <p className="text-sm text-[var(--text-muted)] text-center mt-6">
                <Link to="/login" className="text-[var(--accent)] hover:underline flex items-center justify-center gap-1">
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
