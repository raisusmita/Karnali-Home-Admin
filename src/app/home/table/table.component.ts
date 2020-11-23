import { AddTableComponent } from './add-table/add-table.component'
import { MatDialog } from '@angular/material/dialog'
import { TableService } from './table.service'
import { Component, OnInit } from '@angular/core'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['table_number', 'created_at', 'action']
  dataSource: any[]
  selectedRowIndex: number
  selectedRoomId: any

  @BlockUI() blockUI: NgBlockUI

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  constructor(private tableService: TableService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.getTable()
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    this.getTable()
  }

  getTable() {
    this.blockUI.start('Loading...')
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.tableService.getTableList(paginationParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.dataSource = result.data
          this.totalLength = result.totalCount
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

  addTable() {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTable()
      }
    })
  }
  editTable(tableEditData) {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '50%',
      data: tableEditData
    })
  }

  deleteTable(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.tableService.deleteTable(index).subscribe((data) => {
          this.getTable()
        })
      }
    })
  }
}
