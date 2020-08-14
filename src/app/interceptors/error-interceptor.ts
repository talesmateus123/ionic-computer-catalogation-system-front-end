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
                    //console.log(error.status)

                    let errorMessage = '';
                    if(error.status === 0) {
                        //errorMessage = `Falha ao obter conexão com o servidor.`;
                    }
                    else {
                        //errorMessage = `Server error: ${error}\nMessage: `;
                    }
                    this.toastMessageControllerService.errorMessageAlert(errorMessage);
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
