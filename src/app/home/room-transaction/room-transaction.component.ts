import { ConfirmCommonDialogComponent } from "./../../shared/components/confirm-common-dialog/confirm-common-dialog.component";
import { RoomTransactionService } from "./room-transaction.service";
import { RoomTransactionFormComponent } from "./room-transaction-form/room-transaction-form.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { ThemePalette } from "@angular/material/core";
import { InvoiceReportComponent } from "../invoice/invoice-report/invoice-report.component";

@Component({
  selector: "app-room-transaction",
  templateUrl: "./room-transaction.component.html",
  styleUrls: ["./room-transaction.component.scss"],
})
export class RoomTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "full_name",
    "phone_number",
    "address",
    "room_category",
    "room_number",
    "no_of_days",
    "rate",
    "amount",
    "status",
    "check_in_date",
    "check_out_date",
    "action",
  ];
  dataSource: MatTableDataSource<Element>;
  selection = new SelectionModel<Element>(true, []);
  primaryColor: ThemePalette = "primary";

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private roomTransactionService: RoomTransactionService
  ) {}

  ngOnInit() {
    this.getRoomTransaction();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  getRoomTransaction() {
    this.roomTransactionService.getRoomTransaction().subscribe((result) => {
      const arr = [];
      if (result && result.data) {
        result.data.map((x) => {
          arr.push({
            first_name: x.customer.first_name,
            middle_name: x.customer.middle_name,
            last_name: x.customer.last_name,
            phone_number: x.customer.phone,
            address: x.customer.address,
            room_category: x.reservation.room.room_category.room_category,
            room_number: x.reservation.room.room_number,
            no_of_days: x.number_of_days,
            rate: x.rate,
            amount: x.total_amount,
            status: x.invoice_id == null ? "Due" : "Paid",
            check_in_date: x.reservation.check_in_date,
            check_out_date: x.reservation.check_out_date,
            reservation_id: x.reservation.id,
          });
        });
        this.dataSource = new MatTableDataSource(arr);
      }
    });
  }

  generateInvoice() {
    if (this.selection.selected.length == 0) {
      this.toastr.info(
        "Please select atleast one transaction to proceed",
        "Info!",
        {
          positionClass: "toast-top-right",
        }
      );
    } else {
      this.generateInvoiceReport();
    }
  }

  // onInvoiceGenerate() {
  //   const dialogRef = this.dialog.open(ConfirmCommonDialogComponent, {
  //     data: {
  //       gridData: this.selection.selected,
  //       formType: "Add",
  //       callFor: "Invoice Generate",
  //       confirmationText: "Are you sure you want to proceed the invoice?",
  //       positiveResponse: "Yes Proceed",
  //       negativeResponse: "Cancel the Proceed",
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //     }
  //   });
  // }

  generateInvoiceReport() {
    const dialogRef = this.dialog.open(InvoiceReportComponent, {
      width: "70%",
      height: "700px",
      data: {
        gridData: this.selection.selected,
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

  onAddClick() {
    const dialogRef = this.dialog.open(RoomTransactionFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: null,
        formType: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomTransaction();
        this.toastr.success("Room Transaction added successfully", "Success!", {
          positionClass: "toast-top-right",
        });
      }
    });
  }

  editRoomTransaction(transParams) {
    const dialogRef = this.dialog.open(RoomTransactionFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: transParams,
        formType: "Edit",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomTransaction();
        this.toastr.success(
          "Room Transaction updated successfully",
          "Success!",
          {
            positionClass: "toast-top-right",
          }
        );
      }
    });
  }
}
