import { Component, OnInit } from "@angular/core";
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableService } from '../table/table.service';
import { RoomService } from '../room/room.service';

@Component({
  selector: "app-food-order",
  templateUrl: "./food-order.component.html",
  styleUrls: ["./food-order.component.scss"],
})
export class FoodOrderComponent implements OnInit {

  selectedTable = new FormControl('');
  selectedRoom = new FormControl('');

  table = [];
  room = [];
  filteredTables: Observable<string[]>;
  filteredRooms: Observable<string[]>;


  constructor(public tableService: TableService, public roomService: RoomService) { }

  ngOnInit() {
    this.getTable();
    this.filteredTables = this.selectedTable.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredRooms = this.selectedRoom.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'room'))
    );

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

  public _filter(value: string, selectionType = 'table'): string[] {
    const filterValue = value.toLowerCase();
    // console.log(this.selectedTable.value);
    if (selectionType == 'table') {
      return this.table.filter(option => option.table_number.toLowerCase().includes(filterValue));
    }
    return this.room.filter(option => option.room_number.toLowerCase().includes(filterValue));

  }
}
