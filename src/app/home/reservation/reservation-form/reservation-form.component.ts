import { NgBlockUI } from "ng-block-ui";
import { CommonService } from "./../../../shared/services/common-service/common.service";
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
import { RoomCategoryService } from "../../room-category/room-category.service";
import { BlockUI } from "ng-block-ui";

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
  activeBookingList: any[] = [];

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

  paramsRoomCategory: any;

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

  roomCategories: any[] = [];
  roomList: any[] = [];
  selectedRoom: any[] = [];
  editParams: any[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private roomAvailableService: RoomAvailabilityService,
    private roomCategoryService: RoomCategoryService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ReservationFormComponent>
  ) {}

  ngOnInit() {
    this.disableButton = true;

    this.getReservations();
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
      this.disableButton = false;
      this.reservation.room_category_id = this.data.gridData.room_category_id;
      this.selectedRoom = this.data.gridData.room_id;
    }
    this.getActiveBookings();
    this.getCustomers();
    this.getRooms();
    this.getBookings();
    if (this.data.formType == "Edit") {
      this.reservationDates.push({
        id:
          this.reservationDates.length +
          1 +
          "_" +
          this.data.gridData.room_number,
        check_in_date: new Date(this.data.gridData.check_in_date),
        check_out_date: new Date(this.data.gridData.check_out_date),
        isSelect: true,
        room_id: this.data.gridData.room_id,
      });
      this.getRoomByCategory();
    }
    this.getRoomCategories();
  }

  getReservations() {
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
  }

  getActiveBookings() {
    this.commonService.getActiveBooking().subscribe((result) => {
      this.activeBookingList = result.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data;
    });
  }

  getRoomNumber(e) {
    let test = e;
  }
  getRoomCategories() {
    this.blockUI.start("Loading...");
    this.roomCategoryService.getRoomCategory().subscribe((result) => {
      this.blockUI.stop();
      this.roomCategories = result.data;
    });
  }

  getRooms() {
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
      if (result) {
        this.bookings = result.data;
        this.bookings.unshift({ id: "No Booking" });
      }
    });
  }

  getAssigedRoomForBooking(customerId) {
    this.getBookingOrDirectReservation(customerId);
    if (this.byBooking == true) {
      const paramsBookingId = {
        bookingId: this.bookingId,
      };
      this.availableRoom = [];
      this.reservationDates = [];

      this.getRoomsByBooking(paramsBookingId);
    }
  }

  getRoomsByBooking(paramsBookingId) {
    this.roomAvailableService
      .getRoomByBooking(paramsBookingId)
      .subscribe((result) => {
        this.roomsByBooking = result.data;

        this.bookedCheckIn = result.data[0].check_in_date;
        this.bookedCheckOut = result.data[0].check_out_date;

        this.roomsByBooking.map((room) => {
          this.availableRoom.push(room.room);
          this.reservationDates.push({
            id: this.reservationDates.length + 1 + "_" + room.room.room_number,
            check_in_date: new Date(this.bookedCheckIn),
            check_out_date: new Date(this.bookedCheckOut),
            isSelect: true,
            room_id: room.room.id,
          });
        });
      });
  }

  getBookingOrDirectReservation(customerId) {
    if (this.activeBookingList != null) {
      this.activeBookingList.map((booking) => {
        if (booking.customer_id == customerId) {
          // For booked room
          this.bookingId = booking.id;
          this.byAvailable = false;
          this.byBooking = true;
          this.disableButton = false;
        } else {
          // For direct reservation show all the available rooms
          this.getAvailableRoom();
          this.byAvailable = true;
          this.disableButton = true;
          this.byBooking = false;
          this.reservation.check_in_date = null;
          this.reservation.check_out_date = null;
        }
      });
    } else {
      // For direct reservation show all the available rooms
      this.getAvailableRoom();
      this.byAvailable = true;
      this.disableButton = true;
      this.byBooking = false;
      this.reservation.check_in_date = null;
      this.reservation.check_out_date = null;
    }
  }

  getCheckInDate($checkInDate, $roomId, $roomNumber, $index) {
    this.reservation.check_in_date = new Date($checkInDate);
    if ($checkInDate == null) {
      this.reservationDates[$index].check_in_date = undefined;
    } else {
      this.checkInDate = $checkInDate;
      this.selectedRoomId = $roomId;
      this.reservationDates[$index].isSelect = true;
      this.reservationDates[$index].check_in_date = new Date($checkInDate);

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
      this.reservationDates[$index].check_out_date = new Date($checkOutDate);

      this.paramsDate = {
        check_in_date: this.checkInDate,
        check_out_date: this.checkOutDate,
        room_number: $roomNumber,
      };

      this.getRoomAvailabilityByDate(this.paramsDate);
    }
  }

  getRoomByCategory(roomCategoryId?) {
    if (roomCategoryId) {
      this.paramsRoomCategory = {
        room_category_id: roomCategoryId,
      };
    } else {
      this.paramsRoomCategory = {
        room_category_id: this.data.gridData.room_category_id,
      };
    }
    this.roomService
      .getRoomByCategory(this.paramsRoomCategory)
      .subscribe((result) => {
        this.roomList = result.data;
      });
  }

  getRoomAvailabilityByDate(dates) {
    if (dates.check_in_date == undefined && this.data.formType == "Edit") {
    }
    if (dates.check_in_date != null && dates.check_out_date != null) {
      this.disableButton = false;
      if (!this.byBooking) {
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
  }

  submitReservationForm() {
    // Removing the timeZone
    if (this.roomsByBooking.length > 0) {
      this.reservationParams.push({ byBooking: true });
    } else {
      this.reservationParams.push({ byBooking: false });
    }
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

        if (this.roomsByBooking.length > 0) {
          this.reservationParams.push({
            customer_id: this.reservation.customer_id,
            check_in_date: new Date(this.selectedCheckInDate),
            check_out_date: new Date(this.selectedCheckOutDate),
            room_id: data.room_id,
            booking_id: this.roomsByBooking[0].booking_id,
          });
        } else {
          this.reservationParams.push({
            customer_id: this.reservation.customer_id,
            check_in_date: new Date(this.selectedCheckInDate),
            check_out_date: new Date(this.selectedCheckOutDate),
            room_id: data.room_id,
          });
        }
      }
    });

    this.reservation.status = "active";

    if (this.editForm) {
      let offsetCIn =
        this.reservation.check_in_date.getTimezoneOffset() * 60000;
      let offsetCOut =
        this.reservation.check_out_date.getTimezoneOffset() * 60000;

      this.selectedCheckInDate = new Date(
        this.reservation.check_in_date.getTime() - offsetCIn
      );
      this.selectedCheckOutDate = new Date(
        this.reservation.check_out_date.getTime() - offsetCOut
      );

      // First index is for updating reservation
      this.editParams.push({
        reservation_id: this.reservation.id,
        check_in_date: new Date(this.selectedCheckInDate),
        check_out_date: new Date(this.selectedCheckOutDate),
        room_id: this.reservation.room_id,
      });

      // Remaining are rows for roomAvailabilities
      if (this.reservation.booking_id != 0) {
        // For Booked room
        this.editParams.push({
          reservation_id: this.reservation.id,
          booking_id: this.reservation.booking_id,
          status: "booked",
          check_in_date: new Date(this.selectedCheckInDate),
          check_out_date: new Date(this.selectedCheckOutDate),
          room_id: this.reservation.room_id,
        });
      } else {
        // For direct reservation
        this.editParams.push({
          reservation_id: this.reservation.id,
          booking_id: null,
          status: "reserved",
          check_in_date: new Date(this.selectedCheckInDate),
          check_out_date: new Date(this.selectedCheckOutDate),
          room_id: this.reservation.room_id,
        });
      }

      this.blockUI.start("Loading...");
      this.reservationService
        .editReservation(this.editParams)
        .subscribe((result) => {
          this.blockUI.stop();
          this.dialogRef.close(this.reservation);
          this.roomsByBooking.length = 0;
          this.reservationParams = null;
        });
    } else {
      this.blockUI.start("Loading...");
      this.reservationService
        .addReservation(this.reservationParams)
        .subscribe((reservationResult) => {
          if (reservationResult) {
            this.roomsByBooking.length = 0;
            this.reservationParams = null;
          }
          this.blockUI.stop();
          this.dialogRef.close(this.reservation);
        });
    }
  }
}
