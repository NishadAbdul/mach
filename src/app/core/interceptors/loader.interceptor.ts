import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpLoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  count: number = 0;
  constructor(private checkStatusService: HttpLoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.get('globalLoader') !== 'stop') {
      this.checkStatusService.busy();
      return next.handle(req).pipe(
        finalize(() => {
          this.checkStatusService.idle();
        })
      );
    } else {
      return next.handle(req)
    }
    
    
  }
}