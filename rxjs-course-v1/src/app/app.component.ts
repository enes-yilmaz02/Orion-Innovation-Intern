import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, asyncScheduler, bindCallback, catchError, concat, concatMap, first, from, fromEvent, fromEventPattern, generate, iif, interval, map, merge, of, range, take, throwError, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
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

    // ------------ ReplaySubject ----------------------
    console.log("");
    console.log("**** Replay subject *****");

    const subject3 = new ReplaySubject(2); // buffer 3 values for new subscribers

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject3.next(1);
    subject3.next(2);
    subject3.next(3);
    subject3.next(4);

    subject3.subscribe({
      next: (v: any) => console.log(`observerB: ${v}`),
    });

    subject3.next(5);

    // ------------ AsyncSubject ----------------------
    console.log("");
    console.log("**** Async subject *****");

    const subject4 = new AsyncSubject();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject4.next(1);
    subject4.next(2);
    subject4.next(3);
    subject4.next(4);

    subject4.subscribe({
      next: (v: any) => console.log(`observerB: ${v}`),
    });

    subject4.next(5);
    subject4.complete();


    // // ------------ Subscription ----------------------

    // console.log("");
    // console.log("**** Subscription *****");
    // const observable3 = interval(400);
    // const observable4 = interval(300);

    // const subscription = observable3.subscribe((x: any) => console.log('first: ' + x));
    // const childSubscription = observable4.subscribe((x: any) => console.log('second: ' + x));

    // subscription.add(childSubscription);

    // setTimeout(() => {
    //   // Unsubscribes BOTH subscription and childSubscription
    //   subscription.unsubscribe();
    // },1000);

    // ************* Operators ****************
    console.log("");
    console.log(" ***************** Operators ***************** ");


    // ------------ OF - MAP ----------------------

    console.log("");
    console.log("**** of - map *****");
    of(1, 2, 3)
      .pipe(map((x) => x * x))
      .subscribe((v) => console.log(`value: ${v}`));

    // ------------ OF - FİRST ----------------------
    console.log("");
    console.log("**** of - first *****");

    of(1, 2, 3)
      .pipe(first())
      .subscribe((v) => console.log(`value: ${v}`));

    // ------------ FROM ----------------------
    console.log("");
    console.log("**** from *****");

    const arrayfrom = [10, 20, 30];
    const resultfrom = from(arrayfrom);

    resultfrom.subscribe(x => console.log(x));

    function* generateDoubles(seed: any) {
      let i = seed;
      while (true) {
        yield i;
        i = 2 * i; // double it
      }
    }

    const iterator = generateDoubles(3);
    const result = from(iterator).pipe(take(10));

    result.subscribe(x => console.log(x));


    // ------------ FROMEVENT ----------------------
    console.log("");
    console.log("**** fromEvent *****");

    const div = document.createElement('div');
    div.style.cssText = 'width: 200px; height: 200px; background: #09c;';
    document.body.appendChild(div);

    // note optional configuration parameter which will be passed to addEventListener
    const clicksInDocument = fromEvent(document, 'click', { capture: true });
    const clicksInDiv = fromEvent(div, 'click');

    clicksInDocument.subscribe(() => console.log('document'));
    clicksInDiv.subscribe(() => console.log('div'));

    // ------------ FROMEVENTPattern ----------------------
    console.log("");
    console.log("**** fromEventPattern *****");

    function addClickHandler(handler: any) {
      document.addEventListener('click', handler);
    }

    function removeClickHandler(handler: any) {
      document.removeEventListener('click', handler);
    }

    const clicks = fromEventPattern(
      addClickHandler,
      removeClickHandler
    );
    clicks.subscribe(x => console.log(x));

    // ------------ AJAX ----------------------
    console.log("");
    console.log("**** ajax *****");

    const obs$ = ajax('https://api.github.com/users?per_page=5').pipe(
      map(userResponse => console.log('users: ', userResponse)),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );

    obs$.subscribe({
      next: (value: any) => console.log(value),
      error: (err: any) => console.log(err)
    });

    // ------------ BİNDCALLBACK ----------------------
    console.log("");
    console.log("**** bindCallback *****");
    function iCallMyCallbackSynchronously(cb: () => any) {
      cb();
    }

    const boundSyncFn = bindCallback(iCallMyCallbackSynchronously);
    const boundAsyncFn = bindCallback(iCallMyCallbackSynchronously, null!, asyncScheduler);

    boundSyncFn().subscribe(() => console.log('I was sync!'));
    boundAsyncFn().subscribe(() => console.log('I was async!'));
    console.log('This happened...');


    // ------------ generate ----------------------
    console.log("");
    console.log("**** generate *****");
    const resultgenerate = generate(0, x => x < 3, x => x + 1, x => x);

    resultgenerate.subscribe(x => console.log(x));


    // ------------ range ----------------------
    console.log("");
    console.log("**** range *****");
    const numbers = range(1, 3);

    numbers.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Complete!')
    });



    // ------------ throwError ----------------------
    console.log("");
    console.log("**** throwError *****");
    let errorCount = 0;

    const errorWithTimestamp$ = throwError(() => {
      const error: any = new Error(`This is error number ${++errorCount}`);
      error.timestamp = Date.now();
      return error;
    });

    errorWithTimestamp$.subscribe({
      error: err => console.log(err.timestamp, err.message)
    });

    errorWithTimestamp$.subscribe({
      error: err => console.log(err.timestamp, err.message)
    });

    // ------------ timer - concatMap ----------------------
    console.log("");
    console.log("**** timer - concatMap *****");
    // This could be any observable
    const source = of(1, 2, 3);

    timer(1000)
      .pipe(concatMap(() => source))
      .subscribe(console.log);

    // ------------ iif ----------------------
    console.log("");
    console.log("**** iif *****");

    let subscribeToFirst: any;
    const firstOrSecond = iif(
      () => subscribeToFirst,
      of('first'),
      of('second')
    );

    subscribeToFirst = true;
    firstOrSecond.subscribe(value => console.log(value));
    subscribeToFirst = false;
    firstOrSecond.subscribe(value => console.log(value));




    // ------------ concat ----------------------
    console.log("");
    console.log("**** concat *****");

    const timerconcat = interval(1000).pipe(take(4));
    const sequenceconcat = range(1, 10);
    const resultconcat = concat(timerconcat, sequenceconcat);
    resultconcat.subscribe(x => console.log(x));

    // ------------ merge ----------------------
    console.log("");
    console.log("**** merge *****");

    const clicksmerge = fromEvent(document, 'click');
    const timermerge = interval(1000);
    const clicksOrTimer = merge(clicksmerge, timermerge);
    clicksOrTimer.subscribe(x => console.log(x));
  }
}


