import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private obsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.obsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.obsSubscription = customObservable.subscribe((data) => {
        console.log(data);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        console.log('completed');
      });
  }

  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }

}
