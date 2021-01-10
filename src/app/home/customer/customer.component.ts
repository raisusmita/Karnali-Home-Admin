import { NgBlockUI } from 'ng-block-ui'
import { Component, OnInit } from '@angular/core'
import { CustomerService } from './customer.service'
import { MatDialog } from '@angular/material/dialog'
import { CustomerFormComponent } from './customer-form/customer-form.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { BlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'email',
    'phone',
    'country',
    'address',
    'date_of_birth',
    'profession',
    'identity_type',
    'identity_number',
    'identity_image_first',
    'action'
  ]
  dataSource: any[]
  @BlockUI() blockUI: NgBlockUI
  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.getCustomerList()
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    this.getCustomerList()
  }
  getCustomerList() {
    this.blockUI.start('Loading...')

    const customerParams = {
      limit: this.limit,
      skip: this.skip
    }

    this.customerService.getCustomerList(customerParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount
          this.dataSource = result.data
        } else {
          this.blockUI.stop()
        }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  addCustomer() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '50%',
      height: '700px',
      data: {
        gridData: null,
        formType: 'Add'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomerList()
      }
    })
  }
  editCustomer(editData) {
    const customerEditData = JSON.parse(JSON.stringify(editData))
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '50%',
      height: '700px',
      data: {
        gridData: customerEditData,
        formType: 'Edit'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomerList()
      }
    })
  }

  deleteCustomer(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.customerService.deleteCustomer(index).subscribe((data) => {
          this.getCustomerList()
        })
      }
    })
  }
}
