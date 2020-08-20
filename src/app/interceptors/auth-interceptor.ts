import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationControllerService, User } from '../pages/authentication/login/shared';


@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authenticationControllerService: AuthenticationControllerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let sessionUser: User = this.authenticationControllerService.getSessionUser();
        
        if(sessionUser) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + sessionUser.token)
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
}
