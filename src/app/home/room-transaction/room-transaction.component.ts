import { InvoiceDataService } from "./../../shared/services/invoice-data-service/invoice-data.service";
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
import { InvoiceService } from "../invoice/invoice.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

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

  invoiceData: any;
  allData: any;
  invoicelRelatedData: any;
  transactionRelatedData: any;
  valueInitialized: boolean = false;

  @BlockUI() blockUI: NgBlockUI;

  pageSizeOptions = [10, 25, 50, 100];

  pageSize: number;
  pageIndex: number;
  totalLength: number;
  limit: number;
  skip: number;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private roomTransactionService: RoomTransactionService,
    private invoiceService: InvoiceService,
    private data: InvoiceDataService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.totalLength = 0;

    this.skip = 0;
    this.limit = this.pageSize;

    this.getRoomTransaction();
    this.data.currentInvoiceData.subscribe(
      (invoiceData) => (this.invoiceData = invoiceData)
    );
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0;
    } else {
      this.skip = e.pageIndex * e.pageSize;
    }
    this.limit = e.pageSize;

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
    this.blockUI.start("Loading...");

    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.roomTransactionService
      .getRoomTransactionList(paginationParams)
      .subscribe(
        (result) => {
          const arr = [];
          if (result && result.data) {
            this.totalLength = result.totalCount;

            result.data.map((x) => {
              arr.push({
                transaction_id: x.id,
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
            this.blockUI.stop();
          } else {
            this.blockUI.stop();
          }
        },
        (error) => {
          this.blockUI.stop();
        }
      );
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
      // this.generateInvoiceReport();
      const invoiceParams = this.selection.selected;
      const customerName = {
        firstName: invoiceParams[0]["first_name"],
        middleName: invoiceParams[0]["middle_name"],
        lastName: invoiceParams[0]["last_name"],
      };
      this.data.changeCustomer(customerName);

      this.invoiceService.addInvoice(invoiceParams).subscribe((result) => {
        if (result) {
          this.allData = result.data;
          this.invoicelRelatedData = this.allData.filter(
            (invoice) => invoice.invoice
          );
          this.allData.pop();

          this.transactionRelatedData = this.allData;

          this.data.changeInvoiceData(this.invoicelRelatedData);
          this.data.changeTransactionData(this.transactionRelatedData);

          // if (this.transactionRelatedData.length > 0) {
          //   setTimeout(() => {
          this.onInvoiceGenerate();
          // });
          // }
        }
      });
    }
  }

  onInvoiceGenerate() {
    const dialogRef = this.dialog.open(ConfirmCommonDialogComponent, {
      data: {
        gridData: this.selection.selected,
        formType: "Add",
        callFor: "Invoice Generate",
        confirmationText:
          "The invoice has been generated successfully. Do you want to print it further?",
        positiveResponse: "Yes Print",
        negativeResponse: "Cancel the Print",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.print();
      }
    });
  }

  // generateInvoiceReport() {
  //   const dialogRef = this.dialog.open(InvoiceReportComponent, {
  //     width: "70%",
  //     height: "700px",
  //     data: {
  //       gridData: this.selection.selected,
  //       callFor: "Invoice Generate",
  //       confirmationText: "Are you sure you want to proceed the invoice?",
  //       positiveResponse: "Yes Proceed",
  //       negativeResponse: "Cancel the Proceed",
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log("test");
  //     }
  //   });
  // }

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
