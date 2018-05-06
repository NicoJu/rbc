import {Injectable} from '@angular/core';

import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from "@angular/common/http"
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {GiphyService} from "../giphy/giphy.service";

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url.indexOf(GiphyService.giphyApi) == -1) {

      const token = <string>this.localStorageService.get('token');

      if (token != null) {
        req = req.clone({
            headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token)
          }
        );
      }
    }

    return next.handle(req).do((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {

      }

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403 || err.status === 404) {
          this.localStorageService.set("token", null);
          this.router.navigate(["/login"]);
        }
      }
    });
  }


}
