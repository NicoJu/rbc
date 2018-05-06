import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RobotService} from "./shared/robot/robot.service";
import {RobotListComponent} from './robot-list/robot-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatInputModule, MatCardModule, MatListModule, MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule, MatMenuModule, MatIconModule, MatDialogModule,
} from "@angular/material";
import {GiphyService} from "./shared/giphy/giphy.service";
import {RobotEditComponent, ConfirmDeleteDialog} from './robot-edit/robot-edit.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from "./shared/auth/token-interceptor.service";
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication-service.service";
import {AnonymousGuard} from "./shared/guards/anonymous-guard";


const appRoutes: Routes = [
  {path: '', redirectTo: '/robot-list', pathMatch: 'full'},
  {
    path: 'robot-list',
    component: RobotListComponent
  },
  {
    path: 'robot-add',
    component: RobotEditComponent
  },
  {
    path: 'robot-edit/:id',
    component: RobotEditComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },

  { path: '**', redirectTo: 'robot-list' }

];


@NgModule({
  declarations: [
    AppComponent,
    RobotListComponent,
    RobotEditComponent,
    LoginComponent,
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'rbc-admin',
      storageType: 'localStorage'
    }),
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule
  ],
  entryComponents: [
    RobotEditComponent,ConfirmDeleteDialog
  ],
  providers: [RobotService, GiphyService, AuthenticationService , AnonymousGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  } ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
