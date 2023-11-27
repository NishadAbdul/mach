import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpApi: HttpApiService) { }

  getApplicationDetails() {
    const url = ApiPaths.review;
    return this.httpApi.get(url);
  }
}
