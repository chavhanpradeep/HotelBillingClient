import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import { User } from '../models/user.model';
// import { Context } from 'vm';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let params = new HttpParams()
      .append('username', context.username)
      .append('password', context.password)
      .append('grant_type', 'password')
      .append('scope', 'openid email phone profile offline_access roles');

    let requestBody = params.toString();

    return this.http.post<any>(`${environment.serverUrl}/connect/token`, requestBody, { headers: header }).pipe(
      map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(data.access_token));
        const creddata = {
          username: context.username,
          token: data.access_token,
          user: new User()
        };

        this.credentialsService.setCredentials(creddata, context.remember);

        this.getCurrentUser(data.access_token).subscribe(user => {

          const creddata = {
            username: context.username,
            token: data.access_token,
            user: user
          };
          this.credentialsService.setCredentials(creddata, context.remember);
        }, (error: any) => {
          console.log(`error => ${error.message}`);
        });
        return data;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials(null, null);
    return of(true);
  }

  get isAdmin() {
    if (this.credentialsService != null && this.credentialsService.roles != null) {
      return this.credentialsService.roles.indexOf('administrator') > -1;
    } else {
      return null;
    }
  }

  getCurrentUser(accessToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      })
    };

    const api = `${environment.serverUrl}/api/account/users/me`;
    return this.http.get(api, httpOptions).pipe(response => {
      return response;
    });
  }
}
