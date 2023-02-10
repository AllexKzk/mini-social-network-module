import {Component} from "@angular/core";
import { Router } from '@angular/router';
import {Friend} from "../friends/friends.component";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'side-menu',
  template: `<div class = 'side-menu'>
                <mat-icon (click) = "changeState()">apps</mat-icon>
                <img [src]="avatarPath" alt="avatar" (click)="fileInput.click()">
                <input #imageInput hidden type="file" (change)="onFileSelected(imageInput)" #fileInput id="file">
            </div>
            <div *ngIf= "hiddenMenuMode" class = 'hidden-side-menu'>
              <h2> {{userName}} </h2>
              <a  href = "/news"> Новости </a>
              <mat-icon (click) = "changeState()"> close icon </mat-icon>
              <a href = "/friends"> Друзья </a>
              <a *ngIf = "adminAccess" href = "https://localhost:3000"> Администрирование </a>
              <a href = '/'> Выход </a>
            </div>`
})

export class SidemenuComponent {
  userName: string | null = '';
  hiddenMenuMode: boolean = false;
  adminAccess: boolean = false;
  avatarPath: string = 'https://localhost:3000/images/usr-def.png';
  selectedFile: ImageSnippet | undefined;

  constructor(public router: Router, private http: HttpClient) {
    this.userName = sessionStorage.getItem("userName");
    this.adminAccess = sessionStorage.getItem("userRole") == '1';
  }
  ngOnInit() {
    let userImg = sessionStorage.getItem("userAvatar");
    if (userImg)
      this.avatarPath = 'https://localhost:3000/images/'  + userImg;
  }
  changeState() {
    this.hiddenMenuMode = !this.hiddenMenuMode;
  }
  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.uploadImage(this.selectedFile.file);
    });
    reader.readAsDataURL(file);
  }
  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('avatar', image);
    this.http.put('https://localhost:3000/updateimage' + sessionStorage.getItem("userToken"),
      formData,
      {headers: new HttpHeaders({'rejectUnauthorized': 'false'})})
      .subscribe(() => {
        sessionStorage.setItem("userAvatar", sessionStorage.getItem("userToken") + ".jpg");
        this.ngOnInit();
      });
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}



