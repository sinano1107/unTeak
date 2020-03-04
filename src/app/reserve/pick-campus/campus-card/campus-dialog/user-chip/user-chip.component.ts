import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.css']
})
export class UserChipComponent implements OnInit {

  @Input() uid: string;
  userData = {};
  name: string;
  icon = '';

  subsc = new Subscription();

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.subsc.add(this.afs
      .collection('users')
      .doc(this.uid)
      .valueChanges()
      .subscribe(userData => {
        this.userData = userData;
        this.name = userData['name'];
        this.icon = userData['icon'];
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

}
