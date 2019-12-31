import { Component } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Learn!';
  courses$: Observable<any[]>;
  // courses: AngularFireList<any[]>;
  /**
   * he $ sign doesn't affect anything, but is a standard to
   * mark a variable as an Observable
   */
  constructor(db: AngularFireDatabase) {
    
    this.courses$ = db.list('courses').valueChanges();

    // this.courses.snapshotChanges(['child_added'])
    //   .subscribe(actions => {
    //     actions.forEach(action => {
    //       console.log(action.type);
    //       console.log(action.key);
    //       console.log(action.payload.val());
    //     });
    //     console.log(actions);
    //   });
  }
}
