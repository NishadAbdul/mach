import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig, AppField, AppPage, OptionType } from './app.config';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseConfigService {

  public appConfig!: AppConfig;
  
  constructor(private router: Router) {}

  startSession: EventEmitter<boolean> = new EventEmitter();
  remainingTime: EventEmitter<number> = new EventEmitter();

  loadAppConfig(config: AppConfig) {
    this.appConfig = config;
  }

  getImage(imageUrl: string = '') {
    const baseUrl = window.location.href.replace(this.router.url, '');
    const apiUrl = environment.baseUrl;
    return baseUrl + '/' + apiUrl + imageUrl;
  }


  public getPageData(pageId: number): FieldManager {
    const manager = new FieldManager();

    if (this.appConfig.pages && this.appConfig.pages.length > 0) {
      const found = this.appConfig.pages.find(obj => obj?.pageType === pageId);

      if (found)
        manager.load(found);
    }

    return manager;
  }
  
}

export class FieldManager {
  load(appPage: AppPage): void {
    this.page = appPage;
  }

  page!: AppPage;

  private findField(id: number): AppField {
    return this.page.fields?.find(f => f.fieldId === id) ?? new AppField();
  }

  hide(fieldId: number): void {
    this.findField(fieldId).isVisible = false;
  }

  show(fieldId: number): void {
    this.findField(fieldId).isVisible = true;
  }

  visible(fieldId: number): boolean {
    return this.findField(fieldId).isVisible;
  }

  required(fieldId: number): boolean {
    return this.findField(fieldId).isRequired === true;
  }

  setOptional(fieldId: number): boolean {
    return this.findField(fieldId).isRequired = false;
  }

  setRequired(fieldId: number): boolean {
    return this.findField(fieldId).isRequired = true;
  }

  label(fieldId: number): string {
    return this.findField(fieldId).displayLabel ?? '';
  }

  replaceToken(fieldId: number, token: string, replacement?: string) {
    const pattern = `#${token}#`;
    const label = this.findField(fieldId).displayLabel;

    if (label && label.includes(pattern)) {
      this.findField(fieldId).displayLabel = label.replace(pattern, replacement ? replacement : '');
    }
  }

  options(fieldId: number): OptionType[] {
    const options = this.findField(fieldId).options ?? ([] as OptionType[]);

    return options.filter(f => f.isVisible);
  }
}
