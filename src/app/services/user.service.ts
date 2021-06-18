import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private users: User[] = [
    {
      firstName: 'James',
      lastName: 'Smith',
      email: 'James@smith.fr',
      drinkPreference: 'Coca',
      hobbies: [
        'cafe','pc','jv'
      ]
    }
  ];

  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }
}
