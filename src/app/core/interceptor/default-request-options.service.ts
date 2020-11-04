import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultRequestOptionsService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = this.authService.accessTokenVal ? this.authService.accessTokenVal : '';

    // Clone the request to add the new header.
    let authReq;
    let headers: any;

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + authHeader
    });

    authReq = req.clone({ headers });

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }

}
export const RequestOptionsProvider = { provide: HTTP_INTERCEPTORS, useClass: DefaultRequestOptionsService, multi: true };
