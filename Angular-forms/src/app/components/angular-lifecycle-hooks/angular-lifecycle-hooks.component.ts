import { Component, Input, OnInit, DoCheck, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user-service';

@Component({
  selector: 'app-angular-lifecycle-hooks',
  templateUrl: './angular-lifecycle-hooks.component.html',
  styleUrls: ['./angular-lifecycle-hooks.component.css']
})
export class AngularLifecycleHooksComponent implements OnInit, DoCheck, AfterContentInit, AfterViewInit, OnDestroy {
  users: any[] = [];
  private userSubscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('ngOnInit çalıştı');
    this.userSubscription = this.userService.usersChanged.subscribe(updatedUsers => {
      this.users = updatedUsers;
    });
  }

  ngDoCheck() {
    console.log('ngDoCheck çalıştı');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit çalıştı');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit çalıştı');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy çalıştı');
    this.userSubscription.unsubscribe();
  }
}
