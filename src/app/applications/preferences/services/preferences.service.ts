import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private httpApi: HttpApiService) { }

  savePreferences(formData: any) {
    const url = ApiPaths.preferences;
    return this.httpApi.create(formData, url)
  }

  getPreferences() {
    const url = ApiPaths.preferences;
    return this.httpApi.get(url);
  }
}
