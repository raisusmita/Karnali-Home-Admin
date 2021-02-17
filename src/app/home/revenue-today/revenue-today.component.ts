import { ReportService } from './../../shared/services/report-service/report.service'
import { RoomService } from './../room/room.service'
import { Component, OnInit } from '@angular/core'
// import * as CanvasJS from "./canvasjs.min";

@Component({
  selector: 'app-revenue-today',
  templateUrl: './revenue-today.component.html',
  styleUrls: ['./revenue-today.component.scss']
})
export class RevenueTodayComponent implements OnInit {
  revenues: any[] = []
  totalRevenueAmount: number = 0

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.reportService.getCurrentRevenue().subscribe((result) => {
      Object.keys(result.data).map((key) => {
        this.revenues.push({
          revenue_name: key,
          revenue_amount: result.data[key]
        })
        this.totalRevenueAmount =
          this.totalRevenueAmount + parseFloat(result.data[key])
      })
    })
  }
}
