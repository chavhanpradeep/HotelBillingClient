import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    const api = `${environment.serverUrl}/api/discount/all`;
    return this.http.get(api).pipe(res => {
      return res;
    });
  }

  addNew(menuItem: any) {
    const api = `${environment.serverUrl}/api/discount/new`;
    let body = JSON.stringify(menuItem);
    return this.http.post(api, body, this.httpOptions).pipe(res => {
      return res;
    });
  }

  edit(menuItem: any) {
    const api = `${environment.serverUrl}/api/discount/update`;
    let body = JSON.stringify(menuItem);
    return this.http.put(api, body, this.httpOptions).pipe(res => {
      return res;
    });
  }

  delete(id: number) {
    const api = `${environment.serverUrl}/api/discount/delete?id=${id}`;
    return this.http.delete(api).pipe(res => {
      return res;
    });
  }
}
