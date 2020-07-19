import { ToastrService } from "ngx-toastr";
import { RoomAvailabilityService } from "./../../../shared/services/room-availability/room-availability.service";
import { ReservationService } from "./../../reservation/reservation.service";
import { RoomService } from "./../../room/room.service";
import { BookingService } from "./../booking.service";
import { RoomCategoryService } from "./../../room-category/room-category.service";
import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MvBooking } from "../booking.model";
import { MvRoomUnavailable } from "../../reservation/reservation-form/room-unavailable.model";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.scss"],
})
export class BookingFormComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;

  public unavailableRoom: any[] = [
    {
      reservation_id: 0,
      room_id: 0,
      check_in_date: "",
      check_out_date: "",
      status: "",
      booking_id: 0,
    },
  ];

  addForm: boolean;
  editForm: boolean;
  customers: any[] = [];
  roomCategories: any[] = [];
  rooms: any[] = [];
  roomBasedOnBookingCategory: any[] = [];

  public newRoomCategories: any[] = [
    {
      room_category: "",
      number_of_room: 0,
      number_of_adult: 0,
      number_of_child: 0,
    },
  ];

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  roomCategoryId: Number;
  numberOfRooms: number;
  availableRoomsByDate: any[];
  paramsDate: {};

  available: any[] = [];
  disableButton: boolean;
  totalAvailableRoomCategory: number;

  //Prepopulated value from griddata
  customerName: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private roomCategoryService: RoomCategoryService,
    private roomAvailableService: RoomAvailabilityService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<BookingFormComponent>
  ) {}

  ngOnInit() {
    this.getRooms();
    if (this.data.gridData) {
      this.booking = this.data.gridData;
      this.booking.check_in_date = new Date(this.data.gridData.check_in_date);
      this.booking.check_out_date = new Date(this.data.gridData.check_out_date);
    }

    this.getCustomers();
    this.getRoomCategories();
  }

  getRooms() {
    this.roomAvailableService.getAvailableRooms().subscribe((result) => {
      this.rooms = result.data;
    });
  }
  getCustomers() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data;
    });
  }

  getRoomCategories() {
    this.roomCategoryService.getRoomCategory().subscribe((result) => {
      this.roomCategories = result.data;
    });
  }

  addRoomCategory() {
    this.newRoomCategories.push({
      room_category: "",
      number_of_room: "",
      number_of_adult: "",
      number_of_child: "",
    });
  }

  removeRoomCategory(i: number) {
    this.newRoomCategories.splice(i, 1);
  }

  getCheckInDate($checkInDate) {
    this.checkInDate = $checkInDate;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms,
    };
    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getCheckOutDate($checkOutDate) {
    this.checkOutDate = $checkOutDate;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms,
    };

    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getRoomCategory($category) {
    this.roomCategoryId = $category;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms,
    };
    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getNumberOfRoom($numberOfRooms) {
    this.numberOfRooms = $numberOfRooms;
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms,
    };
    this.getRoomAvailabilityByDate(this.paramsDate);
  }

  getRoomAvailabilityByDate(dates) {
    this.disableButton = false;

    if (
      dates.check_in_date != null &&
      dates.check_out_date != null &&
      dates.room_category_id != null &&
      dates.number_of_rooms != null
    ) {
      this.roomAvailableService
        .getRoomAvailabilityByDate(dates)
        .subscribe((result) => {
          this.availableRoomsByDate = result.data;

          const arr = [];
          const test = Object.values(this.availableRoomsByDate).map((x) => {
            arr.push({
              id: x[0].room_category.id,
              category: x[0].room_category.room_category,
              totalNumber: x.length,
            });
          });

          arr.map((x) => {
            if (x.id == this.booking.room_category_id) {
              this.totalAvailableRoomCategory = x.totalNumber;
            }
          });

          Object.values(result.data).map((x: any) => {
            x.map((y) => {
              if (y.room_category_id == this.booking.room_category_id) {
                this.available.push(true);
              } else {
                this.available.push(false);
              }
            });
          });

          if (this.totalAvailableRoomCategory < this.booking.number_of_rooms) {
            this.disableButton = true;
            this.toastr.error(
              "The number of room is greater than available room number",
              "Warning!",
              {
                closeButton: true,
                positionClass: "toast-top-right",
                disableTimeOut: true,
              }
            );
          }

          if (!this.available.includes(true)) {
            this.disableButton = true;
            this.toastr.error(
              "The room category is not available!",
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

  submitCustomerForm() {
    //Removing the timeZone
    let offsetCIn = this.booking.check_in_date.getTimezoneOffset() * 60000;
    let offsetCOut = this.booking.check_out_date.getTimezoneOffset() * 60000;

    this.booking.check_in_date = new Date(
      this.booking.check_in_date.getTime() - offsetCIn
    );
    this.booking.check_out_date = new Date(
      this.booking.check_out_date.getTime() - offsetCOut
    );

    if (this.editForm) {
      this.bookingService.editBooking(this.booking).subscribe((result) => {
        this.dialogRef.close(this.booking);
      });
    } else {
      this.bookingService.addBooking(this.booking).subscribe((result) => {
        this.dialogRef.close(this.booking);
      });
    }
  }
}
