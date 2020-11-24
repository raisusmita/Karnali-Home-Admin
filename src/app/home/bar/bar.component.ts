import { Component, OnInit } from '@angular/core'
import { BarService } from './bar.service'
import { MatDialog } from '@angular/material/dialog'
import { BarFormComponent } from './bar-form/bar-form.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { MainBarFormComponent } from './main-bar-form/main-bar-form.component'
import { SubBarFormComponent } from './sub-bar-form/sub-bar-form.component'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  displayedColumns: string[] = [
    'mainBarCategory',
    'subBarCategory',
    'barName',
    'quantity',
    'price',
    'action'
  ]
  mainBarDisplayedColumns: string[] = ['mainBarCategory', 'action']
  subBarDisplayedColumns: string[] = ['subBarCategory', 'action']

  dataSource: any[]
  mainBar: any[]
  subBar: any[]
  barHeader: any[]

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  barTotalLength: number
  mainBarTotalLength: number
  subBarTotalLength: number

  limit: number
  skip: number

  tabLabel: string

  @BlockUI() blockUI: NgBlockUI

  constructor(private barService: BarService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.mainBarTotalLength = 0
    this.barTotalLength = 0
    this.subBarTotalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.tabLabel = 'Bar Items'
    this.getBar()
    this.getMainBar()
    this.getSubBar()
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    if (this.tabLabel == 'Bar Items') {
      this.getBar()
    } else if (this.tabLabel == 'Main Bar') {
      this.getMainBar()
    } else if (this.tabLabel == 'Sub Bar') {
      this.getSubBar()
    }
  }

  getBar() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.barService.getBarList(paginationParams).subscribe((result) => {
      this.dataSource = result.data
      this.barTotalLength = result.totalCount
    })
  }

  getMainBar() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.barService.getMainBarList(paginationParams).subscribe((result) => {
      this.mainBar = result.data
      this.mainBarTotalLength = result.totalCount
    })
  }

  getSubBar() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.blockUI.start('Loading...')
    this.barService.getSubBarList(paginationParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.subBar = result.data
          this.subBarTotalLength = result.totalCount
        } else {
          this.blockUI.stop()
        }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  addBar() {
    const dialogRef = this.dialog.open(BarFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBar()
      }
    })
  }

  addMainBar() {
    const dialogRef = this.dialog.open(MainBarFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMainBar()
      }
    })
  }

  addSubBar() {
    const dialogRef = this.dialog.open(SubBarFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSubBar()
      }
    })
  }

  editBar(BarEditData) {
    const dialogRef = this.dialog.open(BarFormComponent, {
      width: '50%',
      data: BarEditData
    })
  }

  editMainBar(BarEditData) {
    const dialogRef = this.dialog.open(MainBarFormComponent, {
      width: '50%',
      data: BarEditData
    })
  }

  editSubBar(BarEditData) {
    const dialogRef = this.dialog.open(SubBarFormComponent, {
      width: '50%',
      data: BarEditData
    })
  }

  deleteBar(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.barService.deleteBar(index).subscribe((data) => {
          this.getBar()
        })
      }
    })
  }
}
