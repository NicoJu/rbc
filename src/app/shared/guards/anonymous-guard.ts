/**
 * Created by Nico on 03/05/2018.
 */

import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../authentication-service.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate() {
    if (this.authenticationService.isUserlogged()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
