import { Component, OnInit } from "@angular/core";
import { RoomService } from "./room.service";
import { MatDialog } from "@angular/material/dialog";
import { AddRoomComponent } from "./add-room/add-room.component";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {
  displayedColumns: string[] = [
    "image",
    // "id",
    // "room_category_id",
    "room_number",
    "number_of_bed",
    "phone_number",
    "created_at",
    "action"
  ];
  dataSource: any[];
  selectedRowIndex: number;
  selectedRoomId: any;

  constructor(private roomService: RoomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    this.roomService.getRoom().subscribe(data => {
      this.dataSource = data.data;
    });
  }

  addRoom() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const newArray = [...this.dataSource];
        // newArray.push(result);
        // this.dataSource = newArray;

        this.getRoom();
      }
    });
  }
  editRoom(roomEditData) {
    // this.selectedRowIndex = index;
    // this.selectedRoomId = this.dataSource[index].id;

    console.log(roomEditData);

    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      data: roomEditData
    });

    //   const dialogRef = this.dialog.open(EditRoomCategoryComponent, {
    //     width: "50%",
    //     data: index
    // }
  }
}
