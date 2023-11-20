import { Injectable } from '@angular/core';
import { environment } from 'projects/home/src/environments/environment';
import { ApiPaths } from '../../../shared/config/api-config';
import { HttpApiService } from '../../../core/services/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  
  constructor(private httpApi: HttpApiService) { }

  saveUserDetails(formData: any) {
    const url = ApiPaths.newuser;
    return this.httpApi.create(formData, url)
  }
}
