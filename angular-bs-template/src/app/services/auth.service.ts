import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { checkToken } from '../interceptor/token-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  login(user: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}Auth/login`, {
      user,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.authToken);
        this.tokenService.saveRefreshToken(response.refreshToken);
        this.tokenService.saveTokenId(response.userId)
        this.tokenService.saveTokenUserName(response.userName)
      })
    );
  }

  getDataUser() {
    return this.user$.getValue();
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/Auth/me`, { context: checkToken() })
    .pipe(
      tap(user => {
        console.log("logeado", user)
        this.user$.next(user);
      })
    );
  }

}
