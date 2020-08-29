import { Component, OnInit, ViewChild } from "@angular/core";
import { RoomService } from "./room.service";
import { MatDialog } from "@angular/material/dialog";
import { AddRoomComponent } from "./add-room/add-room.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { MatPaginator } from "@angular/material";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"],
})
export class RoomComponent implements OnInit {
  displayedColumns: string[] = [
    "room_number",
    "number_of_bed",
    "telephone_number",
    "action",
  ];
  dataSource: any[];
  selectedRowIndex: number;
  selectedRoomId: any;
  pageSize: 10;
  pageNumber: 1;
  totalLength: 100;

  @BlockUI() blockUI: NgBlockUI;
  constructor(private roomService: RoomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    this.blockUI.start("Loading...");
    this.roomService.getRoom().subscribe((data) => {
      this.dataSource = data.data;
      this.blockUI.stop();
    });
  }

  addRoom() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getRoom();
    });
  }
  editRoom(roomEditData) {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: "50%",
      data: roomEditData,
    });
  }

  deleteRoom(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.roomService.deleteRoom(index).subscribe((data) => {
          this.getRoom();
        });
      }
    });
  }
}
