import { Component, OnInit, Inject } from "@angular/core";
import { RoomService } from "./../room.service";

import { MvRoom } from "./../room-model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RoomCategoryService } from "src/app/room-category/room-category.service";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.component.html",
  styleUrls: ["./add-room.component.css"]
})
export class AddRoomComponent implements OnInit {
  room: MvRoom = {} as MvRoom;
  roomCategories;
  selectedImage: File = null;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {}

  ngOnInit() {
    this.roomCategoryService.getRoomCategory().subscribe(rc => {
      if (this.data) {
        this.isEdit = true;
        this.room = this.data;
      }
      this.roomCategories = rc.data;
    });
  }

  onSelectedFiles(imageFile) {
    this.selectedImage = <File>imageFile.target.files;
    this.room.image = this.selectedImage;
  }

  submitRoomForm() {
    if (this.isEdit) {
      if (!this.room.image) {
        delete this.room.image;
      }
      this.roomService.editRoom(this.room).subscribe(e => {
        this.dialogRef.close(this.room);
      });
    } else {
      this.roomService.addRoom(this.room).subscribe(e => {
        this.dialogRef.close(this.room);
      });
    }
  }
}
