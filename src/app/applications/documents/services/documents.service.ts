import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpApi: HttpApiService) { }

  uplaodDocuments(formData: any) {
    const url = ApiPaths.documents;
    return this.httpApi.create(formData, url)
  }

  getDocuments() {
    const url = ApiPaths.documents;
    return this.httpApi.get(url);
  }
}
