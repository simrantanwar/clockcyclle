import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/index';
import { LocalService } from '../shared-services/local.service';

const LOGIN_URL = `${environment.Config.apiUrl}login`;
const FORGOT_URL= `${environment.Config.apiUrl}forgotPassword`;
const VERIFY_URL= `${environment.Config.apiUrl}verifyResetPasswordLink`;
const RESET_URL= `${environment.Config.apiUrl}resetPassword`;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,private _localService:LocalService) { }

  login(requestBody) {
    return this.http.post(LOGIN_URL, requestBody);
  }
forgotPassword(requestBody)
{
  return this.http.post(FORGOT_URL,requestBody)
}
  saveSessionInLocal(result) {
    this._localService.saveInLocal('token',result.token);
    this._localService.saveInLocal('userImage', result.userImage);
    this._localService.saveInLocal('_id', result._id);
    this._localService.saveInLocal('userName', result.username);
    
  
  }

  removeSessionFromLocal(){
    this._localService.removeFromLocal('token');
    this._localService.removeFromLocal('userImage');
    this._localService.removeFromLocal('_id');
    this._localService.removeFromLocal('userName');
  }

  validateToken(header)
  {
    return this.http.post(VERIFY_URL,{headers:header})
  }

  resetPassword(requestBody)
  {
    return this.http.post(RESET_URL,requestBody)
  }
}
