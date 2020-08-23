import { Component, OnInit } from "@angular/core";
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableService } from '../table/table.service';
import { RoomService } from '../room/room.service';
import { FoodService } from '../food/food.service';

@Component({
  selector: "app-food-order",
  templateUrl: "./food-order.component.html",
  styleUrls: ["./food-order.component.scss"],
})
export class FoodOrderComponent implements OnInit {
  table = [];
  room = [];

  filteredTables: Observable<string[]>;
  filteredRooms: Observable<string[]>;

  searchedTableValue = new FormControl();
  searchedRoomValue = new FormControl();

  roomSelected = '';
  tableSelected = '';


  mainFood = [];
  mainFoodSelectedId: number;
  mainFoodCheckbox = [1, 5];
  foodList = {
  };

  subFoodShow = false;


  constructor(public tableService: TableService, public roomService: RoomService, public foodService: FoodService) { }

  ngOnInit() {
    this.getTable();
    this.getRooms();
    this.filteredTables = this.searchedTableValue.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTable(value))
    );
    this.filteredRooms = this.searchedRoomValue.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRoom(value))
    );

    this.getMainFood();
  }

  getTable() {
    this.tableService.getTable().subscribe((result) => {
      this.table = result.data;
    });
  }

  getRooms() {
    this.roomService.getRoom().subscribe((result) => {
      this.room = result.data;
    });
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe(mainFood => {
      this.mainFood = mainFood.data;
    });
  }

  getSubFoodAndFoodItems(mainFoodValue) {
    this.mainFoodSelectedId = mainFoodValue.id;

    if (!Object.keys(this.foodList).includes(this.mainFoodSelectedId.toString())) {
      this.foodService.getSubFoodAndFoodItemsById({ 'id': mainFoodValue.id }).subscribe(subFoodItems => {
        this.foodList[this.mainFoodSelectedId] = {
          "subFood": [],
          "foodItems": []
        };
        this.foodList[this.mainFoodSelectedId]['subFood'].push(...subFoodItems.data['subFood']);
        this.foodList[this.mainFoodSelectedId]['foodItems'].push(...subFoodItems.data['foodItems']);
      });
    }
    console.log(this.foodList);

  }

  selectRoom(room) {
    this.tableSelected = null;
    this.roomSelected = room;

  }

  selectTable(table) {
    this.roomSelected = null;
    this.tableSelected = table;
  }

  private _filterTable(value: string): string[] {
    const filterValue = value.toLowerCase().trim();
    if (filterValue == '' || !filterValue) {
      return this.table;
    }
    return this.table.filter(option => option.table_number.toLowerCase().includes(filterValue));
  }

  private _filterRoom(value: string): string[] {
    const filterValue = value.toLowerCase().trim();
    return this.room.filter(option => option.room_number.toLowerCase().includes(filterValue));
  }




}
