import { RoomAvailabilityService } from "./../../../shared/services/room-availability/room-availability.service";
import { MvRoomUnavailable } from "./room-unavailable.model";
import { RoomService } from "./../../room/room.service";
import { ReservationService } from "./../reservation.service";
import { BookingService } from "./../../booking/booking.service";
import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MvReservation } from "../reservation.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.scss"],
})
export class ReservationFormComponent implements OnInit {
  reservation: MvReservation = {} as MvReservation;
  // unavailableRoom: MvRoomUnavailable = {} as MvRoomUnavailable;

  addForm: boolean;
  editForm: boolean;
  customers: any[] = [];
  rooms: any[] = [];
  bookings: any[] = [];

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  availableRoomsByDate: any[];
  paramsDate: {};
  roomNumber: number;

  available: any[] = [];
  disableButton: boolean;

  public unavailableRoom: any[] = [
    {
      reservation_id: 0,
      room_id: 0,
      check_in_date: "",
      check_out_date: "",
      availability: false,
      status: "",
      booking_id: 0,
    },
  ];

  constructor(
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private roomAvailableService: RoomAvailabilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ReservationFormComponent>
  ) { }

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
    this.getAvailableRoom();
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
      console.log(this.rooms);
    });
  }

  getAvailableRoom() {
    this.roomAvailableService.getAvailableRooms().subscribe((result) => {
      // this.rooms = result.data;
      const arr = [];

      // result.map(x.data =>{
      // arr.push(Object.values(result.data[1]));

      // })
      console.log(result);
      console.log(arr);
    });
  }

  getBookings() {
    this.bookingService.getBookedRoom().subscribe((result) => {
      this.bookings = result.data;
    });
  }

  getCheckInDate($checkInDate) {
    this.checkInDate = $checkInDate;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_number: this.roomNumber,
    };
    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getCheckOutDate($checkOutDate) {
    this.checkOutDate = $checkOutDate;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_number: this.roomNumber,
    };

    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getRoomNumber($roomNumber) {
    this.roomNumber = $roomNumber;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_number: this.roomNumber,
    };
    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  // getRoomAvailabilityByDate(dates) {
  //   if (dates.check_in_date != null && dates.check_out_date != null) {
  //     this.reservationService
  //       .getRoomAvailabilityByDate(dates)
  //       .subscribe((result) => {
  //         this.availableRoomsByDate = result;
  //         console.log(this.availableRoomsByDate);
  //       });
  //   }
  // }

  getRoomAvailabilityByDate(dates) {
    this.disableButton = false;

    if (
      dates.check_in_date != null &&
      dates.check_out_date != null &&
      dates.room_number != null
    ) {
      this.roomAvailableService
        .getRoomAvailabilityByDate(dates)
        .subscribe((result) => {
          this.availableRoomsByDate = result;

          Object.values(result).map((x: any) => {
            x.map((y) => {
              if (y.id == this.reservation.room_id) {
                this.available.push(true);
              } else {
                this.available.push(false);
              }
            });
          });

          console.log(this.available);
          if (!this.available.includes(true)) {
            this.disableButton = true;
            this.toastr.error("The room number is not available!", "Warning!", {
              closeButton: true,
              positionClass: "toast-top-right",
              disableTimeOut: true,
            });
          }

          this.available = [];
        });
    }
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
        .subscribe((reservationResult) => {
          if (reservationResult) {
            this.unavailableRoom.push({
              reservation_id: reservationResult.data.id,
              room_id: reservationResult.data.room_id,
              check_in_date: reservationResult.data.check_in_date,
              check_out_date: reservationResult.data.check_out_date,
              status: "reserved",
              booking_id: null,
              created_at: reservationResult.data.created_at,
              updated_at: reservationResult.data.updated_at,
            });

            this.unavailableRoom.splice(0, 1);

            console.log(this.unavailableRoom);

            this.reservationService
              .addRoomUnavailable(this.unavailableRoom)
              .subscribe((data) => {
                console.log(data);
              });
          }
          this.dialogRef.close(this.reservation);
        });
    }
  }
}
