import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-available-detail',
  templateUrl: './available-detail.component.html',
  styleUrls: ['./available-detail.component.scss']
})
export class AvailableDetailComponent implements OnInit {
  availableDetail: any[] = []
  constructor() {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.availableDetail = [
      { count: 6, count_type: 'Available Room' },
      { count: 10, count_type: 'Booking' },
      { count: 7, count_type: 'Reservation' },
      { count: 12, count_type: "Guest's Number" }
    ]
  }
}
