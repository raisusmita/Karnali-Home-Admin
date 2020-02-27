import { Component, OnInit, Inject } from "@angular/core";
import { MvReservation } from "../reservation-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationService } from "../reservation.service";

@Component({
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.css"]
})
export class ReservationFormComponent implements OnInit {
  reservation: MvReservation = {} as MvReservation;
  reservationData: any;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<ReservationFormComponent>
  ) {}

  ngOnInit() {
    this.reservationService.getReservation().subscribe(data => {
      this.isEdit = true;
      this.reservation = this.data;
      this.reservationData = data;
    });
  }

  submitReservationForm() {
    if (this.isEdit) {
      this.reservationService.editReservation(this.reservation).subscribe(e => {
        this.dialogRef.close(this.reservation);
      });
    } else {
      this.reservationService.addReservation(this.reservation).subscribe(e => {
        this.dialogRef.close(this.reservation);
      });
    }
  }
}
