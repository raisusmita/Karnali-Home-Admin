import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  invoiceArr: [] = [];
  transactionArr: [] = [];

  private dataSourceInvoice = new BehaviorSubject<any>(this.invoiceArr);
  private dataSourceTransaction = new BehaviorSubject<any>(this.transactionArr);

  currentInvoiceData = this.dataSourceInvoice.asObservable();
  currentTransactionData = this.dataSourceTransaction.asObservable();

  constructor() {}

  changeInvoiceData(invoiceData: any) {
    this.dataSourceInvoice.next(invoiceData);
  }

  changeTransactionData(transactionData: any) {
    this.dataSourceTransaction.next(transactionData);
  }
}
