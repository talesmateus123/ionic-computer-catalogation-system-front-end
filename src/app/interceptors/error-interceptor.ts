import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastMessageControllerService } from '../shared-resources';
import { AuthenticationControllerService } from 'src/app/pages/authentication/login/shared';

@Injectable({ providedIn: 'root' })

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastMessageControllerService: ToastMessageControllerService,
        private authenticationControllerService: AuthenticationControllerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorTitle = `Erro!`;
                    let errorMessage = '';
                    if(error.status === 0) {
                        errorMessage = `Falha ao obter conexão com o servidor.`;
                    }
                    else if (error.status === 422) {
                        errorTitle = `${error.error.error}`;
                        let errors: any[] = error.error.errors;                        
                        for (let index in errors)
                            errorMessage = errorMessage + errors[index].fieldName + ": " + errors[index].message + "<br>";
                    }
                    else if (error.status === 403) {
                        errorTitle = `Proibido`;
                        errorMessage = `Você precisa logar para continuar.`;
                        this.authenticationControllerService.logout();
                    }
                    else {                        
                        errorTitle = `${error.error.error}`;
                        errorMessage = `${error.error.message}`;
                    }
                    this.toastMessageControllerService.errorMessageAlert(errorTitle, errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
