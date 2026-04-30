import { AuthResponceDto } from "../dtos/responce/auth.responce.dto.js";
import { AuthRequestDto } from "../dtos/request/auth.request.dto.js";
import AuthService from "../services/auth.service.js"
import {getCookieOptions , clearCookieOptions} from "../lib/cookieOption.js";

class AuthController {
  
  async login(req , res , next) {
    try {
      const dtoResult = AuthRequestDto.validateLogin(req.body) ;
      if (dtoResult instanceof Error) throw dtoResult;
      
      const {email , password} = dtoResult;

      const {user , token } = await AuthService.login(email , password) ;

      res.cookie("token" , token , getCookieOptions()) ;

      return res.status(200).json({
        success:true ,
        data:AuthResponceDto.toUserResponce(user)
      })
      
    } catch (error) {
      console.log("Error occured in auth.controller.js while loging in :" , error) ;
      next(error) ;
    }
  }

  async signup(req , res , next){
    try{
      const dtoResult = AuthRequestDto.validateSignup(req.body);
      if (dtoResult instanceof Error) throw dtoResult;
      
      const {username , email , password} = dtoResult;

      const {user , token} = await AuthService.signup(username , email , password) ;

      res.cookie("token" , token , getCookieOptions());

      const userPayload = AuthResponceDto.toUserResponce(user);
      return res.status(200).json({
        success: true,
        status: true,
        message: "Signup Successful",
        user: userPayload,
        data: userPayload,
      })

    }
    catch(error){
      console.log("Error occured in auth controller while signup :" , error);
      next(error);
    }
  }


  async logout(req , res , next) {
    try{
      const cookieOptions = clearCookieOptions();

      res.clearCookie("token" , cookieOptions) ;
      res.clearCookie("drafti.me", {
          ...cookieOptions,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

      return res.status(200).json(
        AuthResponceDto.toGenericResponse("Logged out Successfully") 
      )
    } catch(error) {
      next(error) ;
    }
  }

  async checkAuth(req , res , next) {
    try {
      return res.status(200).json({
        success: true,
        message: "User authenticated successfully",
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  };

  async forgotPassword(req , res , next) {
    try {
      const dtoResult = AuthRequestDto.forgotPassword(req.body);
      if (dtoResult instanceof Error) throw dtoResult;

      const {email} = dtoResult;
      const {genericMsg} = await AuthService.forgotPassword(email);

      return res.status(200).json(
        AuthResponceDto.toGenericResponse(genericMsg)
      );
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const dtoResult = AuthRequestDto.resetPassword(req.body);
      if (dtoResult instanceof Error) throw dtoResult;

      const { token, newPassword } = dtoResult;

      await AuthService.resetPassword(token, newPassword);

      return res.status(200).json(
        AuthResponceDto.toGenericResponse("Password reset successfully. You can now log in.")
      );
    } catch (error) {
      console.error("Error in resetPassword:", error);
      next(error);
    }
  }
}

export default new AuthController();
