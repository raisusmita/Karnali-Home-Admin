import { Component, OnInit } from "@angular/core";
import { ReservationService } from "./reservation.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDeleteComponent } from "../shared/confirm-delete/confirm-delete.component";
import { ReservationFormComponent } from "./reservation-form/reservation-form.component";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"]
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = [
    "room_id",
    "customer_id",
    // "booking_id",
    "check_in_date",
    "check_out_date",
    "action"
  ];
  dataSource: any[];

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    this.reservationService.getReservation().subscribe(data => {
      this.dataSource = data.data;
    });
  }

  addReservation() {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: "50%",
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getReservation();
      }
    });
  }

  editFood(FoodEditData) {
    // const dialogRef = this.dialog.open(FoodFormComponent, {
    //   width: "50%",
    //   data: FoodEditData
    // });
  }

  deleteFood(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.reservationService.deleteReservation(index).subscribe(data => {
          this.getReservation();
        });
      }
    });
  }
}
