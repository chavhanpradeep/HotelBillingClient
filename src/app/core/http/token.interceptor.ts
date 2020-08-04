import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public cred: CredentialsService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cred.credentials) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cred.credentials.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }

        //const error = err.error.message || err.statusText;
        const error = err; //err.error || err.statusText;
        return throwError(error);
      })
    );

    //return next.handle(request);
  }
}
