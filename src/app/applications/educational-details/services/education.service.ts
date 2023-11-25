import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {

  constructor(private httpApi: HttpApiService) { }

  getEducationDetails() {
    const url = ApiPaths.education;
    return this.httpApi.get(url);
  }

  saveCertificates(formData: any) {
    const url = ApiPaths.education;
    return this.httpApi.create(formData, url)
  }
}
