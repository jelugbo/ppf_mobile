import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS  =  'https://rccgnappf.org/api/v1';
  AUTH_SERVER_ADDRESS1  =  'http://4cc7cff2e4f4.ngrok.io/api/v1';
  authSubject  =  new  BehaviorSubject(false);
  constructor(private  httpClient: HttpClient, private  storage: Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
        tap(async (res: AuthResponse ) => {

          if (res.user) {
              console.log(res.user);
              await this.storage.set('ACCESS_TOKEN', res.user.AccessToken);
              await this.storage.set('EXPIRES_IN', res.user.ExpiresIn);
              await this.storage.set('USER_ID', res.user.Id);
              await this.storage.set('USER_PASS', res.user);
              this.authSubject.next(true);
          }
        })

    );
  }

  load(item): Observable<AuthResponse> {
    return this.httpClient.get<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}${item}`).pipe(
        tap(async (res: AuthResponse ) => {

          if (res.info) {
            this.authSubject.next(true);
          }
        })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth`, user).pipe(
        tap(async (res: AuthResponse) => {
          if (res.user) {
              localStorage.setItem('LOGGED_IN', 'true');
              await this.storage.set('ACCESS_TOKEN', res.user.AccessToken);
              await this.storage.set('EXPIRES_IN', res.user.ExpiresIn);
              await this.storage.set('USER_ID', res.user.Id);
              await this.storage.set('USER_PASS', res.user);
              this.authSubject.next(true);
          }
        })
    );
  }

  async logout() {
      localStorage.removeItem('LOGGED_IN');
      await this.storage.remove('ACCESS_TOKEN');
      await this.storage.remove('EXPIRES_IN');
      this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
