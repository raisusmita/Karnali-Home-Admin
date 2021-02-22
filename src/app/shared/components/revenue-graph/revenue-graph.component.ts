import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Color, Label } from 'ng2-charts'
import { ReportService } from '../../services/report-service/report.service'

@Component({
  selector: 'app-revenue-graph',
  templateUrl: './revenue-graph.component.html',
  styleUrls: ['./revenue-graph.component.scss']
})
export class RevenueGraphComponent implements OnInit {
  // Graph Data Start
  public barChartOptions: ChartOptions = {
    responsive: true
  }
  public barChartLabels: Label[] = []
  public barChartType: ChartType = 'bar'
  public barChartLegend = true
  public barChartPlugins = []

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Revenue' }]

  public barChartColors: Color[] = [{ backgroundColor: 'green' }]

  // End

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.fetchRevenue()
  }

  fetchRevenue() {
    this.reportService.getCurrentRevenue().subscribe(
      (result) => {
        Object.keys(result.data).map((key) => {
          this.barChartLabels.push(key.toUpperCase())
          this.barChartData[0].data.push(result.data[key])
        })
      },
      () => {
        //
      }
    )
  }
}
