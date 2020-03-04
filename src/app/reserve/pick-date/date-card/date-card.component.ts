import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReserveDate } from '../../../class/reserve';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.css']
})
export class DateCardComponent implements OnInit {

  @Input() reserveId: string;
  @Input() compulsion: boolean;
  @Input() date: ReserveDate;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  go(): void {
    this.router.navigate(['/pick-campus', this.reserveId]);
  }

}
