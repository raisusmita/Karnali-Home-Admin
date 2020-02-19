import { EditRoomCategoryComponent } from "./edit-room-category/edit-room-category.component";
import { NewRoomCategoryComponent } from "./new-room-category/new-room-category.component";
import { RoomCategoryService } from "./room-category.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

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
    "room_category",
    "number_of_room",
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
      console.log(result);
      if (result) {
        // const newArray = [...this.dataSource];
        // newArray.push(result);
        // this.dataSource = newArray;

        this.getRoomCategory();
      }
    });
  }

  onEditClick(index) {
    this.selectedRowIndex = index;
    this.selectedRoomCategoryId = this.dataSource[index].id;

    const dialogRef = this.dialog.open(EditRoomCategoryComponent, {
      width: "50%",
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        // const newArray = [...this.dataSource];
        // newArray.push(result);
        // this.dataSource = newArray;

        this.getRoomCategory();
      }
    });
    // console.log(index);
  }
}
