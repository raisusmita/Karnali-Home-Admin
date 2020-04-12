import { MatDialog } from "@angular/material/dialog";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { MvBooking } from "./booking.model";
import { BookingService } from "./booking.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;

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
  dataSource: any[];

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBookedRoom();
  }

  getBookedRoom() {
    this.bookingService.getBookedRoom().subscribe((result) => {
      this.dataSource = result.data;
      console.log(result);
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
    const dialogRef = this.dialog.open(BookingFormComponent, {
      width: "50%",
      data: {
        gridData: bookingEditData,
        formType: "Edit",
      },
    });
  }
}
