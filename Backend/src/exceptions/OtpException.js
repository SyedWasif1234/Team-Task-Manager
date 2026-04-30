// HERE WE WILL WRITE ALL THE COUSTOM ERROR LOGIC RELATED TO ONE-TIME-PASSWORD

import {BaseException} from "./BaseException.js";
import { AuthErrorCode } from "../dtos/ErrorCode/authErrorCode.js";

export class OtpException extends BaseException{ 
    constructor(ErrorConfig , message){
        super(ErrorConfig , message);
    }

    static invalid (){
        return new OtpException(AuthErrorCode.OTP_INVALID);
    }

    static tooManyAttempts(){
        return new OtpException(AuthErrorCode.OTP_TOO_MANY_ATTEMPTS);
    }

    static expired(){
        return new OtpException(AuthErrorCode.OTP_EXPIRED);
    }

}