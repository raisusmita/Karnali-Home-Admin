import { Time } from '@angular/common'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-calender-today',
  templateUrl: './calender-today.component.html',
  styleUrls: ['./calender-today.component.scss']
})
export class CalenderTodayComponent implements OnInit {
  month: string
  day: number
  year: number
  today: Date
  time: any
  currentMonth: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  constructor() {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.today = new Date()
    this.month = this.currentMonth[this.today.getMonth()]
    this.day = this.today.getDate()
    this.year = this.today.getFullYear()
    window.setInterval(() => (this.time = new Date()), 1000)
  }
}
