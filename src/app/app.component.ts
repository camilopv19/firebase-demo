import { Component, OnDestroy } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  courses = [];
  /**
   * The $ sign doesn't affect anything, but is a standard to
   * mark a variable as an Observable
   */
  constructor(db: AngularFireDatabase) {
    this.subscription = db.list('courses').valueChanges().subscribe(
      values =>{
        this.courses = values;
        console.log(values);
      }
    );
  }

}
