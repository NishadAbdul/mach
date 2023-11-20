import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { HttpCancelService } from '../helper/cancelpendingrequest.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private traceId: string | null = '';
  constructor(private modalService: ErrorHandlerService,
    private httpCancelService: HttpCancelService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpRequest = request.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });
    return next.handle(request).pipe(
      takeUntil(this.httpCancelService.onCancelPendingRequests()),
      tap(evt => {
        this.traceId = '';
        if (evt instanceof HttpResponse) {
            console.log(evt)    
          if (!window.navigator.onLine) {
            this.modalService.openDialog(
              {
                title : 'Offline!',
                message : 'Unable to conenct to internet. Please check your network connection.',
                icon: 'cloud_off'
              }
            );
          }
        }
      }), catchError((error: HttpErrorResponse) => {    

        if (error instanceof HttpErrorResponse) {
          this.handleErrors(error);
        }
        return throwError(error);
      }));
  }

  handleErrors(error: any) {
    if (window.navigator.onLine && error.status !== 401 && error.status !== 422) {
      this.modalService.openDialog({ traceId : this.traceId, message: error?.error?.detail, title: error?.error?.title })
    } else if (navigator.onLine && error.status === 401) {
        this.modalService.openDialog({
          title : 'Timed Out!',
          message : `<p>Your Session Timed Out. </p><p> Don't worry, we saved the application for you. Please resume the application using the application confirmation ID that we emailed you.</p></p>`,
          icon: 'not_interested',
          action: 'exit'
        });
    }
  }
}
