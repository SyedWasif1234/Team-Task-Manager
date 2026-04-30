// AUTH SCHEMA VALIDATION

export class AuthRequestDto {
  static validateLogin(body) {
    const { email, password } = body;
    if (!email || !password) {
      return new Error("email and password are required");
    }

    return { email: email.trim().toLowerCase(), password };
  }

  static validateSignup(body) {
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return new Error("username , email and password are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    return { username, email: email.trim().toLowerCase(), password };
  }

  static forgotPassword(body) {
    const {email} = body ;
    if(!email) {
        return new Error("Email is required") ;
    }
    return {email:email.trim().toLowerCase()}
  }

  static resetPassword(body) {
    const {token , newPassword} = body ;
    if(!token || !newPassword){
        return new Error("Token and new password is required");
    }

    if(newPassword?.length < 8){
        return new Error("Password must be atleast of 8 charecters");
    }

    return {token , newPassword}
  }


}
