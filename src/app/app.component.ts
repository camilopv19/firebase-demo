import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$: Observable<any[]>;
  author$;
  course$;
  

  constructor(db: AngularFireDatabase){
    this.courses$ = db.list('/courses').valueChanges();
    this.course$ = db.list('/courses/1').valueChanges();
    this.author$ = db.list('authors').valueChanges();
  }

}
