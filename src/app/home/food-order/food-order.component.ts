import { Component, OnInit } from '@angular/core'
import { map, startWith } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { TableService } from '../table/table.service'
import { RoomService } from '../room/room.service'
import { FoodService } from '../food/food.service'

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss']
})
export class FoodOrderComponent implements OnInit {
  table = []
  room = []

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
  foodOrderList = {}

  step = 0

  subFoodShow = false

  constructor(
    public tableService: TableService,
    public roomService: RoomService,
    public foodService: FoodService
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

  addFoodOrder() {
    if (Object.values(this.foodOrderList).length > 0) {
      Object.values(this.foodOrderList).forEach((foodOrderItem) => {
        if (this.selectedRoomNo) {
          foodOrderItem['room_id'] = this.actualRoomId || this.getRoomId()
          delete foodOrderItem['table_id']
        } else {
          foodOrderItem['table_id'] = this.actualTableId || this.getTableId()
          delete foodOrderItem['room_id']
        }
      })
      this.foodService
        .addFoodOrder(Object.values(this.foodOrderList))
        .subscribe(
          (foodOrder) => {
            //TODO: Loader and toaster is required
            // console.log(foodOrder);
            this.mainFoodChecked = {}
            this.foodOrderList = {}
          },
          (err) => {
            // TODO: Toast message is required
            console.log(err)
          }
        )
    }
  }

  setStep(index: number) {
    this.step = index
  }
}
