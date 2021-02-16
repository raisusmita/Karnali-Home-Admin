import { ReportService } from './../../shared/services/report-service/report.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-available-detail',
  templateUrl: './available-detail.component.html',
  styleUrls: ['./available-detail.component.scss']
})
export class AvailableDetailComponent implements OnInit {
  availableDetail: any[] = []
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.reportService.getAvailableRoomCount().subscribe((result) => {
      Object.keys(result.data).map((key) => {
        console.log(result.data[key])

        if (key == 'totalAvailableRoom') {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Available Room'
          })
        } else if (key == 'totalReservation') {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Booking'
          })
        } else {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Reservation'
          })
        }
      })
      console.log(this.availableDetail)
    })
    // this.availableDetail = [
    //   { count: 6, count_type: 'Available Room' },
    //   { count: 10, count_type: 'Booking' },
    //   { count: 7, count_type: 'Reservation' },
    //   { count: 12, count_type: "Guest's Number" }
    // ]
  }
}
