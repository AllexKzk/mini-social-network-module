import {Renderer2} from '@angular/core';
import {Component, NgZone, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import { SocketService } from "../socket-service/socket.component";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  template: `<div class = 'header'>
                <h1> Добавление записи </h1>
                <side-menu></side-menu>
            </div>
            <div>
              <textarea  class = 'input-add-block' placeholder="Введите текст..." [(ngModel)] = "text">
              </textarea>
              <div (click) = "sendPost()" class = 'input-block-btn'>
                <button>
                  <mat-icon> check icon </mat-icon>
                </button>
                <button (click)="this.router.navigate(['/news']);">
                  <mat-icon> close icon </mat-icon>
                </button>
              </div>
            </div>
            `
})
export class AddPostComponent {
  text: string = ''
  constructor(public router: Router, private http: HttpClient, private socket: Socket) {
  }
  sendPost() {
    this.http.post('https://localhost:3000/newpost',
      {token: sessionStorage.getItem("userToken"), postText: this.text},
      {headers: new HttpHeaders({'rejectUnauthorized': 'false'})})
      .subscribe(() => {this.router.navigate(['/news']);});
    this.socket.emit("addNewPost");
  }
}
