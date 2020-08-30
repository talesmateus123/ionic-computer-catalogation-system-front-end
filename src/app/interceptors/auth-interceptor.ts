import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationControllerService } from '../pages/authentication/login/shared';

@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authenticationControllerService: AuthenticationControllerService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const securityKey: string = this.authenticationControllerService.getSessionSecurityKey();

        if (securityKey) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + securityKey)
            });
            return next.handle(authReq);
        }
        return next.handle(request);
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
