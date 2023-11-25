import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.service';

@Injectable()
export class HttpApiService {
  constructor(
    private httpClient: HttpClient,
    private appState: AppState) { 
  }

  private getuserIdentifier(): string {
    return this.appState.applicationIdentifier ?? '';
  }

  private getApplicationIdentifier(): string {
    let identfiier = '00000000-0000-0000-0000-000000000000';
    if (this.appState.getSharedObj('identifier')) {
      identfiier = this.appState.getSharedObj('identifier');
    }
    return identfiier;
  }
  

  public fetch(url: string): Observable<any> {
    return this.httpClient.get(url)
      .pipe(tap(
        data => data
      ));
  }

  public get<TT>(url: string): Observable<TT> {
    const headerJson = new HttpHeaders(
      { 
        'Authorization': this.getuserIdentifier(), 
        'identifier': this.getApplicationIdentifier()
      },
      );
    const options = {
      headers: headerJson,
      params: new HttpParams()
    };

    return this.httpClient.get<TT>(url, options).pipe(tap(
      data => data
    ));
  }

  public create<TT>(body: Object, url: string): Observable<TT> {
    const header = { 
      'Authorization': this.getuserIdentifier(), 
      'identifier': this.getApplicationIdentifier()
    }
    const options = {
      headers: new HttpHeaders(header)
    };
    return this.httpClient.post<TT>(url, body, options)
      .pipe(
        tap(
        data => data
    ));
  }

  public update<TT>(body: Object, url: string): Observable<TT> {
    const header = { 
      'Authorization': this.getuserIdentifier(), 
      'identifier': this.getApplicationIdentifier()
    };
    const options = {
      headers: new HttpHeaders(header)
    };
    return this.httpClient.put<TT>(url, body, options)
      .pipe(tap(
        data => data
      ));
  }

  public delete<TT>(body: Object, url: string): Observable<TT> {
    const header = {
      'Content-Type': 'application/json'
    };
    const options = {
      headers: new HttpHeaders(header),
      body: body
    };
    return this.httpClient.delete<TT>(url, options)
      .pipe(tap(
          data => data
      ));
  }
}