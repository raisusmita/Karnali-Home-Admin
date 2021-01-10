import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  invoiceArr: [] = []
  transactionArr: [] = []
  customerArr: [] = []
  foodArr: [] = []
  transactionTypeArr: [] = []

  private dataSourceInvoice = new BehaviorSubject<any>(this.invoiceArr)
  private dataSourceTransaction = new BehaviorSubject<any>(this.transactionArr)
  private dataSourceCustomer = new BehaviorSubject<any>(this.customerArr)
  private dataSourceFood = new BehaviorSubject<any>(this.foodArr)
  private dataSourceTransactionType = new BehaviorSubject<any>(
    this.transactionTypeArr
  )

  currentInvoiceData = this.dataSourceInvoice.asObservable()
  currentTransactionData = this.dataSourceTransaction.asObservable()
  currentCustomer = this.dataSourceCustomer.asObservable()
  currentFoodData = this.dataSourceFood.asObservable()
  currentTransactionTypeData = this.dataSourceTransactionType.asObservable()

  constructor() {}

  changeInvoiceData(invoiceData: any) {
    this.dataSourceInvoice.next(invoiceData)
  }

  changeTransactionData(transactionData: any) {
    this.dataSourceTransaction.next(transactionData)
  }

  changeFoodData(foodData: any) {
    this.dataSourceFood.next(foodData)
  }

  changeCustomer(customer: any) {
    this.dataSourceCustomer.next(customer)
  }

  changeTransactionType(transactionType: any) {
    this.dataSourceTransactionType.next(transactionType)
  }
}
