import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../app.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private appState: AppState) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    let isTranslate = false;
    if (url === "./assets/i18n/ar.json" || url === "./assets/i18n/en.json") {
      isTranslate = true;
    }
    if (request.params.get('setbaseurl') !== 'stop' && !isTranslate) {
      let baseUrl = environment.baseUrl;
      request = request.clone({ url: `${baseUrl}${request.url}` });
    }
    return next.handle(request);
  }
}
