import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.service';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public redirectUrl = false;
  public isLoggedIn: boolean = false;
  selectedLanguage: string = 'en';
  constructor(public router: Router, private appState: AppState,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private translateService: TranslateService) {
    if (this.appState.applicationIdentifier) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    
  }

  setLanguage(event: MatButtonToggleChange) {
    const lang = event?.value;
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
   // this.changeCssFile(lang);
    let defaultValue = 'en'
    if (event.value === 'en') {
      defaultValue = 'ar';
    }
    this.renderer.removeClass(this.document.body, defaultValue);
    this.renderer.addClass(this.document.body, event?.value);
  }
  
  logoutUser() {
    this.router.navigateByUrl('/login');
  }
}
