import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastMessageControllerService } from '../shared-resources';

@Injectable({ providedIn: 'root' })

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastMessageControllerService: ToastMessageControllerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    //console.log(error)
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
