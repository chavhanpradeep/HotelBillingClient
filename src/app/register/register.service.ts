import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  addUser(user: any) {
    const api = environment.serverUrl + '/api/account/users';
    const body = JSON.stringify(user);
    return this.http.post(api, body, this.httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
