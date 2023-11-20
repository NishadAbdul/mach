import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiService } from './services/http-api.service';
import { HttpLoaderService } from './services/loader.service';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'

import { HeaderComponent } from './components/header/header.component';
import { ErrorHandlerComponent } from './components/error/error-handler/error-handler.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import { MobileStepperComponent } from './components/mobile-stepper/mobile-stepper.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false
  }
};

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MobileFooterComponent,
    ErrorHandlerComponent,
    MobileStepperComponent    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatTooltipModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MobileFooterComponent,
    MobileStepperComponent
  ],
  providers: [HttpApiService, HttpLoaderService, provideNgxMask(maskConfigFunction)]
})
export class CoreModule { }
