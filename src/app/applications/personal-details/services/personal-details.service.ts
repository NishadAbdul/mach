import { Injectable } from '@angular/core';
import { ApiPaths } from '../../../shared/config/api-config';
import { HttpApiService } from '../../../core/services/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {
  
  constructor(private httpApi: HttpApiService) { }

  saveUserDetails(formData: any) {
    const url = ApiPaths.personaldetails;
    return this.httpApi.create(formData, url)
  }

  getPersonalDetails() {
    const url = ApiPaths.personaldetails;
    return this.httpApi.get(url);
  }

  getMasterData() {    
    const url = ApiPaths.masterData;
    return this.httpApi.get(url);
  }
}
