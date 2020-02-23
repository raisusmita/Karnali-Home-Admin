import { EditRoomCategoryComponent } from "./edit-room-category/edit-room-category.component";
import { NewRoomCategoryComponent } from "./new-room-category/new-room-category.component";
import { RoomCategoryService } from "./room-category.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddRoomComponent } from "../room/add-room/add-room.component";

@Component({
  selector: "app-room-category",
  templateUrl: "./room-category.component.html",
  styleUrls: ["./room-category.component.css"]
})
export class RoomCategoryComponent implements OnInit {
  constructor(
    public roomCategoryService: RoomCategoryService,
    private dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    "id",
    "image",
    "room_category",
    "room_price",
    "created_at",
    "action"
  ];
  selectedRowIndex: number;
  dataSource: any[];
  selectedRoomCategoryId: any;

  getRoomCategory() {
    this.roomCategoryService.getRoomCategory().subscribe(data => {
      this.dataSource = data.data;
    });
  }

  ngOnInit() {
    this.getRoomCategory();
  }

  onAddClick() {
    const dialogRef = this.dialog.open(NewRoomCategoryComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const newArray = [...this.dataSource];
        // newArray.push(result);
        // this.dataSource = newArray;

        this.getRoomCategory();
      }
    });
  }

  onEditClick(element) {
    // this.selectedRowelement = element;
    // this.selectedRoomCategoryId = this.dataSource[element].id;

    const dialogRef = this.dialog.open(NewRoomCategoryComponent, {
      width: "50%",
      data: element
    });
  }
}
