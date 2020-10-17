import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastMessageControllerService, LoadingModalControllerService } from '../shared-resources';
import { AuthenticationControllerService } from 'src/app/pages/authentication/login/shared';
import { RouteRedirectorService } from 'src/app/pages/shared-resources';

@Injectable({ providedIn: 'root' })

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastMessageControllerService: ToastMessageControllerService,
        private loadingModalControllerService: LoadingModalControllerService,
        private routeRedirectorService: RouteRedirectorService,
        private authenticationControllerService: AuthenticationControllerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorTitle: string;
                    let errorMessage = '';
                    switch (error.status) {
                        case 0:
                            this.routeRedirectorService.redirectToNoConnectionPage();
                            break;
                        case 401:
                            errorTitle = `Acesso negado`;
                            errorMessage = `E-mail ou senha invalidos.`;
                            this.authenticationControllerService.logout();
                            break;
                        case 403:
                            errorTitle = `Proibido`;
                            errorMessage = `Você precisa logar para continuar.`;
                            this.authenticationControllerService.logout();
                            break;
                        case 422:
                            errorTitle = `${error.error.error}`;
                            const errors: any[] = error.error.errors;
                            errors.forEach(error => {errorMessage = `${errorMessage}${error.fieldName}: ${error.message} <br>`; });
                            break;
                        default:
                            errorTitle = `${error.error.error}`;
                            errorMessage = `${error.error.message}`;
                    }
                    if (errorTitle) {
                        this.toastMessageControllerService.errorMessageAlert(errorTitle, errorMessage);
                    }
                    this.loadingModalControllerService.loadingDismiss();
                    return throwError(errorMessage);
                })
            );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
