import { DOCUMENT, ɵparseCookieValue as parseCookieValue } from '@angular/common';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  parseCount: number = 0;
  lastToken?: string;
  lastCookieString: string = '';

  constructor(
    @Inject(DOCUMENT) private doc: any) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headerName = "X-XSRF-TOKEN";
    let token = this.getToken('X-XSRF-COOKIE') as string;
    const lcUrl = request.url.toLowerCase();

    if (!token ||
      lcUrl.startsWith('http://') ||
      lcUrl.startsWith('https://') ||
      request.headers.has(headerName)) {
      return next.handle(request);
    }

    request = request.clone({ headers: request.headers.set(headerName, token) });

    return next.handle(request);
  }

  getToken(cookieName: string): string | undefined {
    const cookieString = this.doc.cookie || '';
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken = parseCookieValue(cookieString, cookieName) ?? undefined;
      this.lastCookieString = cookieString;
    }

    return this.lastToken;
  }
}
