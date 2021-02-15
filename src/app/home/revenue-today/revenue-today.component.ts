import { Component, OnInit } from '@angular/core'
// import * as CanvasJS from "./canvasjs.min";

@Component({
  selector: 'app-revenue-today',
  templateUrl: './revenue-today.component.html',
  styleUrls: ['./revenue-today.component.scss']
})
export class RevenueTodayComponent implements OnInit {
  revenues: any[]
  totalRevenueAmount: number = 0

  constructor() {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.revenues = [
      {
        revenue_name: 'Food',
        revenue_amount: 12000
      },
      {
        revenue_name: 'Bar',
        revenue_amount: 18000
      },
      {
        revenue_name: 'Room',
        revenue_amount: 25000
      },
      {
        revenue_name: 'Cafe',
        revenue_amount: 15000
      }
    ]
    this.revenues.map((revenue) => {
      this.totalRevenueAmount = this.totalRevenueAmount + revenue.revenue_amount
    })
  }
}
