import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DisableCopyPasteDirective } from "./directives/disableCopyPaste.directive";
import { CoreModule } from '../core/core.module';
import { OriginateOnEnterDirective } from './directives/orig-enter.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TruncateTextPipe } from './pipes/truncateText.pipe';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DisableCopyPasteDirective,
    OriginateOnEnterDirective,
    TruncateTextPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    DisableCopyPasteDirective,
    OriginateOnEnterDirective,
    TruncateTextPipe,
    ConfirmDialogComponent,
    MaterialModule
  ]
})
export class SharedModule { }
