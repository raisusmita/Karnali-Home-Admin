import { Component, OnInit } from '@angular/core'
import { CoffeeService } from './coffee.service'
import { MatDialog } from '@angular/material/dialog'
import { CoffeeFormComponent } from './coffee-form/coffee-form.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { MainCoffeeFormComponent } from './main-coffee-form/main-coffee-form.component'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import {
  UserActionPermission,
  UserRoleManagementService
} from 'src/app/shared/services/user-role-service/user-role-management.service'

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {
  displayedColumns: string[] = [
    'mainCoffeeCategory',
    'coffeeName',
    'price',
    'action'
  ]
  mainCoffeeDisplayedColumns: string[] = ['mainCoffeeCategory', 'action']
  dataSource: any[]
  mainCoffee: any[]
  coffeeHeader: any[]

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  coffeeTotalLength: number
  mainCoffeeTotalLength: number

  limit: number
  skip: number

  tabLabel: string

  @BlockUI() blockUI: NgBlockUI

  ActionPermissions: UserActionPermission = {} as UserActionPermission

  constructor(
    private coffeeService: CoffeeService,
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
        this.userRoleManagementService.allRoutes.Coffee
      )
    ) {
      this.displayedColumns = this.displayedColumns.filter(
        (columns) => columns != 'action'
      )
    }
    this.ActionPermissions.Edit = this.userRoleManagementService.isEditExists(
      this.userRoleManagementService.allRoutes.Coffee
    )
    this.ActionPermissions.Delete = this.userRoleManagementService.isDeleteExists(
      this.userRoleManagementService.allRoutes.Coffee
    )
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.mainCoffeeTotalLength = 0
    this.coffeeTotalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.tabLabel = 'Coffee Items'
    this.getCoffee()
    this.getMainCoffee()
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    if (this.tabLabel == 'Coffee Items') {
      this.getCoffee()
    } else if (this.tabLabel == 'Main Coffee') {
      this.getMainCoffee()
    }
  }

  getCoffee() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.coffeeService.getCoffeeList(paginationParams).subscribe((result) => {
      this.dataSource = result.data
      this.coffeeTotalLength = result.totalCount
    })
  }

  getMainCoffee() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.coffeeService
      .getMainCoffeeList(paginationParams)
      .subscribe((result) => {
        this.mainCoffee = result.data
        this.mainCoffeeTotalLength = result.totalCount
      })
  }

  addCoffee() {
    const dialogRef = this.dialog.open(CoffeeFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCoffee()
      }
    })
  }

  addMainCoffee() {
    const dialogRef = this.dialog.open(MainCoffeeFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMainCoffee()
      }
    })
  }

  editCoffee(CoffeeEditData) {
    const dialogRef = this.dialog.open(CoffeeFormComponent, {
      width: '50%',
      data: CoffeeEditData
    })
  }

  editMainCoffee(CoffeeEditData) {
    const dialogRef = this.dialog.open(MainCoffeeFormComponent, {
      width: '50%',
      data: CoffeeEditData
    })
  }

  deleteCoffee(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.coffeeService.deleteCoffee(index).subscribe((data) => {
          this.getCoffee()
        })
      }
    })
  }
}
