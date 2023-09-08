import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-course-v1';

  ngOnInit(): void {
    // ------------ observable ----------------
    console.log("");
    console.log("***** observable *****");


    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.complete();

    });

    observable.subscribe(data => {
      console.log(data);
    });

    // ------------ observer ----------------
    console.log("");
    console.log(" ***** observer *****");


    const observer = {
      next: (x: any) => console.log('Observer got a next value: ' + x),
      error: (err: any) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    observable.subscribe(observer);

    // ------------ Subject ----------------------
    console.log("");
    console.log("***** subject *****");


    const subject = new Subject<number>();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    const observable2 = from([1, 2, 3]);

    observable2.subscribe(subject);

    // ------------ BehaviorSubject ----------------------
    console.log("");
    console.log("**** Behavior subject *****");


    const subject2 = new BehaviorSubject(0); // 0 is the initial value

    subject2.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject2.next(1);
    subject2.next(2);

    subject2.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    subject2.next(3);


  }
}
