import { InvoiceDataService } from './../../../shared/services/invoice-data-service/invoice-data.service'
import { AfterViewInit, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.scss']
})
export class InvoiceReportComponent implements OnInit, AfterViewInit {
  invoiceData: any
  transactionData: any
  customerData: any
  foodData:any;
  firstName: string
  middleName: string
  lastName: string
  transactionType:boolean
  constructor(private data: InvoiceDataService) {}

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
      this.data.currentInvoiceData.subscribe((invoiceData) => {
        this.invoiceData = invoiceData
      })

      this.data.currentTransactionData.subscribe((transactionData) => {
        this.transactionData = transactionData
      })

      this.data.currentFoodData.subscribe((foodData)=>{
        console.log(foodData)
        this.foodData = foodData
      })

      this.data.currentTransactionTypeData.subscribe((transactionType)=>{
        this.transactionType = transactionType;
      })

      this.data.currentCustomer.subscribe((customer) => {
        this.customerData = customer
        this.firstName = this.customerData.firstName
        this.middleName = this.customerData.middleName
        this.lastName = this.customerData.lastName
      })
  }
}
