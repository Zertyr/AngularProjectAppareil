import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import 'rxjs/Rx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  secondes: number;
  counterSubscription: Subscription;

 constructor(private authService: AuthService){

 }

 ngOnInit() {
     const counter = interval(1000);
     this.counterSubscription = counter.subscribe(
       (value: number) => {
         this.secondes = value;
      }
    );
 }


 ngOnDestroy() {
   this.counterSubscription.unsubscribe();
 }
}
