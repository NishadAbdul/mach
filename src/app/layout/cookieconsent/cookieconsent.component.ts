import { Component, OnInit } from '@angular/core';
import { BaseConfigService } from 'src/app/baseConfig.service';

@Component({
  selector: 'app-cookieconsent',
  templateUrl: './cookieconsent.component.html',
  styleUrls: ['./cookieconsent.component.scss']
})
export class CookieconsentComponent implements OnInit {
  public institutionLogo: string = this.baseConfig.getImage('configuration/image/logo');
  public institutionName: string = "";
  constructor(private baseConfig: BaseConfigService) {
    document.cookie = 'allowcookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.institutionName = this.baseConfig.appConfig.name;
  }

  ngOnInit(): void {
  }

}
