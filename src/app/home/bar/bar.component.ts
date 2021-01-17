import { Component, OnInit } from '@angular/core'
import { BarService } from './bar.service'
import { MatDialog } from '@angular/material/dialog'
import { BarFormComponent } from './bar-form/bar-form.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { MainBarFormComponent } from './main-bar-form/main-bar-form.component'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import {
  UserActionPermission,
  UserRoleManagementService
} from 'src/app/shared/services/user-role-service/user-role-management.service'

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  displayedColumns: string[] = [
    'mainBarCategory',
    'barName',
    'quantity',
    'price',
    'action'
  ]
  mainBarDisplayedColumns: string[] = ['mainBarCategory', 'action']
  dataSource: any[]
  mainBar: any[]
  barHeader: any[]

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  barTotalLength: number
  mainBarTotalLength: number

  limit: number
  skip: number

  tabLabel: string

  @BlockUI() blockUI: NgBlockUI

  ActionPermissions: UserActionPermission = {} as UserActionPermission

  constructor(
    private barService: BarService,
    private userRoleManagementService: UserRoleManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initialize()
    this.manageUserPermission()
  }

  manageUserPermission() {
    if (
      !this.userRoleManagementService.isActionExists(
        this.userRoleManagementService.allRoutes.Bar
      )
    ) {
      this.displayedColumns = this.displayedColumns.filter(
        (columns) => columns != 'action'
      )
    }
    this.ActionPermissions.Edit = this.userRoleManagementService.isEditExists(
      this.userRoleManagementService.allRoutes.Bar
    )
    this.ActionPermissions.Delete = this.userRoleManagementService.isDeleteExists(
      this.userRoleManagementService.allRoutes.Bar
    )
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.mainBarTotalLength = 0
    this.barTotalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.tabLabel = 'Bar Items'
    this.getBar()
    this.getMainBar()
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
