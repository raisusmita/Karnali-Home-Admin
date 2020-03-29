import { MvBooking } from "./booking.model";
import { RoomCategoryService } from "./../room-category/room-category.service";
import { CustomerService } from "./../customer/customer.service";
import { BookingService } from "./booking.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"]
})
export class BookingComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;

  displayedColumns: string[] = [
    "full_name",
    "room_category",
    "number_of_customers",
    "number_of_rooms",
    "check_in_date",
    "check_out_date",
    "created_at",
    "action"
  ];
  dataSource: any[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.getBookedRoom();
  }

  getBookedRoom() {
    this.bookingService.getBookedRoom().subscribe(result => {
      this.dataSource = result.data;
    });
  }
}
