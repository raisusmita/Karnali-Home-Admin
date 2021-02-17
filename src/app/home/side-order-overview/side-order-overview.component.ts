import { ReportService } from './../../shared/services/report-service/report.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-side-order-overview',
  templateUrl: './side-order-overview.component.html',
  styleUrls: ['./side-order-overview.component.scss']
})
export class SideOrderOverviewComponent implements OnInit {
  newOrderCount: number
  completeOrderCount: number
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.reportService.getOrderDetails().subscribe((result) => {
      Object.keys(result.data).map((key) => {
        if (key == 'TotalOrdered') {
          this.newOrderCount = result.data[key]
        } else {
          this.completeOrderCount = result.data[key]
        }
      })
    })
  }
}
