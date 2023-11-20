import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { InterceptorService } from './http.interceptor';
import { BaseUrlInterceptorService } from './baseurl.interceptor';
import { RetryInterceptorService } from './retry.interceptor';
import { LoaderInterceptorService } from './loader.interceptor';

export const interceptorProviders =
   [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
];
