import { RoomAvailabilityService } from "./../../../shared/services/room-availability/room-availability.service";
import { MvRoomUnavailable } from "./room-unavailable.model";
import { RoomService } from "./../../room/room.service";
import { ReservationService } from "./../reservation.service";
import { BookingService } from "./../../booking/booking.service";
import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
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
  roomsByBooking: any[] = [];
  availableRoom: any[] = [];
  byAvailable: boolean;
  byBooking: boolean;
  bookingId: number;
  checked: boolean = false;

  selectedRoomId: number;
  required: boolean = false;

  public reservationDates: any[] = [];
  reservationParams: any[] = [];

  selectedCheckInDate: Date;
  selectedCheckOutDate: Date;

  // For mat expansion
  panelOpenState = false;

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

  //Checkin and CHeckOut date from BookingId
  bookedCheckIn: Date;
  bookedCheckOut: Date;

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
  ) {}

  ngOnInit() {
    this.disableButton = true;

    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
    }
    this.reservationService.getReservation().subscribe(() => {
      if (this.data.gridData) {
        this.reservation = this.data.gridData;
        this.getAssigedRoomForBooking(this.reservation.booking_id);

        this.reservation.check_in_date = new Date(
          this.reservation.check_in_date
        );
        this.reservation.check_out_date = new Date(
          this.reservation.check_out_date
        );
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

  getAvailableRoom() {
    this.availableRoom = [];
    this.reservationDates = [];

    this.roomAvailableService.getAvailableRooms().subscribe((result) => {
      this.availableRoom = result.data;

      this.availableRoom.map((room) => {
        this.reservationDates.push({
          id: this.reservationDates.length + 1 + "_" + room.room_number,
          check_in_date: Date,
          check_out_date: Date,
          isSelect: false,
          room_id: room.id,
        });
      });
    });
  }

  getBookings() {
    this.bookingService.getBookedRoom().subscribe((result) => {
      this.bookings = result.data;
      this.bookings.unshift({ id: "No Booking" });
    });
  }

  getAssigedRoomForBooking(customerId) {
    this.customers.map((customer) => {
      if (customer.id == customerId) {
        if (customer.bookings.length != 0) {
          this.bookingId = customer.bookings[0].id;
          this.byAvailable = false;
          this.byBooking = true;
        } else {
          this.getAvailableRoom();
          this.byAvailable = true;
          this.byBooking = false;
          this.reservation.check_in_date = null;
          this.reservation.check_out_date = null;
        }
      }
    });

    if (this.byBooking == true) {
      const paramsBookingId = {
        bookingId: this.bookingId,
      };
      this.availableRoom = [];
      this.reservationDates = [];

      this.roomAvailableService
        .getRoomByBooking(paramsBookingId)
        .subscribe((result) => {
          this.roomsByBooking = result.data;

          this.bookedCheckIn = result.data[0].check_in_date;
          this.bookedCheckOut = result.data[0].check_out_date;

          this.roomsByBooking.map((room) => {
            this.availableRoom.push(room.room);
            this.reservationDates.push({
              id:
                this.reservationDates.length + 1 + "_" + room.room.room_number,
              check_in_date: new Date(this.bookedCheckIn),
              check_out_date: new Date(this.bookedCheckOut),
              isSelect: false,
              room_id: room.room.id,
            });
          });

          // this.reservation.check_in_date = new Date(this.bookedCheckIn);
          // this.reservation.check_out_date = new Date(this.bookedCheckOut);
        });
    }
  }

  getCheckInDate($checkInDate, $roomId, $roomNumber, $index) {
    if ($checkInDate == null) {
      this.reservationDates[$index].check_in_date = undefined;
    } else {
      this.checkInDate = $checkInDate;
      this.selectedRoomId = $roomId;
      this.reservationDates[$index].isSelect = true;
      this.paramsDate = {
        check_in_date: this.checkInDate,
        check_out_date: this.checkOutDate,
        room_number: $roomNumber,
      };
      this.getRoomAvailabilityByDate(this.paramsDate);
    }
  }

  getCheckOutDate($checkOutDate, $roomId, $roomNumber, $index) {
    if ($checkOutDate == null) {
      this.reservationDates[$index].check_in_date = undefined;
    } else {
      this.selectedRoomId = $roomId;
      this.checkOutDate = $checkOutDate;
      this.reservationDates[$index].isSelect = true;
      this.paramsDate = {
        check_in_date: this.checkInDate,
        check_out_date: this.checkOutDate,
        room_number: $roomNumber,
      };

      this.getRoomAvailabilityByDate(this.paramsDate);
    }
  }

  // getRoomNumber($roomNumber) {
  //   this.roomNumber = $roomNumber;
  //   this.paramsDate = {
  //     check_in_date: this.checkInDate,
  //     check_out_date: this.checkOutDate,
  //     room_number: this.roomNumber,
  //   };
  //   this.getRoomAvailabilityByDate(this.paramsDate);
  // }

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
    if (dates.check_in_date != null && dates.check_out_date != null) {
      this.disableButton = false;

      if (dates.room_number != null) {
        this.roomAvailableService
          .getRoomAvailabilityByDate(dates)
          .subscribe((result) => {
            this.availableRoomsByDate = result.data;

            Object.values(this.availableRoomsByDate).map((x: any) => {
              x.map((y) => {
                if (y.id == this.selectedRoomId) {
                  this.available.push(true);
                } else {
                  this.available.push(false);
                }
              });
            });

            if (!this.available.includes(true)) {
              this.disableButton = true;
              this.toastr.error(
                dates.room_number + " is not available!",
                "Warning!",
                {
                  closeButton: true,
                  positionClass: "toast-top-right",
                  disableTimeOut: true,
                }
              );
            }

            this.available = [];
          });
      }
    }
  }

  submitReservationForm() {
    // Removing the timeZone
    this.reservationDates.map((data) => {
      if (data.isSelect == true) {
        let offsetCIn = data.check_in_date.getTimezoneOffset() * 60000;
        let offsetCOut = data.check_out_date.getTimezoneOffset() * 60000;

        this.selectedCheckInDate = new Date(
          data.check_in_date.getTime() - offsetCIn
        );
        this.selectedCheckOutDate = new Date(
          data.check_out_date.getTime() - offsetCOut
        );

        this.reservationParams.push({
          customer_id: this.reservation.customer_id,
          check_in_date: new Date(this.selectedCheckInDate),
          check_out_date: new Date(this.selectedCheckOutDate),
          room_id: data.room_id,
        });
      }
    });

    if (this.editForm) {
      this.reservationService
        .editReservation(this.reservation)
        .subscribe((result) => {
          this.dialogRef.close(this.reservation);
        });
    } else {
      this.reservationService
        .addReservation(this.reservationParams)
        .subscribe((reservationResult) => {
          if (reservationResult) {
            this.toastr.success(
              " Reservation created successfully!",
              "Success!",
              {
                closeButton: true,
                positionClass: "toast-top-right",
                disableTimeOut: true,
              }
            );
            // if (this.byBooking) {
            //   this.reservation.reservation_id = reservationResult.data.id;
            //   this.reservationService
            //     .bookingToReservation(this.reservation)
            //     .subscribe((result) => {
            //       const test = result;
            //     });
            // } else {
            //   this.unavailableRoom.push({
            //     reservation_id: reservationResult.data.id,
            //     room_id: reservationResult.data.room_id,
            //     check_in_date: reservationResult.data.check_in_date,
            //     check_out_date: reservationResult.data.check_out_date,
            //     status: "reserved",
            //     booking_id: null,
            //     created_at: reservationResult.data.created_at,
            //     updated_at: reservationResult.data.updated_at,
            //   });

            //   this.unavailableRoom.splice(0, 1);
            //   this.reservationService
            //     .addRoomUnavailable(this.unavailableRoom)
            //     .subscribe((data) => {
            //       console.log(data);
            //     });
            // }
          }
          this.dialogRef.close(this.reservation);
        });
    }
  }
}
