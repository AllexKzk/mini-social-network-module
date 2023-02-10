import {Component, Renderer2, Input} from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import {SocketService} from "../socket-service/socket.component";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  template: `<div class = 'header'>
    <h1> Список новостей </h1>
    <side-menu></side-menu>
    <select class= "header-select" [(ngModel)]="newsType">
      <option value = 'my'>мои новости</option>
      <option value = 'friends'>новости друзей</option>
    </select>
    <a (click)="addPost()"> добавить новость </a>
  </div>
  <new-block [type]="newsType"></new-block>`
})
export class NewsComponent {
  newsType: string = 'my';
  constructor(private router: Router) {
  }
  addPost() {
    this.router.navigate(['/addpost']);
  }
}

@Component({
  selector: 'new-block',
  template: `<div class = 'news-div' *ngFor="let block of this.news.reverse()">
              <p>{{block.authorName}}: {{block.text}}</p>
            </div>`
})
export class NewBlock {
  @Input() type: string = '-';
  news: News[] = [];
  constructor(private renderer: Renderer2, private http: HttpClient, private socket: Socket){
    this.socket.fromEvent("updateNews").subscribe(() => {
      this.ngOnInit();
    });
  }
  ngOnChanges() {
    this.updateFeed();
  }
  ngOnInit() {
    this.updateFeed();
  }
  updateFeed() {
    this.http.put<News[]>('https://localhost:3000/news',
      {token: sessionStorage.getItem("userToken"), type: this.type},
      {headers: new HttpHeaders({'rejectUnauthorized': 'false'})})
      .subscribe(res => {this.news = res});
  }
}

export interface News {
  author: string;
  authorName: string;
  text: string;
}
