import {Component, Renderer2, Input} from "@angular/core"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<div class = 'header'>
    <h1> Список друзей </h1>
    <side-menu></side-menu>
    </div>
    <friend-block></friend-block>`
})
export class FriendsComponent {
  constructor(private router: Router) {
  }
}

@Component({
  selector: 'friend-block',
  template: `<div class = 'news-div' *ngFor="let block of this.friends">
                <p>{{block.friendName}}</p>
                <a (click)="deleteFriend(block.friendToken)">Удалить из друзей</a>
            </div>`
})
export class FriendBlock {
  friends: Friend[] = [];
  constructor(private renderer: Renderer2, private http: HttpClient){}
  ngOnInit() {
    this.http.put<Friend[]>('https://localhost:3000/friends',
      {token: sessionStorage.getItem("userToken")},
      {headers: new HttpHeaders({'rejectUnauthorized': 'false'})})
      .subscribe(res => {this.friends = res});
  }
  deleteFriend(friendToken: string) {
    this.http.put('https://localhost:3000/delfriend',
    {
      user: sessionStorage.getItem("userToken"),
      friend: friendToken
    }).subscribe();
    this.ngOnInit();
  }
}

export interface Friend {
  friendToken: string;
  friendName: string;
}
