import { Component, OnInit, Inject } from "@angular/core";
import { MvReservation } from "../reservation-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationService } from "../reservation.service";
import { CustomerService } from "src/app/customer/customer.service";
import { MvCustomer } from "src/app/customer/customer-model";
import { MvRoom } from "src/app/room/room-model";
import { RoomService } from "src/app/room/room.service";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability.service";

@Component({
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.css"]
})
export class ReservationFormComponent implements OnInit {
  reservation: MvReservation = {} as MvReservation;
  reservationData: any;
  room: MvRoom;
  customer: MvCustomer;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private customerService: CustomerService,
    private availableRoom: RoomAvailabilityService,
    private dialogRef: MatDialogRef<ReservationFormComponent>
  ) {}

  ngOnInit() {
    this.reservationService.getReservation().subscribe(data => {
      if (this.data) {
        this.isEdit = true;
        this.reservation = this.data;
      }
      this.roomService.getRoom().subscribe(room => {
        this.room = room.data;
      });
      this.customerService.getCustomer().subscribe(customer => {
        this.customer = customer.data;
      });
      this.reservationData = data.data;
    });

    this.availableRoom
      .getAvailableRoomsByDate(Date.now(), Date.now())
      .subscribe(e => {
        console.log(e);
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
