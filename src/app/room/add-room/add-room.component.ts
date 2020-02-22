import { Component, OnInit } from "@angular/core";
import { RoomService } from "./../room.service";

import { MvRoom } from "./../room-model";
import { MatDialogRef } from "@angular/material/dialog";
import { RoomCategoryService } from "src/app/room-category/room-category.service";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.component.html",
  styleUrls: ["./add-room.component.css"]
})
export class AddRoomComponent implements OnInit {
  room: MvRoom = {} as MvRoom;
  roomCategories;

  constructor(
    private roomCategoryService: RoomCategoryService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {}

  ngOnInit() {
    this.roomCategoryService.getRoomCategory().subscribe(rc => {
      console.log(rc.data);
      this.roomCategories = rc.data;
    });
  }

  submitRoomForm() {
    this.roomService.addRoom(this.room);
    this.dialogRef.close(this.room);
  }
}
