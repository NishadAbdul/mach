import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private httpApi: HttpApiService) { }
  getCourseMasterData() {
    const url = ApiPaths.courseMasterData;
    return this.httpApi.get(url);
  }

  startApplication(formData: any) {
    const url = ApiPaths.startApplication;
    return this.httpApi.create(formData, url);
  }
}
