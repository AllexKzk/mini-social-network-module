import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {EntryDialog} from "./entry.dialog";
import {HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {NewsComponent, NewBlock} from '../news/news.component';
import {BaseComponent} from './base.component';
import {SidemenuComponent} from '../side-menu/sidemenu.component';
import {NoopAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from "@angular/material/icon";
import {LoginGuard} from "./login-guard.guard";
import {AddPostComponent} from "../news/addpost.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FriendsComponent, FriendBlock} from "../friends/friends.component";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {RollbarErrorHandler, rollbarFactory, RollbarService} from "../rollbar/rollbar.component";
import {NgOptimizedImage} from "@angular/common";

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transports: ['websocket']
  }
}

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'news', component: NewsComponent, canActivate: [LoginGuard]},
  {path: 'addpost', component: AddPostComponent,  canActivate: [LoginGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    EntryDialog,
    BaseComponent,
    NewsComponent, NewBlock, AddPostComponent,
    SidemenuComponent,
    FriendsComponent, FriendBlock
  ],
  imports: [
    SocketIoModule.forRoot(config),
    MatIconModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    NgOptimizedImage
  ],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
