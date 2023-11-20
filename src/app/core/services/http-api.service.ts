import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { AppState } from '../../app.service';
import { BaseConfigService } from '../../baseConfig.service';

@Injectable()
export class HttpApiService {
  private authorization = "Basic QWN1YW50X0FkbWluQGZpbmFzdHJhLmNvbTpBNWV6XjheREV6dF5TM1N5";
  constructor(
    private httpClient: HttpClient,
    private baseConfig: BaseConfigService,
    private modalService: ErrorHandlerService,
    private appState: AppState) { 
  }

  public fetch(url: string): Observable<any> {
    return this.httpClient.get(url)
      .pipe(tap(
        data => data
      ));
  }

  public isValidUser(): Observable<any> {
    return this.httpClient.get<any>('session/validate').pipe(tap(
      data => {
        if (!data.isSessionValid) {
          const message = `${data.activeUserFullName}  is working on this application. If you want to make changes to this application, please open it again.`;
          this.modalService.openDialog({ message: message, action: 'exit', title: 'Alert', icon: 'warning' });
        }
      }
    ));
  }

  public getBlob(url: string): Observable<Blob> {
    const options: BlobOptions = new BlobOptions();
    options.responseType = 'blob';

    return this.httpClient.get(url, options);
  }

  public get<TT>(url: string, loader: boolean = false): Observable<TT> {
    const options = {
      params: new HttpParams()
    };
    if (loader) {
      options.params = options.params.append('globalLoader', 'stop');
    }

    return this.httpClient.get<TT>(url, options).pipe(tap(
      data => data
    ));
  }

 // private validateSession = ApiPaths.validateSession;

  public create<TT>(body: Object, url: string): Observable<TT> {
    
    
    return this.httpClient.post<TT>(url, body)
      .pipe(
        tap(
        data => data
    ));
  }

  public login<TT>(body: Object, url: string, observeType: boolean = false): Observable<TT> {
    const options = {
      params: new HttpParams()
    };
    if (observeType) {
      options.params = options.params.append('observe', 'response');
    }
    return this.httpClient.post<TT>(url, body)
      .pipe(
        tap(
        data => data
    ));
  }

  public update<TT>(body: Object, url: string): Observable<TT> {
    return this.httpClient.put<TT>(url, body)
      .pipe(tap(
        data => data
      ));
  }

  public delete<TT>(url: string): Observable<TT> {
    const header = {
      'Content-Type': 'application/json'
    };
    const options = {
      headers: new HttpHeaders(header)
    };
    return this.httpClient.delete<TT>(url, options)
      .pipe(tap(
          data => data
      ));
  }

  // Assure ID Apis

  public createAssureId(body: Object, url: string , json: Boolean = true, text: Boolean = false): Observable<any> {
    const contentType = json ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded';
    const accept = text ? 'application/json, text/plain, */*' : 'application/json;charset=utf-8';
    const header = {
      'Authorization': this.authorization,
      'Content-Type': contentType,
      'Accept': accept
    };
    const options = {
      headers: new HttpHeaders(header),
      params : new HttpParams()
    };
    options.params = options.params.append('setbaseurl', 'stop');
    return this.httpClient.post(url, body, options)
      .pipe(tap(
        data => data
      ));
  }

  public getBlobDataFromAccuant(url: string) {
    return Observable.create((observer: any) => {
      const req = new XMLHttpRequest();
      req.open('get', url);
      req.setRequestHeader('Authorization', this.authorization);
      req.setRequestHeader('Accept', 'application/json, text/plain, */*');
      req.responseType = 'arraybuffer';
      req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
          observer.next(req.response);
          observer.complete();
        }
      };
      req.send();
    });
  }

  public getAssureId(url: any): Observable<any> {
    const headerJson = {
      'Authorization': this.authorization,
      'Accept': 'application/json, text/plain, */*'
    };
    const options = {
      headers: new HttpHeaders(headerJson),
      params : new HttpParams()
    };
    options.params = options.params.append('setbaseurl', 'stop');
    return this.httpClient.get(url, options)
      .pipe(tap(
        data => data
      ));
  }

  public deleteAssureId(url: any): Observable<any> {
    const headerJson = {
      'Authorization': this.authorization
    };
    const options = {
      headers: new HttpHeaders(headerJson),
      params : new HttpParams()
    };
    options.params = options.params.append('setbaseurl', 'stop');
    return this.httpClient.delete(url, options)
      .pipe(
        tap(
          data => data
        ));
  }
}

export class ValidateSession {
  public isSessionValid?: boolean;
  public activeUserFullName?: string;
}

export class BlobOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType!: 'blob';
  withCredentials?: boolean;
}
