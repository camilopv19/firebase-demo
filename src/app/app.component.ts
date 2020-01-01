import { Component, OnDestroy } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;
  courses = [];
  author$;
  items: Observable<any[]>;

  coursesRef: AngularFireList<any>;
  /**
   * The $ sign doesn't affect anything, but is a standard to
   * mark a variable as an Observable
   */
  constructor(private db: AngularFireDatabase) {
    this.coursesRef = db.list('courses');
    this.subscription = db.list('courses').valueChanges().subscribe(
      values =>{
        this.courses = values;
        console.log(values);
      }
    );

    this.items = this.coursesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    // this.items.subscribe( v => {
    //   console.log(v);
    // });
    this.author$ = db.object('authors/1').valueChanges();

    // https://github.com/angular/angularfire/blob/master/docs/rtdb/objects.md
  }
  add(course: HTMLInputElement){
    // this.coursesRef.push(course.value);
    const obj = {
      name: course.value,
      isActive: false,
      price: 16.500,
      sections: [{
        topic1: 'Intro',
        topic2: 'Programs'
      }]
    };
    this.coursesRef.push(obj);
    course.value = '';
  }

  update(course){
    this.coursesRef.update( course.key, {title: 'Updated course' + course.key});
  }
  delete(course){
    this.coursesRef.remove(course.key)
    .then( x => console.log('Removed'));
    // .catch( err => console.log(err));
  }
  // https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md
}
