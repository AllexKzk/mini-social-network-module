import { Component } from '@angular/core';
import {EntryDialog} from "./entry.dialog";

@Component({
  selector: 'app-root',
  template: `<div *ngIf="!dialogOpened" [style]="'width: 50%; margin-left: 35%; margin-top: 15%'" >
                <button (click)="openDialog('reg')" [className]="'regButton'" >Зарегистрироваться</button>
                <button (click)="openDialog('login')" [className]="'regButton'">Войти</button>
            </div>
            <div *ngIf="dialogOpened">
              <entry-dialog [title]="aimLabel" ></entry-dialog>
            </div>`
})

export class AppComponent {
  dialogOpened: boolean = false;
  aimLabel: string = 'Регистрация';
  openDialog(aim: string){
    this.dialogOpened = !this.dialogOpened;
    if (aim == 'login')
      this.aimLabel = 'Вход';
  }
}
