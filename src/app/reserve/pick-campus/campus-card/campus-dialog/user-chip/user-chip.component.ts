import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs
      .collection('users')
      .doc(this.uid)
      .valueChanges()
      .subscribe(userData => {
        this.userData = userData;
        this.name = userData['name'];
        this.icon = userData['icon'];
      })
  }

}
