import { PrintService } from "./../../services/print-service/print.service";
import { InvoiceReportComponent } from "./../../../home/invoice/invoice-report/invoice-report.component";
import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-confirm-common-dialog",
  templateUrl: "./confirm-common-dialog.component.html",
  styleUrls: ["./confirm-common-dialog.component.scss"],
})
export class ConfirmCommonDialogComponent implements OnInit {
  confirmationText: string;
  positiveResponse: string;
  negativeResponse: string;
  constructor(
    private dialogRef: MatDialogRef<ConfirmCommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private printService: PrintService
  ) {}

  ngOnInit() {
    if (this.data.callFor == "Invoice Generate") {
      this.confirmationText = this.data.confirmationText;
      this.positiveResponse = this.data.positiveResponse;
      this.negativeResponse = this.data.negativeResponse;
    }
  }

  onConfirmed() {
    // this.printService.printInvoice("invoice-report");
    this.dialogRef.close(true);
  }
  onCancelled() {
    this.dialogRef.close(false);
  }

  generateInvoiceReport() {
    const dialogRef = this.dialog.open(InvoiceReportComponent, {
      width: "70%",
      height: "700px",
      data: {
        formType: "Add",
        callFor: "Invoice Generate",
        confirmationText: "Are you sure you want to proceed the invoice?",
        positiveResponse: "Yes Proceed",
        negativeResponse: "Cancel the Proceed",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("test");
      }
    });
  }
}
