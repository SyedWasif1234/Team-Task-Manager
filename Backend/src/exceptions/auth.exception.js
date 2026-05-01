// COUSTOM ERROR CLASS FOR AUTH

import {BaseException} from "./BaseException.js";
import { AuthErrorCode } from "../dtos/ErrorCode/authErrorCode.js";

export class AuthException extends BaseException{

    constructor(ErrorConfig , message){
        super(ErrorConfig , message);
    }

    static invalidCredentials() {
        return new AuthException(AuthErrorCode.AUTH_INVALID_CREDENTIALS);
    }

    static userNotFound() {
        return new AuthException(AuthErrorCode.USER_NOT_FOUND);
    }

    static tokenMissing(){
        return new AuthException(AuthErrorCode.AUTH_TOKEN_MISSING);
    }

    static tokenInvalid(){
        return new AuthException(AuthErrorCode.AUTH_TOKEN_INVALID);
    }

    static tokenExpired(){
        return new AuthException(AuthErrorCode.AUTH_TOKEN_EXPIRED);
    }

    static forbidden(){
        return new AuthException(AuthErrorCode.AUTH_FORBIDDEN);
    }

    static userAlreadyExists(){
        return new AuthException(AuthErrorCode.USER_ALREADY_EXISTS);
    }


}