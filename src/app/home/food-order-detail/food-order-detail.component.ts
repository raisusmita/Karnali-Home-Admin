import { Component, OnInit } from '@angular/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { MatTableDataSource } from '@angular/material'
import { FoodOrderService } from '../food-order/food-order.service'
import { ToastrService } from 'ngx-toastr'

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
    'total_amount'
    // This action can be used in future
    // "action",
  ]

  foodOrderColumns: string[] = [
    'order_no',
    'date',
    'ordered_from',
    'status',
    'action'
  ]
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

  constructor(
    // private foodService: FoodService,
    private foodOrderService: FoodOrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0
    this.skip = 0
    this.limit = this.pageSize
    this.getFoodOrderList()
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
          this.foodItemList = result.data
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

  editFoodOrder(orderedItems: [{}]) {
    this.openEditFoodOrder = true
    orderedItems.forEach((orderItem, index) => {
      if (index == 0) {
        this.foodOrderId = orderItem['food_order_id']
      }
      this.foodOrderEdit[orderItem['food_items_id']] = orderItem
    })
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
}
