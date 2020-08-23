import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  arr: [] = [];
  private dataSource = new BehaviorSubject<any>(this.arr);
  currentInvoiceData = this.dataSource.asObservable();

  constructor() {}

  changeInvoiceData(data: any) {
    this.dataSource.next(data);
  }
}
