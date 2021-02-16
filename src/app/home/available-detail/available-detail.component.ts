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
        if (key == 'totalAvailableRoom') {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Available Room'
          })
        } else if (key == 'totalReservation') {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Reservation'
          })
        } else {
          this.availableDetail.push({
            count: result.data[key],
            count_type: 'Booking'
          })
        }
      })
    })
  }
}
