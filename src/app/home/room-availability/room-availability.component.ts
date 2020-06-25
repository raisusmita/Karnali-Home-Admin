import { Component, OnInit } from "@angular/core";
import { MvRoomAvailable } from "../booking/room-available.model";
import { MatTableDataSource } from "@angular/material/table";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability/room-availability.service";

@Component({
  selector: "app-room-availability",
  templateUrl: "./room-availability.component.html",
  styleUrls: ["./room-availability.component.scss"],
})
export class RoomAvailabilityComponent implements OnInit {
  roomAvailable: MvRoomAvailable = {} as MvRoomAvailable;

  roomAvailableColumns: string[] = [
    "room_category",
    "number_of_rooms",
    "type",
    "price",
  ];

  public dataSource: MatTableDataSource<Element>;

  roomAvailableDataSource: any[];

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  availableRoomsByDate: any[];
  paramsDate: {};

  constructor(private roomAvailableByDates: RoomAvailabilityService) { }

  ngOnInit() { }

  submitRoomAvailableForm() {
    this.roomAvailableByDates
      .getRoomAvailabilityByDate(this.roomAvailable)
      .subscribe((result) => {
        this.availableRoomsByDate = result.data;
        const arr = [];

        const test = Object.values(this.availableRoomsByDate).map((x) => {
          arr.push({
            category: x[0].room_category.room_category,
            type: x[0].room_category.room_type,
            price: x[0].room_category.room_price,
            totalNumber: x.length,
          });
        });

        this.roomAvailableDataSource = arr;
      });
  }
}
