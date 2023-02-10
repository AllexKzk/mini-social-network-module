import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'entry-dialog',
  template: `<div [className]="'entry-dialog'">
                <h1> {{title}} </h1>
                <input type = "email"    placeholder="Почта"  minlength="3" [(ngModel)]="mail" >
                <div *ngIf="title == 'Регистрация'">
                  <input placeholder="Имя" [(ngModel)]= 'name'>
                  <input type="date" placeholder="Имя" [(ngModel)]= 'bday'>
                </div>
                <input type = 'password' placeholder="Пароль" minlength="8" [(ngModel)]="password" >
                <button (click)="submit()">Принять</button>
             </div>`
})
export class EntryDialog {
  mode: string = 'login';
  mail: string = '';
  password: string = '';
  name: string = '';
  bday: string = '';
  @Input() title: string = "Регистрация";
  constructor(private http: HttpClient, private router: Router) {}
  submit() {
    let data = {
      name: this.name,
      password: this.password,
      mail: this.mail,
      bday: this.bday
    };
    if (this.title == 'Регистрация')
      this.mode = 'reg';
    this.http.post<UserData>('https://localhost:3000/' + this.mode, data,
      {headers: new HttpHeaders({'rejectUnauthorized': 'false'})})
      .subscribe(data => {
        console.log(data);
        if (data.status) {
          sessionStorage.setItem("userMail", data.mail);
          sessionStorage.setItem("userName", data.name);
          sessionStorage.setItem("userToken", data.token);
          sessionStorage.setItem("userRole", data.role);
          if (data.avatar.length > 0)
            sessionStorage.setItem("userAvatar", data.avatar);
          this.router.navigate(['/news']);
        }
      });
  }
}

export interface UserData {
  status: boolean,
  name: string,
  mail: string,
  token: string,
  role: string,
  avatar: string
}
