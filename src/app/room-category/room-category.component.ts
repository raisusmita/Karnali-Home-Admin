import { EditRoomCategoryComponent } from "./edit-room-category/edit-room-category.component";
import { NewRoomCategoryComponent } from "./new-room-category/new-room-category.component";
import { RoomCategoryService } from "./room-category.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddRoomComponent } from "../room/add-room/add-room.component";
import { ConfirmDeleteComponent } from "../shared/confirm-delete/confirm-delete.component";

@Component({
  selector: "app-room-category",
  templateUrl: "./room-category.component.html",
  styleUrls: ["./room-category.component.css"]
})
export class RoomCategoryComponent implements OnInit {
  constructor(
    private roomCategoryService: RoomCategoryService,
    private dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    "id",
    "image",
    "room_category",
    "room_type",
    "room_price",
    "number_of_rooms",
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
        this.getRoomCategory();
      }
    });
  }

  onEditClick(element) {
    const dialogRef = this.dialog.open(NewRoomCategoryComponent, {
      width: "50%",
      data: element
    });
  }

  onDeleteClick(index) {
    this.selectedRowIndex = index;
    this.selectedRoomCategoryId = this.dataSource[index].id;

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.roomCategoryService
          .deleteRoomCategory(this.selectedRoomCategoryId)
          .subscribe(
            data => {
              this.getRoomCategory();
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
          );
      }
    });
  }

  // handleError(err) {
  //   const message = err;
  //   const action = 'Alert!!!';
  //   this._snackBar.open(message, action, {
  //     duration: 2000
  //   });
  // }
}
