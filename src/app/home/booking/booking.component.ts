import { ConfirmCommonDialogComponent } from "./../../shared/components/confirm-common-dialog/confirm-common-dialog.component";
import { MvRoomAvailable } from "./room-available.model";
import { MatDialog } from "@angular/material/dialog";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { MvBooking } from "./booking.model";
import { BookingService } from "./booking.service";
import { Component, OnInit } from "@angular/core";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability/room-availability.service";
import { MatTableDataSource } from "@angular/material/table";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ToastrService } from "ngx-toastr";
import { CustomerFormComponent } from "../customer/customer-form/customer-form.component";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { blockInstanceGuid } from "ng-block-ui/decorators/block-ui.decorator";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  booking: MvBooking = {} as MvBooking;
  roomAvailable: MvRoomAvailable = {} as MvRoomAvailable;

  displayedColumns: string[] = [
    "serialN",
    "full_name",
    "room_category",
    "number_of_adult",
    "number_of_child",
    "number_of_rooms",
    "room_number",
    "check_in_date",
    "check_out_date",
    "created_at",
    "action",
  ];

  roomAvailableColumns: string[] = [
    "room_category",
    "number_of_rooms",
    "type",
    "price",
  ];

  // dataSource: any[];
  public dataSource: MatTableDataSource<Element>;

  roomAvailableDataSource: any[];

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  availableRoomsByDate: any[];
  paramsDate: {};
  pageSizeOptions = [7, 10, 25, 100];

  pageSize: number;
  pageIndex: number;
  totalLength: number;
  limit: number;
  skip: number;

  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private roomAvailableByDates: RoomAvailabilityService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.pageSize = 7;
    this.pageIndex = 0;
    this.totalLength = 100;

    this.skip = 0;
    this.limit = this.pageSize;

    this.getBookedRoom();
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0;
    } else {
      this.skip = e.pageIndex * e.pageSize;
    }
    this.limit = e.pageSize;

    this.getBookedRoom();
  }
  addCustomer() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "50%",
      height: "700px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success("Customer is created successfully", "Success!!", {
          closeButton: true,
          positionClass: "toast-top-right",
          disableTimeOut: true,
        });
      }
    });
  }
  getBookedRoom() {
    this.blockUI.start("Loading...");

    const bookingParams = {
      limit: this.limit,
      skip: this.skip,
    };

    this.bookingService.getBookingList(bookingParams).subscribe((result) => {
      this.totalLength = result.totalCount;
      const arr = [];
      if (result && result.data) {
        result.data.map((x) => {
          arr.push({
            id: x.id,
            customer_id: x.customer.id,
            first_name: x.customer.first_name,
            middle_name: x.customer_middle_name,
            last_name: x.customer.last_name,
            room_category: x.room_category.room_category,
            room_category_id: x.room_category.id,
            number_of_adult: x.number_of_adult,
            number_of_child: x.number_of_child,
            number_of_rooms: x.number_of_rooms,
            room_number: x.rooms.map((room) => {
              return room.room_number;
            }),
            check_in_date: x.check_in_date,
            check_out_date: x.check_out_date,
            created_at: x.created_at,
          });
          // x.rooms.map((room) => {
          //     room_number: room.room_number,
          // });
        });
      }
      this.dataSource = new MatTableDataSource(arr);
      this.blockUI.stop();

      // Define filter function to look for 'premiseId'matches
      // tslint:disable-next-line: only-arrow-functions
      // this.dataSource.filterPredicate = function (data, filter): boolean {
      //   return data.id.toLowerCase().includes(filter);
      // };
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
        this.toastr.success("Booking added successfully", "Success!", {
          positionClass: "toast-top-right",
        });
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBookedRoom();
        this.toastr.success("Booking updated successfully", "Success!", {
          positionClass: "toast-top-right",
        });
      }
    });
  }

  cancelBooking(bookingId) {
    const dialogRef = this.dialog.open(ConfirmCommonDialogComponent, {
      width: "50%",
      data: {
        gridData: null,
        formType: "Cancel",
        confirmationText: "Are you sure you want to cancel this booking?",
        positiveResponse: "Yes ",
        negativeResponse: "No",
      },
    });

    const cancelBookingParams = {
      bookingId: bookingId,
    };
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookingService
          .cancelBooking(cancelBookingParams)
          .subscribe((data) => {
            this.getBookedRoom();
          });
        this.toastr.success("Booking cancel successfully", "Success!", {
          positionClass: "toast-top-right",
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
    let offsetCIn =
      this.roomAvailable.check_in_date.getTimezoneOffset() * 60000;
    let offsetCOut =
      this.roomAvailable.check_out_date.getTimezoneOffset() * 60000;

    this.roomAvailable.check_in_date = new Date(
      this.roomAvailable.check_in_date.getTime() - offsetCIn
    );
    this.roomAvailable.check_out_date = new Date(
      this.roomAvailable.check_out_date.getTime() - offsetCOut
    );

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
