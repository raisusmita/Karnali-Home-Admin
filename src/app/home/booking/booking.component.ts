import { MvRoomAvailable } from "./room-available.model";
import { MatDialog } from "@angular/material/dialog";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { MvBooking } from "./booking.model";
import { BookingService } from "./booking.service";
import { Component, OnInit } from "@angular/core";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability/room-availability.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;
  roomAvailable: MvRoomAvailable = {} as MvRoomAvailable;

  displayedColumns: string[] = [
    "full_name",
    "room_category",
    "number_of_adult",
    "number_of_child",
    "number_of_rooms",
    "check_in_date",
    "check_out_date",
    "created_at",
    "action",
  ];

  roomAvailableColumns: string[] = ["room_category", "number_of_rooms"];

  dataSource: any[];
  roomAvailableDataSource: any[];

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  availableRoomsByDate: any[];
  paramsDate: {};
  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private roomAvailableByDates: RoomAvailabilityService
  ) {}

  ngOnInit() {
    this.getBookedRoom();
  }

  getBookedRoom() {
    this.bookingService.getBookedRoom().subscribe((result) => {
      this.dataSource = result.data;
      console.log(this.dataSource);
    });
  }

  addBooking() {
    const dialogRef = this.dialog.open(BookingFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: null,
        formType: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBookedRoom();
      }
    });
  }

  editBooking(bookingEditData) {
    console.log(bookingEditData);
    const dialogRef = this.dialog.open(BookingFormComponent, {
      width: "50%",
      data: {
        gridData: bookingEditData,
        formType: "Edit",
      },
    });
  }

  deleteBooking(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookingService.deleteBooking(index).subscribe((data) => {
          this.getBookedRoom();
        });
      }
    });
  }

  //Get Room Available Based on CheckIn and CheckOut Date
  // getCheckInDate($checkInDate) {
  //   this.checkInDate = $checkInDate;
  //   this.paramsDate = {
  //     check_in_date: this.checkInDate,
  //     check_out_date: this.checkOutDate,
  //   };
  //   this.getRoomAvailabilityByDate(this.paramsDate);
  // }

  // getCheckOutDate($checkOutDate) {
  //   this.checkOutDate = $checkOutDate;
  //   this.paramsDate = {
  //     check_in_date: this.checkInDate,
  //     check_out_date: this.checkOutDate,
  //   };

  //   // this.getRoomAvailabilityByDate(this.paramsDate);
  // }

  submitRoomAvailableForm() {
    this.roomAvailableByDates
      .getRoomAvailabilityByDate(this.roomAvailable)
      .subscribe((result) => {
        this.availableRoomsByDate = result;
        const arr = [];

        const test = Object.values(this.availableRoomsByDate).map((x) => {
          arr.push({
            category: x[0].room_category.room_category,
            totalNumber: x.length,
          });
        });

        this.roomAvailableDataSource = arr;
      });
  }
}
