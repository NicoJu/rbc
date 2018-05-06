import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication-service.service";
import {LocalStorageService} from "angular-2-local-storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  pass: string;
  errorMsg :string;

  constructor(private  authenticationService:AuthenticationService, private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  onClickLogIn() {
    this.authenticationService.login(this.username,this.pass)
      .subscribe( response => {
           this.localStorageService.set('username',this.username);
           this.onLoginReceived(response)
        }, error => {
          this.errorMsg = 'Bad Credentials.'
        }
      )
  }

  onLoginReceived(response)
  {
    this.localStorageService.set('token', response.headers.get("Authorization"));//Store the token created by the backend
    this.router.navigate(["/robot-list"]);
  }






}
