import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class AdditionalDetailsService {

  constructor(private httpApi: HttpApiService) { }

  saveAdditionalDetails(formData: any) {
    const url = ApiPaths.additional;
    return this.httpApi.create(formData, url)
  }

  getAdditionalDetails() {
    const url = ApiPaths.additional;
    return this.httpApi.get(url);
  }
}
