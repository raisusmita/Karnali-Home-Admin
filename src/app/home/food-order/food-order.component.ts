import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { TableService } from '../table/table.service'
import { RoomService } from '../room/room.service'
import { FoodService } from '../food/food.service'
import { FoodOrderService } from './food-order.service'
import { ToastrService } from 'ngx-toastr'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { CoffeeService } from '../coffee/coffee.service'
import { BarService } from '../bar/bar.service'

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

  selectedRoomNo = ''
  selectedTableNo = ''
  actualRoomId = null
  actualTableId = null

  mainFood = []
  mainCoffee = []
  mainBar = []

  mainFoodSelectedId: number
  mainCoffeeSelectedId: number
  mainBarSelectedId: number
  mainFoodChecked = {}
  mainCoffeeChecked = {}
  mainBarChecked = {}
  foodList = {}
  coffeeList = {}
  barList = {}

  @Input() foodOrderList = {
    food: {},
    coffee: {},
    bar: {}
  }

  step = 0
  subFoodShow = false

  isFoodCardSelected = false
  isCoffeeCardSelected = false
  isBarCardSelected = false

  @BlockUI() blockUI: NgBlockUI

  @Output() closeFoodOrder: EventEmitter<any> = new EventEmitter()

  constructor(
    public tableService: TableService,
    public roomService: RoomService,
    public foodService: FoodService,
    public coffeeService: CoffeeService,
    public barService: BarService,
    public foodOrderService: FoodOrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTable()
    this.getRooms()
    if (this.isEdit) {
      this.checkMainFoodOnEdit(Object.values(this.foodOrderList['food']))
      if (Object.values(this.foodOrderList['food'])[0]['room_id']) {
        this.actualRoomId = Object.values(this.foodOrderList['food'])[0][
          'room_id'
        ]
        this.selectedRoomNo = Object.values(this.foodOrderList['food'])[0][
          'room'
        ]['room_number']
      } else {
        this.actualTableId = Object.values(this.foodOrderList['food'])[0][
          'table_id'
        ]
        this.selectedTableNo = Object.values(this.foodOrderList['food'])[0][
          'table'
        ]['table_number']
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

  getMainCoffee() {
    this.coffeeService.getMainCoffee().subscribe((mainCoffee) => {
      this.mainCoffee = mainCoffee.data
    })
  }

  getMainBar() {
    this.barService.getMainBar().subscribe((mainBar) => {
      this.mainBar = mainBar.data
    })
  }

  getSubFoodAndFoodItems(mainFoodValue) {
    if (this.isFoodCardSelected) {
      this.fetchSubFoodAndFoodItemsOfFood(mainFoodValue.id)
    } else if (this.isCoffeeCardSelected) {
      this.fetchCoffeeItem(mainFoodValue.id)
    } else {
      this.fetchBarItem(mainFoodValue.id)
    }
  }

  fetchSubFoodAndFoodItemsOfFood(mainFoodId) {
    this.mainFoodSelectedId = mainFoodId
    if (
      !Object.keys(this.foodList).includes(this.mainFoodSelectedId.toString())
    ) {
      this.foodService
        .getSubFoodAndFoodItemsById({ id: mainFoodId })
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

  fetchCoffeeItem(mainCoffeeId) {
    this.mainCoffeeSelectedId = mainCoffeeId
    if (
      !Object.keys(this.coffeeList).includes(
        this.mainCoffeeSelectedId.toString()
      )
    ) {
      this.coffeeService
        .getCoffeeItemsById({ id: mainCoffeeId })
        .subscribe((coffeeItems) => {
          this.coffeeList[this.mainCoffeeSelectedId] = {
            coffeeItems: {}
          }
          this.coffeeList[this.mainCoffeeSelectedId]['coffeeItems'] =
            coffeeItems.data['coffeeItems']
        })
    }
  }

  fetchBarItem(mainBarId) {
    this.mainBarSelectedId = mainBarId
    if (
      !Object.keys(this.barList).includes(this.mainBarSelectedId.toString())
    ) {
      this.barService
        .getBarItemsById({ id: mainBarId })
        .subscribe((barItems) => {
          this.barList[this.mainBarSelectedId] = {
            foodItems: {}
          }
          this.barList[this.mainBarSelectedId]['barItems'] =
            barItems.data['barItems']
        })
    }
  }

  selectRoom(roomNumber) {
    this.selectedTableNo = null
    this.actualRoomId = null
    this.actualTableId = null
    this.selectedRoomNo = roomNumber
  }

  selectTable(tableNumber) {
    this.selectedRoomNo = null
    this.actualRoomId = null
    this.actualTableId = null
    this.selectedTableNo = tableNumber
  }

  storeFoodOrder(event, data) {
    if (event.checked) {
      this.saveNewFoodOrder(data)
      //Todo: Need to handle main food id as well
    } else {
      delete this.foodOrderList['food'][data.id]
      this.mainFoodChecked[data.main_food_category_id] -= 1
    }
  }

  storeCoffeeOrder(event, data) {
    if (event.checked) {
      this.saveNewCoffeeOrder(data)
      //Todo: Need to handle main food id as well
    } else {
      delete this.foodOrderList['coffee'][data.id]
      this.mainCoffeeChecked[data.main_coffee_category_id] -= 1
    }
  }

  storeBarOrder(event, data) {
    if (event.checked) {
      this.saveNewBarOrder(data)
      //Todo: Need to handle main food id as well
    } else {
      delete this.foodOrderList['bar'][data.id]
      this.mainBarChecked[data.main_bar_category_id] -= 1
    }
  }

  maintainFoodOrderQuantity(event, data) {
    if (this.foodOrderList['food'][data.id]) {
      this.foodOrderList['food'][data.id]['quantity'] = parseInt(
        event.target.value
      )
      this.foodOrderList['food'][data.id]['total_amount'] =
        data.price * this.foodOrderList['food'][data.id]['quantity']
    } else {
      const quantity = parseInt(event.target.value)
      this.saveNewFoodOrder(data, quantity)
    }
  }

  maintainCoffeeOrderQuantity(event, data) {
    if (this.foodOrderList['coffee'][data.id]) {
      this.foodOrderList['coffee'][data.id]['quantity'] = parseInt(
        event.target.value
      )
      this.foodOrderList['coffee'][data.id]['total_amount'] =
        data.price * this.foodOrderList['coffee'][data.id]['quantity']
    } else {
      const quantity = parseInt(event.target.value)
      this.saveNewCoffeeOrder(data, quantity)
    }
  }

  maintainBarOrderQuantity(event, data) {
    if (this.foodOrderList['bar'][data.id]) {
      this.foodOrderList['bar'][data.id]['quantity'] = parseInt(
        event.target.value
      )
      this.foodOrderList['bar'][data.id]['total_amount'] =
        data.price * this.foodOrderList['bar'][data.id]['quantity']
    } else {
      const quantity = parseInt(event.target.value)
      this.saveNewBarOrder(data, quantity)
    }
  }

  saveNewFoodOrder(data, quantity = 1) {
    this.foodOrderList['food'][data.id] = {}
    this.foodOrderList['food'][data.id]['food_items_id'] = data.id
    this.foodOrderList['food'][data.id]['quantity'] = quantity
    this.foodOrderList['food'][data.id]['price'] = data.price
    this.foodOrderList['food'][data.id]['total_amount'] =
      data.price * this.foodOrderList['food'][data.id]['quantity']
    if (this.mainFoodChecked[data.main_food_category_id]) {
      this.mainFoodChecked[data.main_food_category_id] += 1
    } else {
      this.mainFoodChecked[data.main_food_category_id] = 1
    }
  }

  saveNewCoffeeOrder(data, quantity = 1) {
    this.foodOrderList['coffee'][data.id] = {}
    this.foodOrderList['coffee'][data.id]['coffee_items_id'] = data.id
    this.foodOrderList['coffee'][data.id]['quantity'] = quantity
    this.foodOrderList['coffee'][data.id]['price'] = data.price
    this.foodOrderList['coffee'][data.id]['total_amount'] =
      data.price * this.foodOrderList['coffee'][data.id]['quantity']
    if (this.mainCoffeeChecked[data.main_coffee_category_id]) {
      this.mainCoffeeChecked[data.main_coffee_category_id] += 1
    } else {
      this.mainCoffeeChecked[data.main_coffee_category_id] = 1
    }
  }

  saveNewBarOrder(data, quantity = 1) {
    this.foodOrderList['bar'][data.id] = {}
    this.foodOrderList['bar'][data.id]['bar_items_id'] = data.id
    this.foodOrderList['bar'][data.id]['quantity'] = quantity
    this.foodOrderList['bar'][data.id]['price'] = data.price
    this.foodOrderList['bar'][data.id]['total_amount'] =
      data.price * this.foodOrderList['bar'][data.id]['quantity']
    if (this.mainBarChecked[data.main_bar_category_id]) {
      this.mainBarChecked[data.main_bar_category_id] += 1
    } else {
      this.mainBarChecked[data.main_bar_category_id] = 1
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
    if (Object.values(this.foodOrderList['food']).length > 0) {
      Object.values(this.foodOrderList['food']).forEach((foodOrderItem) => {
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

  maintainCoffeeOrder() {
    const validFoodLists = [
      'food_order_id',
      'coffee_items_id',
      'price',
      'quantity',
      'room_id',
      'table_id',
      'invoice_id',
      'total_amount',
      'created_at'
    ]
    if (Object.values(this.foodOrderList['coffee']).length > 0) {
      Object.values(this.foodOrderList['coffee']).forEach((coffeeOrderItem) => {
        Object.keys(coffeeOrderItem).forEach(
          (key) => validFoodLists.includes(key) || delete coffeeOrderItem[key]
        )
        if (coffeeOrderItem['coffee_items']) {
          delete coffeeOrderItem['coffee_items']
        }
        delete coffeeOrderItem['room']
          ? coffeeOrderItem['room']
          : coffeeOrderItem['table']
        if (this.selectedRoomNo) {
          coffeeOrderItem['room_id'] = this.actualRoomId || this.getRoomId()
          delete coffeeOrderItem['table_id']
        } else {
          coffeeOrderItem['table_id'] = this.actualTableId || this.getTableId()
          delete coffeeOrderItem['room_id']
        }
      })
    }
  }

  maintainBarOrder() {
    const validFoodLists = [
      'food_order_id',
      'bar_items_id',
      'price',
      'quantity',
      'room_id',
      'table_id',
      'invoice_id',
      'total_amount',
      'created_at'
    ]
    if (Object.values(this.foodOrderList['bar']).length > 0) {
      Object.values(this.foodOrderList['bar']).forEach((barOrderItem) => {
        Object.keys(barOrderItem).forEach(
          (key) => validFoodLists.includes(key) || delete barOrderItem[key]
        )
        if (barOrderItem['bar_items']) {
          delete barOrderItem['bar_items']
        }
        delete barOrderItem['room']
          ? barOrderItem['room']
          : barOrderItem['table']
        if (this.selectedRoomNo) {
          barOrderItem['room_id'] = this.actualRoomId || this.getRoomId()
          delete barOrderItem['table_id']
        } else {
          barOrderItem['table_id'] = this.actualTableId || this.getTableId()
          delete barOrderItem['room_id']
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
            this.foodOrderList = {
              food: {},
              bar: {},
              coffee: {}
            }
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
    this.maintainBarOrder()
    this.maintainCoffeeOrder()

    const orderList = this.foodOrderList
    orderList['coffee'] = Object.values(orderList['coffee'])
    orderList['bar'] = Object.values(orderList['bar'])
    orderList['food'] = Object.values(orderList['food'])

    if (Object.values(orderList).length > 0) {
      this.foodService.addFoodOrder(orderList).subscribe(
        (foodOrder) => {
          this.toastr.success(foodOrder.message, 'Success!!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          })
          this.mainFoodChecked = {}
          this.mainCoffeeChecked = {}
          this.mainBarChecked = {}
          this.foodOrderList = {
            coffee: {},
            bar: {},
            food: {}
          }
          this.selectedRoomNo = ''
          this.selectedTableNo = ''
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

  selectCafeCard() {
    this.getMainCoffee()
    this.setSelectedCard(true, false, false)
  }

  selectBarCard() {
    this.getMainBar()
    this.setSelectedCard(false, true, false)
  }

  selectFoodCard() {
    this.getMainFood()
    this.setSelectedCard(false, false, true)
  }

  setSelectedCard(cafe: boolean, bar: boolean, food: boolean) {
    this.isBarCardSelected = bar
    this.isCoffeeCardSelected = cafe
    this.isFoodCardSelected = food
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
