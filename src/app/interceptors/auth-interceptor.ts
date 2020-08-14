import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../pages/authentication/login/shared/services/session-manager.service';

@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private sessionManagerService: SessionManagerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authorization: string = this.sessionManagerService.getSessionAuthorizationToken();
        
        if(authorization) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + authorization)
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
