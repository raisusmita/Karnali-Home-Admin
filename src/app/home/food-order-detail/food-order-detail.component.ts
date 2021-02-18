import { Component, Input, OnInit } from '@angular/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { MatTableDataSource } from '@angular/material'
import { MatDialog } from '@angular/material/dialog'
import { FoodOrderService } from '../food-order/food-order.service'
import { ToastrService } from 'ngx-toastr'
import {
  UserActionPermission,
  UserRoleManagementService
} from 'src/app/shared/services/user-role-service/user-role-management.service'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'

@Component({
  selector: 'app-food-order-detail',
  templateUrl: './food-order-detail.component.html',
  styleUrls: ['./food-order-detail.component.scss']
})
export class FoodOrderDetailComponent implements OnInit {
  foodOrderListColumns: string[] = [
    'food_name',
    'price',
    'quantity',
    'total_amount',
    'food_status',
    'action'
  ]

  foodOrderColumns: string[] = [
    'order_no',
    'date',
    'ordered_from',
    'status',
    'action'
  ]
  actualFoodOrderData: []

  foodItemList: MatTableDataSource<Element>[]

  foodOrderEdit = {}
  openEditFoodOrder = false
  foodOrderId: any

  @BlockUI() blockUI: NgBlockUI

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  allowAddNewOrder: boolean = true

  ActionPermissions: UserActionPermission = {} as UserActionPermission

  @Input() callFrom: string

  constructor(
    // private foodService: FoodService,
    private foodOrderService: FoodOrderService,
    private userRoleManagementService: UserRoleManagementService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0
    this.skip = 0
    this.limit = this.pageSize
    this.getNavigation()
    this.getFoodOrderList()
    this.manageUserPermission()
  }

  getNavigation() {
    if (this.callFrom == 'dashboard') {
      this.allowAddNewOrder = false
    }
  }

  manageUserPermission() {
    if (
      !this.userRoleManagementService.isActionExists(
        this.userRoleManagementService.allRoutes.FoodOrderDetail
      )
    ) {
      this.foodOrderColumns = this.foodOrderColumns.filter(
        (columns) => columns != 'action'
      )
    }
    this.ActionPermissions.Edit = this.userRoleManagementService.isEditExists(
      this.userRoleManagementService.allRoutes.FoodOrderDetail
    )
    this.ActionPermissions.Delete = this.userRoleManagementService.isDeleteExists(
      this.userRoleManagementService.allRoutes.FoodOrderDetail
    )
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize
    this.getFoodOrderList()
  }

  getFoodOrderList() {
    this.blockUI.start('Loading...')
    const foodParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.foodOrderService.getFoodOrder(foodParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount
          this.actualFoodOrderData = JSON.parse(JSON.stringify(result.data))
          this.foodItemList = this.formatFoodDetails(
            JSON.parse(JSON.stringify(result.data))
          )
        }
        this.showFoodOrderDetail()
        this.blockUI.stop()
      },
      () => {
        this.blockUI.stop()
      }
    )
  }

  cancelFoodOrder(orderId) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.blockUI.start('Loading...')
        this.foodOrderService.cancelFoodOrder(orderId).subscribe(
          (result) => {
            if (result) {
              this.toastr.success(result.message, 'Success!!', {
                closeButton: true,
                positionClass: 'toast-top-right'
              })
              this.foodItemList = this.foodItemList.filter(
                (foodOrder) => foodOrder['id'] != orderId
              )
            }
            this.blockUI.stop()
          },
          () => {
            this.toastr.error('Error while cancelling food order', 'Error!!', {
              closeButton: true,
              positionClass: 'toast-top-right'
            })
            this.blockUI.stop()
          }
        )
      }
    })
  }

  cancelSingleFoodOrder(foodItem) {
    let deleteFood = {}
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    if (foodItem['coffee_items_id']) {
      deleteFood['coffee'] = foodItem.id
    } else if (foodItem['bar_items_id']) {
      deleteFood['bar'] = foodItem.id
    } else {
      deleteFood['food'] = foodItem.id
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.blockUI.start('Loading...')
        this.foodOrderService.cancelSIngleFoodOrder(deleteFood).subscribe(
          (result) => {
            if (result) {
              this.toastr.success(result.message, 'Success!!', {
                closeButton: true,
                positionClass: 'toast-top-right'
              })
              // Todo: Remove item through filter could be better
              this.getFoodOrderList()
            }
            this.blockUI.stop()
          },
          () => {
            this.toastr.error(
              'Error while cancelling single food order',
              'Error!!',
              {
                closeButton: true,
                positionClass: 'toast-top-right'
              }
            )
            this.blockUI.stop()
          }
        )
      }
    })
  }

  editFoodOrder(orderId) {
    this.openEditFoodOrder = true
    this.foodOrderId = orderId
    this.foodOrderEdit = this.actualFoodOrderData.filter(
      (food) => food['id'] == orderId
    )[0]
  }

  formatFoodDetails(data) {
    const foodDetail = data
    foodDetail.map((foodList) => {
      foodList['food_order_lists'] = [
        ...foodList['food_order_lists'],
        ...foodList['bar_order_lists'],
        ...foodList['coffee_order_lists']
      ]
    })
    return foodDetail
  }

  hideFoodOrder(data) {
    if (data['edit']) {
      this.getFoodOrderList()
    } else {
      this.showFoodOrderDetail()
    }
  }

  showFoodOrderDetail() {
    this.openEditFoodOrder = false
    this.foodOrderEdit = {}
  }

  updateOrderStatus(orderStatusValue, orderItemData) {
    let payload = {}
    if (orderItemData['coffee_items_id']) {
      payload['coffee'] = orderItemData.id
    } else if (orderItemData['food_items_id']) {
      payload['food'] = orderItemData.id
    } else {
      payload['bar'] = orderItemData.id
    }
    payload['order_status'] = orderStatusValue

    this.foodOrderService.updateOrderStatus(payload).subscribe(
      (result) => {
        if (result) {
          this.toastr.success(result.message, 'Success!!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          })
        }
        this.blockUI.stop()
      },
      () => {
        this.toastr.error('Error while updating order status', 'Error!!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        })
        this.blockUI.stop()
      }
    )
  }
}
