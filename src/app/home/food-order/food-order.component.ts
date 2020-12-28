import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { map, startWith } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { TableService } from '../table/table.service'
import { RoomService } from '../room/room.service'
import { FoodService } from '../food/food.service'
import { FoodOrderService } from './food-order.service'
import { ToastrService } from 'ngx-toastr'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss']
})
export class FoodOrderComponent implements OnInit {
  table = []
  room = []

  @Input() isEdit = false
  @Input() foodOrderId: number

  OrderId: number

  filteredTables: Observable<string[]>
  filteredRooms: Observable<string[]>

  searchedTableValue = new FormControl()
  searchedRoomValue = new FormControl()

  selectedRoomNo = ''
  selectedTableNo = ''
  actualRoomId = null
  actualTableId = null

  mainFood = []
  mainFoodSelectedId: number
  foodHeader = {}
  mainFoodChecked = {}
  foodList = {}
  @Input() foodOrderList = {}
  step = 0
  subFoodShow = false

  @BlockUI() blockUI: NgBlockUI

  @Output() closeFoodOrder: EventEmitter<any> = new EventEmitter()

  constructor(
    public tableService: TableService,
    public roomService: RoomService,
    public foodService: FoodService,
    public foodOrderService: FoodOrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTable()
    this.getRooms()
    this.filteredTables = this.searchedTableValue.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTable(value))
    )
    this.filteredRooms = this.searchedRoomValue.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRoom(value))
    )
    this.getMainFood()
    this.getFoodHeader()

    if (this.isEdit) {
      this.checkMainFoodOnEdit(Object.values(this.foodOrderList))
      if (Object.values(this.foodOrderList)[0]['room_id']) {
        this.actualRoomId = Object.values(this.foodOrderList)[0]['room_id']
        this.selectedRoomNo = Object.values(this.foodOrderList)[0]['room'][
          'room_number'
        ]
      } else {
        this.actualTableId = Object.values(this.foodOrderList)[0]['table_id']
        this.selectedTableNo = Object.values(this.foodOrderList)[0]['table'][
          'table_number'
        ]
      }
    }
  }

  getTable() {
    this.tableService.getTable().subscribe((result) => {
      this.table = result.data
    })
  }

  getRooms() {
    this.roomService.getRoom().subscribe((result) => {
      this.room = result.data
    })
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((mainFood) => {
      this.mainFood = mainFood.data
    })
  }

  getFoodHeader() {
    this.foodService.getFoodHeader().subscribe((header) => {
      header.data.forEach((foodHead) => {
        this.foodHeader[foodHead.id] = foodHead.food_header
      })
    })
  }

  getSubFoodAndFoodItems(mainFoodValue) {
    this.mainFoodSelectedId = mainFoodValue.id
    if (
      !Object.keys(this.foodList).includes(this.mainFoodSelectedId.toString())
    ) {
      this.foodService
        .getSubFoodAndFoodItemsById({ id: mainFoodValue.id })
        .subscribe((subFoodItems) => {
          this.foodList[this.mainFoodSelectedId] = {
            subFood: [],
            foodItems: {}
          }
          this.foodList[this.mainFoodSelectedId]['subFood'].push(
            ...subFoodItems.data['subFood']
          )
          this.foodList[this.mainFoodSelectedId]['foodItems'] =
            subFoodItems.data['foodItems']
        })
    }
  }

  selectRoom(roomNumber) {
    this.searchedTableValue.setValue('')
    this.selectedTableNo = null
    this.actualRoomId = null
    this.actualTableId = null
    this.selectedRoomNo = roomNumber
  }

  selectTable(tableNumber) {
    this.searchedRoomValue.setValue('')
    this.selectedRoomNo = null
    this.actualRoomId = null
    this.actualTableId = null
    this.selectedTableNo = tableNumber
  }

  private _filterTable(value: string): string[] {
    const filterValue = value.toLowerCase().trim()
    if (filterValue == '' || !filterValue) {
      return this.table
    }
    return this.table.filter((option) =>
      option.table_number.toLowerCase().includes(filterValue)
    )
  }

  private _filterRoom(value: string): string[] {
    const filterValue = value.toLowerCase().trim()
    if (this.room) {
      return this.room.filter((option) =>
        option.room_number.toLowerCase().includes(filterValue)
      )
    }
  }

  storeFoodOrder(event, data) {
    if (event.checked) {
      this.saveNewFoodOrder(data)
      //Todo: Need to handle main food id as well
    } else {
      delete this.foodOrderList[data.id]
      this.mainFoodChecked[data.main_food_category_id] -= 1
    }
  }

  maintainOrderQuantity(event, data) {
    if (this.foodOrderList[data.id]) {
      this.foodOrderList[data.id]['quantity'] = parseInt(event.target.value)
      this.foodOrderList[data.id]['total_amount'] =
        data.price * this.foodOrderList[data.id]['quantity']
    } else {
      // Default Order value is 1, so to increase it by 1 on the first click quantity is set as 2
      const quantity = 2
      this.saveNewFoodOrder(data, quantity)
    }
  }

  saveNewFoodOrder(data, quantity = 1) {
    this.foodOrderList[data.id] = {}
    this.foodOrderList[data.id]['food_items_id'] = data.id
    this.foodOrderList[data.id]['quantity'] = quantity
    this.foodOrderList[data.id]['price'] = data.price
    this.foodOrderList[data.id]['total_amount'] =
      data.price * this.foodOrderList[data.id]['quantity']
    if (this.mainFoodChecked[data.main_food_category_id]) {
      this.mainFoodChecked[data.main_food_category_id] += 1
    } else {
      this.mainFoodChecked[data.main_food_category_id] = 1
    }
  }

  getRoomId() {
    this.actualRoomId = this.room.filter(
      (room) => room.room_number == this.selectedRoomNo
    )[0].id
    return this.actualRoomId
  }

  getTableId() {
    this.actualTableId = this.table.filter(
      (tableData) => tableData.table_number == this.selectedTableNo
    )[0].id
    return this.actualTableId
  }

  maintainFoodOrder() {
    const validFoodLists = [
      'food_order_id',
      'food_items_id',
      'price',
      'quantity',
      'room_id',
      'table_id',
      'invoice_id',
      'total_amount',
      'created_at'
    ]
    if (Object.values(this.foodOrderList).length > 0) {
      Object.values(this.foodOrderList).forEach((foodOrderItem) => {
        Object.keys(foodOrderItem).forEach(
          (key) => validFoodLists.includes(key) || delete foodOrderItem[key]
        )
        if (foodOrderItem['food_items']) {
          delete foodOrderItem['food_items']
        }
        delete foodOrderItem['room']
          ? foodOrderItem['room']
          : foodOrderItem['table']

        if (this.selectedRoomNo) {
          foodOrderItem['room_id'] = this.actualRoomId || this.getRoomId()
          delete foodOrderItem['table_id']
        } else {
          foodOrderItem['table_id'] = this.actualTableId || this.getTableId()
          delete foodOrderItem['room_id']
        }
      })
    }
  }

  editFoodOrderList() {
    this.maintainFoodOrder()
    if (Object.values(this.foodOrderList).length > 0) {
      this.blockUI.start('Loading...')
      this.foodOrderService
        .editFoodOrder(this.foodOrderId, Object.values(this.foodOrderList))
        .subscribe(
          (foodOrder) => {
            this.toastr.success(foodOrder.message, 'Success!!', {
              closeButton: true,
              positionClass: 'toast-top-right'
            })
            this.mainFoodChecked = {}
            this.foodOrderList = {}
            this.closeFoodOrder.emit({ edit: true })
            this.blockUI.stop()
          },
          (err) => {
            this.blockUI.stop()
            this.toastr.error(err.message, 'Failed!!', {
              closeButton: true,
              positionClass: 'toast-top-right'
            })
          }
        )
    } else {
      this.blockUI.stop()
      this.toastr.info('Unselected all food items.', 'Better to Cancel!!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })
    }
  }

  storeFoodOrderList() {
    this.blockUI.start('Loading...')
    this.maintainFoodOrder()
    if (Object.values(this.foodOrderList).length > 0) {
      this.foodService
        .addFoodOrder(Object.values(this.foodOrderList))
        .subscribe(
          (foodOrder) => {
            this.toastr.success(foodOrder.message, 'Success!!', {
              closeButton: true,
              positionClass: 'toast-top-right'
            })
            this.mainFoodChecked = {}
            this.foodOrderList = {}
            this.blockUI.stop()
          },
          (err) => {
            this.toastr.error(err.message, 'Failed!!', {
              closeButton: true,
              positionClass: 'toast-top-right'
            })
            this.blockUI.stop()
          }
        )
    } else {
      this.blockUI.stop()
      this.toastr.info('No foods are selected to order', 'Be Careful!!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })
    }
  }

  checkMainFoodOnEdit(data) {
    let mainFoodValue = {}
    data.forEach((element, index) => {
      if (index == 0) {
        mainFoodValue['id'] = element['food_items']['main_food_category_id']
      }
      if (
        this.mainFoodChecked[element['food_items']['main_food_category_id']]
      ) {
        this.mainFoodChecked[
          element['food_items']['main_food_category_id']
        ] += 1
      } else {
        this.mainFoodChecked[element['food_items']['main_food_category_id']] = 1
      }
    })
    this.getSubFoodAndFoodItems(mainFoodValue)
  }

  editFoodOrder() {
    this.editFoodOrderList()
  }

  cancelOrderEdit() {
    this.closeFoodOrder.emit({ edit: false })
  }

  setStep(index: number) {
    this.step = index
  }
}
