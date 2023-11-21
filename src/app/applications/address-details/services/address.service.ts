import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpApi: HttpApiService) { }

  saveAddressDetails(formData: any) {
    const url = ApiPaths.address;
    return this.httpApi.create(formData, url)
  }

  getAddressDetails() {
    const url = ApiPaths.address;
    return this.httpApi.get(url);
  }

  getMasterData() {    
    const url = ApiPaths.masterDataNew;
    return this.httpApi.get(url);
  }
}
