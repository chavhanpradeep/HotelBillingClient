import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class BillingHistoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getBillHistory() {
    const api = `${environment.serverUrl}/api/bill/all`;

    return this.http.get(api, this.httpOptions).pipe(res => {
      return res;
    })
  }
}
