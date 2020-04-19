import { RoomService } from "./../../room/room.service";
import { ReservationService } from "./../reservation.service";
import { BookingService } from "./../../booking/booking.service";
import { RoomCategoryService } from "./../../room-category/room-category.service";
import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MvReservation } from "../reservation.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.css"],
})
export class ReservationFormComponent implements OnInit {
  reservation: MvReservation = {} as MvReservation;
  addForm: boolean;
  editForm: boolean;
  customers: any[] = [];
  rooms: any[] = [];
  bookings: any[] = [];

  constructor(
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private bookingService: BookingService,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<ReservationFormComponent>
  ) {}

  ngOnInit() {
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
    }
    this.reservationService.getReservation().subscribe(() => {
      if (this.data.gridData) {
        this.reservation = this.data.gridData;
      }
    });
    this.getCustomers();
    this.getRoomCategories();
    this.getBookings();
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data;
    });
  }

  getRoomCategories() {
    this.roomService.getRoom().subscribe((result) => {
      this.rooms = result.data;
    });
  }

  getBookings() {
    this.bookingService.getBookedRoom().subscribe((result) => {
      this.bookings = result.data;
    });
  }

  submitReservationForm() {
    //Removing the timeZone
    let offsetCIn = this.reservation.check_in_date.getTimezoneOffset() * 60000;
    let offsetCOut =
      this.reservation.check_out_date.getTimezoneOffset() * 60000;

    this.reservation.check_in_date = new Date(
      this.reservation.check_in_date.getTime() - offsetCIn
    );
    this.reservation.check_out_date = new Date(
      this.reservation.check_out_date.getTime() - offsetCOut
    );
    if (this.editForm) {
      this.reservationService
        .editReservation(this.reservation)
        .subscribe((result) => {
          this.dialogRef.close(this.reservation);
        });
    } else {
      this.reservationService
        .addReservation(this.reservation)
        .subscribe((result) => {
          this.dialogRef.close(this.reservation);
        });
    }
  }
}
