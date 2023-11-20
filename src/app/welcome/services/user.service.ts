import { Injectable } from '@angular/core';
import { HttpApiService } from '../../core/services/http-api.service';
import { environment } from 'projects/home/src/environments/environment';
import { ApiPaths } from '../../shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpApi: HttpApiService) { }

  loginUser(formData: any) {
    const url = ApiPaths.login;
    return this.httpApi.create(formData, url)
  }

  forgotPassword(email: string) {
    const frUrl = ApiPaths.login + ApiPaths.forgot;
    return this.httpApi.create(email, frUrl)
  }
}
