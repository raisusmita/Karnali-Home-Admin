import { DatePipe } from "@angular/common";
import { MvReservation } from "./reservation.model";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDeleteComponent } from "src/app/shared/confirm-delete/confirm-delete.component";
import { ReservationService } from "./reservation.service";
import { ReservationFormComponent } from "./reservation-form/reservation-form.component";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
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
  dataSource: any[];
  reservation: MvReservation = {} as MvReservation;

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    this.reservationService.getReservation().subscribe((data) => {
      this.dataSource = data.data;
      console.log(data);
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
    reservationData.check_in_date = this.datepipe.transform(
      reservationData.check_in_date,
      "MM/dd/yyyy"
    );
    reservationData.check_out_date = this.datepipe.transform(
      reservationData.check_out_date,
      "MM/dd/yyyy"
    );
    console.log(this.reservation);

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
}
