import { Component, OnInit } from '@angular/core'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: string
  showManagerSection: boolean
  showWaiterSection: boolean
  showReceptionSection: boolean

  constructor() {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.role = localStorage.getItem('userRole')
    if (this.role == 'manager') {
      this.showManagerSection = true
    } else if (this.role == 'operator') {
      this.showReceptionSection = true
    } else if (this.role == 'waiter') {
      this.showWaiterSection = true
    }
  }
}
