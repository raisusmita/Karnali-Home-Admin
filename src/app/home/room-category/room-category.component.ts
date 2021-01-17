import { RoomCategoryService } from './room-category.service'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { RoomCategoryFormComponent } from './room-category-form/room-category-form.component'
import {
  UserActionPermission,
  UserRoleManagementService
} from 'src/app/shared/services/user-role-service/user-role-management.service'

@Component({
  selector: 'app-room-category',
  templateUrl: './room-category.component.html',
  styleUrls: ['./room-category.component.scss']
})
export class RoomCategoryComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'room_category',
    'room_type',
    'room_price',
    'number_of_rooms',
    'action'
  ]
  selectedRowIndex: number
  dataSource: any[]
  selectedRoomCategoryId: any
  @BlockUI() blockUI: NgBlockUI

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  ActionPermissions: UserActionPermission = {} as UserActionPermission

  constructor(
    private roomCategoryService: RoomCategoryService,
    private userRoleManagementService: UserRoleManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.getRoomCategoryList()
    this.manageUserPermission()
  }

  manageUserPermission() {
    if (
      !this.userRoleManagementService.isActionExists(
        this.userRoleManagementService.allRoutes.RoomCategory
      )
    ) {
      this.displayedColumns = this.displayedColumns.filter(
        (columns) => columns != 'action'
      )
    }
    this.ActionPermissions.Edit = this.userRoleManagementService.isEditExists(
      this.userRoleManagementService.allRoutes.RoomCategory
    )
    this.ActionPermissions.Delete = this.userRoleManagementService.isDeleteExists(
      this.userRoleManagementService.allRoutes.RoomCategory
    )
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    this.getRoomCategoryList()
  }
  getRoomCategoryList() {
    this.blockUI.start('Loading...')
    const roomCatParams = {
      limit: this.limit,
      skip: this.skip
    }

    this.roomCategoryService.getRoomCategoryList(roomCatParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount
          this.dataSource = result.data
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
  onAddClick() {
    const dialogRef = this.dialog.open(RoomCategoryFormComponent, {
      width: '50%',
      height: '700px',
      data: {
        gridData: null,
        formType: 'Add'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomCategoryList()
      }
    })
  }

  onEditClick(element) {
    const editData = JSON.parse(JSON.stringify(element))
    const dialogRef = this.dialog.open(RoomCategoryFormComponent, {
      width: '50%',
      height: '700px',
      data: {
        gridData: editData,
        formType: 'Edit'
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomCategoryList()
      }
    })
  }

  onDeleteClick(index) {
    this.selectedRowIndex = index
    this.selectedRoomCategoryId = this.dataSource[index].id

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.roomCategoryService
          .deleteRoomCategory(this.selectedRoomCategoryId)
          .subscribe(
            (data) => {
              this.getRoomCategoryList()
              // console.log(result);
              // const newArray = [...this.dataSource];
              // newArray.splice(this.selectedRowIndex, 1);
              // this.dataSource = newArray;
              // this.toastr.success('Successfully Removed!!', ' Branch Delete');
            }
            // err => {
            //   console.log(err);
            //   this.handleError(err.error);
            // }
          )
      }
    })
  }

  // handleError(err) {
  //   const message = err;
  //   const action = 'Alert!!!';
  //   this._snackBar.open(message, action, {
  //     duration: 2000
  //   });
  // }
}
