import { InvoiceDataService } from "./../../../shared/services/invoice-data-service/invoice-data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.scss"],
})
export class InvoiceReportComponent implements OnInit {
  invoiceData: any;
  transactionData: any;
  constructor(private data: InvoiceDataService) {}

  ngOnInit() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    setTimeout(() => {
      this.data.currentInvoiceData.subscribe((invoiceData) => {
        this.invoiceData = invoiceData;
      });

      this.data.currentTransactionData.subscribe((transactionData) => {
        this.transactionData = [...transactionData];
      });
    });
  }
}
