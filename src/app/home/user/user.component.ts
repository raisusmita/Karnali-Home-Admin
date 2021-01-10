import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
// import { CustomerService } from '../customer/customer.service';
// import { CustomerFormComponent } from '../customer/customer-form/customer-form.component';
import { UserFormComponent } from './user-form/user-form.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { UserService } from 'src/app/home/user/user.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import {
  UserActionPermission,
  UserRoleManagementService
} from 'src/app/shared/services/user-role-service/user-role-management.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'action']
  dataSource: any[]
  @BlockUI() blockUI: NgBlockUI
  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  ActionPermissions: UserActionPermission = {} as UserActionPermission

  constructor(
    private userService: UserService,
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
        this.userRoleManagementService.allRoutes.User
      )
    ) {
      this.displayedColumns = this.displayedColumns.filter(
        (columns) => columns != 'action'
      )
    }
    this.ActionPermissions.Edit = this.userRoleManagementService.isEditExists(
      this.userRoleManagementService.allRoutes.User
    )
    this.ActionPermissions.Delete = this.userRoleManagementService.isDeleteExists(
      this.userRoleManagementService.allRoutes.User
    )
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.getUser()
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    this.getUser()
  }

  getUser() {
    this.blockUI.start('Loading...')
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.userService.getUserList(paginationParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.dataSource = result.data
          this.totalLength = result.totalCount

          this.blockUI.stop()
        } else {
          this.blockUI.stop()
        }
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUser()
      }
    })
  }
  editUser(userEditData) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '50%',
      data: userEditData
    })
  }

  deleteUser(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.deleteUser(index).subscribe((data) => {
          this.getUser()
        })
      }
    })
  }
}
