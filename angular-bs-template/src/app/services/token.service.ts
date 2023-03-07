import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from '../models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient ) { }

  saveToken(token: string) {
    setCookie('oruedar-token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('oruedar-token');
    return token;
  }

  removeToken() {
    removeCookie('oruedar-token');
  }

  saveRefreshToken(token?: string) {
    setCookie('refresh-oruedar-token', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refresh-oruedar-token');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refresh-oruedar-token');
  }

  saveTokenId(token: number) {
    setCookie('oruedar-tokenId', token, { expires: 365, path: '/' });
  }

  getTokenId() {
    const token = getCookie('oruedar-tokenId');
    return token;
  }

  removeTokenId() {
    removeCookie('oruedar-tokenId');
  }

  saveTokenUserName(token: string) {
    setCookie('oruedar-token-UserName', token, { expires: 365, path: '/' });
  }

  getTokenUserName() {
    const token = getCookie('oruedar-token-UserName');
    return token;
  }

  removeTokenUserName() {
    removeCookie('oruedar-token-UserName');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
       const expirationTime = new Date(decodeToken.exp * 1000);
       const today = new Date();
       return expirationTime > today;
     }
     return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }

    return true;
  }

  refreshToken() {

    const accessToken = this.getToken();
    const  refreshToken = this.getRefreshToken();

    return this.http.post<ResponseLogin>(`${this.apiUrl}/Token/RenewToken`, {
      accessToken,
      refreshToken
    })
    .pipe(
      tap(response => {
        this.saveToken(response.authToken);
        this.saveRefreshToken(response.refreshToken);
      })
    );

    }



}
