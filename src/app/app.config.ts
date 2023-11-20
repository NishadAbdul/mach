import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseConfigService } from './baseConfig.service';
import { ApiPaths } from './shared/config/api-config';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfigService {
  constructor(private handler: HttpBackend, private baseConfig: BaseConfigService, private router: Router) { }

  loadAppConfig() {
  /*  const url = environment.baseUrl + ApiPaths.configurations;
    return new HttpClient(this.handler).get<AppConfig>(url)
      .toPromise()
      .then(data => {
        if (data)
          this.baseConfig.loadAppConfig(data);
      }, ()=> this.router.navigateByUrl('404'));*/
  }
}

export class AppConfig {
  public additionalSettings?: AdditionalSettings;
  public pages?: AppPage[] = [];
  public zipcodeEligibility: boolean = false;
}

export class AdditionalSettings {
  public contactEmail?: string = '';
  public contactPhone?: string = '';
  public clientName?: string = '';
  public colors?: AppColor;
  public supportContact?: string = '';
  public acuantUrl?: string = '';
  public acuantSubscription?: string = '';
  public acuantAuthorization?: string = '';
  public sessionIdleTimout?: number = 0;
  public clientUrl?: string = '';
  public privacyUrl?: string = '';
  public contactUrl?: string = '';
  public securityUrl?: string = '';
  public socialLinks?: SocialLinks;
}

export class AppPage {
  public pageType?: number;
  public fields?: AppField[];
  public displayName?: string;
}

export class AppField {
  public fieldId?: number;
  public displayLabel?: string;
  public defaultlabel?: string;
  public isVisible: boolean = false;
  public isRequired: boolean = false;
  public isEditable: boolean = false;
  public options?: OptionType[]; 
}

export class OptionType {
  public optionId?: number;
  public optionValue?: string;
  public displayText?: string;
  public isVisible: boolean = false;
}

export class AppColor {
  public primary: string = '';
  public secondary?: string;
}

export class SocialLinks {
  public facebook: string = '';
  public twitter: string = '';
  public linkedIn: string = '';
  public youtube: string = '';
}
