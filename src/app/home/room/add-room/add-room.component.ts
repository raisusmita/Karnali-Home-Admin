import { NgBlockUI } from "ng-block-ui";
import { Component, OnInit, Inject } from "@angular/core";
import { RoomService } from "./../room.service";

import { MvRoom } from "./../room-model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RoomCategoryService } from "../../room-category/room-category.service";
import { BlockUI } from "ng-block-ui";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.component.html",
  styleUrls: ["./add-room.component.scss"],
})
export class AddRoomComponent implements OnInit {
  room: MvRoom = {} as MvRoom;
  roomCategories;
  isEdit = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {}

  ngOnInit() {
    this.getRoomCategories();
  }

  getRoomCategories() {
    this.blockUI.start("Loading...");
    if (this.data) {
      this.isEdit = true;
      this.room = this.data;
    }
    this.roomCategoryService.getRoomCategory().subscribe(
      (result) => {
        if (result && result.data) {
          this.roomCategories = result.data;
        } else {
          this.blockUI.stop();
        }
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
      }
    );
  }

  submitRoomForm() {
    if (this.isEdit) {
      this.blockUI.start("Loading...");
      this.roomService.editRoom(this.room).subscribe(
        (e) => {
          this.blockUI.stop();
          this.dialogRef.close(this.room);
        },
        (error) => {
          this.blockUI.stop();
        }
      );
    } else {
      this.blockUI.start("Loading...");
      this.roomService.addRoom(this.room).subscribe(
        (e) => {
          this.blockUI.stop();
          this.dialogRef.close(this.room);
        },
        (error) => {
          this.blockUI.stop();
        }
      );
    }
  }
}
