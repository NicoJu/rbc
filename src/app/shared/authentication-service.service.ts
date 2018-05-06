import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient,private localStorageService: LocalStorageService,private router: Router) { }

  login(login:string, password:string ): Observable<any>{
    const credentials = {username: login, password: password};
    return this.http.post('/api/login',credentials, {observe: 'response'})
  }

  logout() {
    this.localStorageService.clearAll();
    this.router.navigate(['/login']);
  }

  getUsername(): string {
    return this.localStorageService.get('username');
  }

  isUserlogged(): boolean {

    const token = <string>this.localStorageService.get('token');

    if(token != null){
        return true;
    }

    return false;
  }


}
