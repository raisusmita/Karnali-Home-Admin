import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  invoiceArr: [] = []
  transactionArr: [] = []
  customerArr: [] = []

  private dataSourceInvoice = new BehaviorSubject<any>(this.invoiceArr)
  private dataSourceTransaction = new BehaviorSubject<any>(this.transactionArr)
  private dataSourceCustomer = new BehaviorSubject<any>(this.customerArr)

  currentInvoiceData = this.dataSourceInvoice.asObservable()
  currentTransactionData = this.dataSourceTransaction.asObservable()
  currentCustomer = this.dataSourceCustomer.asObservable()

  constructor() {}

  changeInvoiceData(invoiceData: any) {
    this.dataSourceInvoice.next(invoiceData)
  }

  changeTransactionData(transactionData: any) {
    this.dataSourceTransaction.next(transactionData)
  }

  changeCustomer(customer: any) {
    this.dataSourceCustomer.next(customer)
  }
}
