import { RoomTransactionFormComponent } from "./room-transaction-form/room-transaction-form.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-room-transaction",
  templateUrl: "./room-transaction.component.html",
  styleUrls: ["./room-transaction.component.scss"],
})
export class RoomTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    "full_name",
    "phone_number",
    "address",
    "room_category",
    "room_number",
    "no_of_days",
    "rate",
    "amount",
    "check_in_date",
    "check_out_date",
    "action",
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onAddClick() {
    const dialogRef = this.dialog.open(RoomTransactionFormComponent, {
      width: "50%",
      height: "700px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.getRoomTransaction();
      }
    });
  }
}
