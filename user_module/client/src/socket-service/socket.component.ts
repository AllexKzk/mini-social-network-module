import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

  emit(signal: string) {
    this.socket.emit(signal);
  }

  listen(signal: string) {
    return this.socket.fromEvent(signal);
  }
}
