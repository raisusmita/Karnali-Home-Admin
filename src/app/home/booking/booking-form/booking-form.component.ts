import { RoomService } from "./../../room/room.service";
import { BookingService } from "./../booking.service";
import { RoomCategoryService } from "./../../room-category/room-category.service";
import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MvBooking } from "../booking.model";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.css"],
})
export class BookingFormComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;

  addForm: boolean;
  editForm: boolean;
  customers: any[] = [];
  roomCategories: any[] = [];
  rooms: any[] = [];

  public newRoomCategories: any[] = [
    {
      room_category: "",
      number_of_room: 0,
      number_of_adult: 0,
      number_of_child: 0,
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private roomCategoryService: RoomCategoryService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<BookingFormComponent>
  ) {}

  ngOnInit() {
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
      this.getRooms();
    }
    // this.bookingService.getBookedRoom().subscribe(() => {
    if (this.data.gridData) {
      this.booking = this.data.gridData;
    }
    // });

    this.getCustomers();
    this.getRoomCategories();
  }

  getRooms() {
    this.roomService.getRoom().subscribe((result) => {
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

  submitCustomerForm() {
    //Removing the timeZone
    let offsetCIn = this.booking.check_in_date.getTimezoneOffset() * 60000;
    let offsetCOut = this.booking.check_out_date.getTimezoneOffset() * 60000;

    // console.log(offsetMs);

    // this.booking.check_in_date =
    this.booking.check_in_date = new Date(
      this.booking.check_in_date.getTime() - offsetCIn
    );
    this.booking.check_out_date = new Date(
      this.booking.check_out_date.getTime() - offsetCOut
    );

    console.log(this.booking);
    if (this.editForm) {
      this.bookingService.editBooking(this.booking).subscribe((result) => {
        this.dialogRef.close(this.booking);
      });
    } else {
      this.bookingService.addBooking(this.booking).subscribe((result) => {
        // if (this.booking) {
        //  const test = this.rooms.filter(x=>x.room_category_id = this.booking.room_category_id)
        //   // this.booking.room_category_id
        //   // console.log(test);

        // }
        this.dialogRef.close(this.booking);
      });
    }
  }
}
