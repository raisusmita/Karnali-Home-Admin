import { RoomCategoryService } from "./room-category.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { RoomCategoryFormComponent } from "./room-category-form/room-category-form.component";

@Component({
  selector: "app-room-category",
  templateUrl: "./room-category.component.html",
  styleUrls: ["./room-category.component.scss"],
})
export class RoomCategoryComponent implements OnInit {
  displayedColumns: string[] = [
    "image",
    "room_category",
    "room_type",
    "room_price",
    "number_of_rooms",
    "action",
  ];
  selectedRowIndex: number;
  dataSource: any[];
  selectedRoomCategoryId: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private roomCategoryService: RoomCategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getRoomCategory();
  }

  getRoomCategory() {
    this.blockUI.start("Loading...");
    this.roomCategoryService.getRoomCategory().subscribe((data) => {
      this.dataSource = data.data;
      this.blockUI.stop();
    });
  }
  onAddClick() {
    const dialogRef = this.dialog.open(RoomCategoryFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: null,
        formType: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomCategory();
      }
    });
  }

  onEditClick(element) {
    const dialogRef = this.dialog.open(RoomCategoryFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: element,
        formType: "Edit",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomCategory();
      }
    });
  }

  onDeleteClick(index) {
    this.selectedRowIndex = index;
    this.selectedRoomCategoryId = this.dataSource[index].id;

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.roomCategoryService
          .deleteRoomCategory(this.selectedRoomCategoryId)
          .subscribe(
            (data) => {
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
