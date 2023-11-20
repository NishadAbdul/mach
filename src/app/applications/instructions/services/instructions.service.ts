import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ApiPaths } from 'src/app/shared/config/api-config';

@Injectable({
  providedIn: 'root'
})
export class InstructionsService {

  constructor(private httpApi: HttpApiService) { }

  getInstructions() {
    const url = ApiPaths.instructions;
    return this.httpApi.get(url);
  }
}
