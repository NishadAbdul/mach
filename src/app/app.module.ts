import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {Location} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DefaultComponent } from './layout/default/default.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';
import { interceptorProviders } from './core/interceptors/interceptors';
import { AppState } from './app.service';
import { BaseConfigService } from './baseConfig.service';
import { HttpCancelService } from './core/helper/cancelpendingrequest.service';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { RouteDataService } from './core/services/routedata.service';
import { AppConfigService } from './app.config';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

let appConfig: any;
export function baseConfigFactory() {
  return appConfig;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFn(appConfigService: AppConfigService) {
  return () => {
    return appConfigService.loadAppConfig();
  };
};
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    WelcomeComponent,
    AppRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule,    
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
      }) 
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    interceptorProviders, AppState, HttpCancelService, AppConfigService, RouteDataService, ErrorHandlerService, 
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
      deps : [AppConfigService], 
      useFactory : appInitializerFn
    },
    BaseConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
