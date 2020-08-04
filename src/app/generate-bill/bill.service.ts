import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  generateBill(bill: any) {
    let api = `${environment.serverUrl}/api/bill/new`
    let body = JSON.stringify(bill);
    console.log(body);
    return this.http.post(api, body, this.httpOptions).pipe(res => {
      return res;
    })
  }

  getBillHistory() {
    const api = `${environment.serverUrl}/api/bill/all`;

    return this.http.get(api, this.httpOptions).pipe(res => {
      return res;
    })
  }
}
