import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import * as environment from 'src/environments/environment.prod';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'x-rapidapi-host': environment.env.host,
        'x-rapidapi-key': environment.env.key
      }
    });
    return next.handle(request);
  }
}
