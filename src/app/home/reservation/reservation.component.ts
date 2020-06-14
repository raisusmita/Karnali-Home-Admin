import { DatePipe } from "@angular/common";
import { MvReservation } from "./reservation.model";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ReservationService } from "./reservation.service";
import { ReservationFormComponent } from "./reservation-form/reservation-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability/room-availability.service";
import { MvRoomAvailable } from "../booking/room-available.model";
import { MatTableDataSource } from "@angular/material/table";
import { identifierModuleUrl } from "@angular/compiler";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.scss"],
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = [
    "booking_id",
    "room_id",
    "room_category_id",
    "customer_id",
    "customer_email",
    "customer_phone",
    "check_in_date",
    "check_out_date",
    "action",
  ];
  addForm: boolean;
  editForm: boolean;
  reservation: MvReservation = {} as MvReservation;
  roomAvailableColumns: string[] = [
    "room_category",
    "room_type",
    "room_number",
    "room_price",
  ];
  roomAvailableDataSource: any[];
  public dataSource: MatTableDataSource<Element>;

  roomAvailable: MvRoomAvailable = {} as MvRoomAvailable;

  // For Room Availability
  checkInDate: Date;
  checkOutDate: Date;
  availableRoomsByDate: any[];
  paramsDate: {};
  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private roomAvailableByDates: RoomAvailabilityService
  ) {}

  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    this.reservationService.getReservation().subscribe((result) => {
      const arr = [];
      result.data.map((x) => {
        arr.push({
          id: x.id,
          booking_id: x.booking_id ? x.booking_id : "No Booking",
          room_id: x.room.id,
          room_number: x.room.room_number,
          room_category: x.room.room_category.room_category,
          room_type: x.room.room_category.room_type,
          customer_id: x.customer.id,
          first_name: x.customer.first_name,
          middle_name: x.customer.middle_name,
          last_name: x.customer.last_name,
          email: x.customer.email,
          phone: x.customer.phone,
          check_in_date: x.check_in_date,
          check_out_date: x.check_out_date,
        });
      });
      this.dataSource = new MatTableDataSource(arr);
    });
  }

  addReservation() {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: "50%",
      data: {
        gridData: null,
        formType: "Add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getReservation();
      }
    });
  }

  editReservation(reservationData) {
    // reservationData.check_in_date = this.datepipe.transform(
    //   reservationData.check_in_date,
    //   "M/d/y"
    // );
    // reservationData.check_out_date = this.datepipe.transform(
    //   reservationData.check_out_date,
    //   "M/d/y"
    // );

    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: "50%",
      data: {
        gridData: reservationData,
        formType: "Edit",
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getReservation();
    });
  }

  deleteReservation(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.reservationService.deleteReservation(index).subscribe((data) => {
          this.getReservation();
        });
      }
    });
  }

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
        this.availableRoomsByDate = result;
        const arr = [];

        const test = Object.values(this.availableRoomsByDate).map((x) => {
          x.map((y) => {
            arr.push({
              category: y.room_category.room_category,
              type: y.room_category.room_type,
              room_number: y.room_number,
              price: y.room_category.room_price,
            });
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
