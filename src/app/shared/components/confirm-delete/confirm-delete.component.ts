import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-delete",
  templateUrl: "./confirm-delete.component.html",
  styleUrls: ["./confirm-delete.component.scss"],
})
export class ConfirmDeleteComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}

  ngOnInit() {}

  onDeleteConfirmed() {
    this.dialogRef.close(true);
  }
  onDeleteCancelled() {
    this.dialogRef.close(false);
  }
}
