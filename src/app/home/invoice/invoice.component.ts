import { InvoiceService } from './invoice.service';
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] = [
    "action",
    "invoice_number",
    "room_number",
    "status",
    "sub_total",
    "discount",
    "grand_total",

  ];
  dataSource: MatTableDataSource<Element>;

  @BlockUI() blockUI: NgBlockUI;

  pageSizeOptions = [10, 25, 50, 100];

  pageSize: number;
  pageIndex: number;
  totalLength: number;
  limit: number;
  skip: number;
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.totalLength = 0;

    this.skip = 0;
    this.limit = this.pageSize;
    this.getInvoiceList();
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0;
    } else {
      this.skip = e.pageIndex * e.pageSize;
    }
    this.limit = e.pageSize;
    this.getInvoiceList();

  }

  getInvoiceList() {
    this.blockUI.start("Loading...");
    const invoiceParams = {
      limit: this.limit,
      skip: this.skip,
    };

    this.invoiceService.getInvoiceList(invoiceParams).subscribe(
      (result) => {
        const arr = [];
        if (result && result.data) {
          this.totalLength = result.totalCount;

          result.data.map((x) => {
            arr.push({
              id: x.id,
              invoice_number: x.invoice_number,
              status:"Paid",
              discount: x.discount,
              sub_total: x.sub_total,
              grand_total: x.grand_total
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

}
