import { ReportService } from './../../shared/services/report-service/report.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-available-table',
  templateUrl: './available-table.component.html',
  styleUrls: ['./available-table.component.scss']
})
export class AvailableTableComponent implements OnInit {
  availableTables: any[] = []
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.reportService.getAvailableTables().subscribe((result) => {
      this.availableTables = result.data
    })
  }
}
