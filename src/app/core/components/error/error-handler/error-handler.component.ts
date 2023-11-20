import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaskPipe } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface TraceResult {
  traceId?: string
}

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
  providers: [NgxMaskPipe]
})
export class ErrorHandlerComponent {
  public icon: string = '';
  public title: string = '';
  public message = '';
  public buttonLabel: string = '';
  public supportContact: string = '';
  public traceId: string | null = '';
  public class: string = '';
  
  static DEFAULT_BUTTONLABEL = 'Close';
  static DEFAULT_TITLE = 'Oh Sorry!';
  static DEFAULT_MESSAGE = '';
  static DEFAULT_ICON = 'close';
  static DEFAULT_ACTION = '';
  static DEFAULT_TRACEID = '';
  static DEFAULT_CLASS = '';

  constructor(@Inject(MAT_DIALOG_DATA) public errorModal: any,
    private maskPipe: NgxMaskPipe,
    private httpClient: HttpClient) {
    this.supportContact = '8764578855';
    this.icon = errorModal.icon ? errorModal.icon : ErrorHandlerComponent.DEFAULT_ICON; 
    this.title = errorModal.title ? errorModal.title : ErrorHandlerComponent.DEFAULT_TITLE; 
    this.buttonLabel = errorModal.buttonLabel ? errorModal.buttonLabel : ErrorHandlerComponent.DEFAULT_BUTTONLABEL; 
    this.class = errorModal.class ? errorModal.class : ErrorHandlerComponent.DEFAULT_CLASS;
    if (errorModal.message) {
      this.message = errorModal.message;
    } else {
      if(this.supportContact) {
        this.message = `<p>We are having problem processing your request. Please try again.</p><p>And if the issue still exists, please contact our support team at ` + this.maskPipe.transform(this.supportContact, '(000) 000-0000');

        if (!errorModal.traceId) {
          this.httpClient.get<TraceResult>('configuration/trace').pipe(tap(
            a => a
          )).subscribe(r => {
            if (r) {
              errorModal.traceId = r.traceId;
              this.message += ` and mention reference number: ` + errorModal.traceId + `</p>`;
            }
          });
        }

        if (errorModal.traceId) {
          this.message += ` and mention reference number: `+ errorModal.traceId +`</p>`;
        } else {
          this.message += `.</p>`
        }
      } else {
        this.message = `<p>We have experienced a problem processing your request.</p>`;
        if (errorModal.traceId) {
          this.message += `<p>Reference number: `+ errorModal.traceId +`</p>`;
        }
      }
    }
  }
}


