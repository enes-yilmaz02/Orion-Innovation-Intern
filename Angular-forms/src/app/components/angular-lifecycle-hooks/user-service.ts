import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];
  usersChanged = new Subject<any[]>();

  addUser(user: any) {
    this.users.push(user);
    this.usersChanged.next([...this.users]);
  }

  getUsers() {
    return [...this.users];
  }
}
