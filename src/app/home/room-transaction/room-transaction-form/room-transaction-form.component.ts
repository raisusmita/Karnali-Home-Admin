import { ConfirmCommonDialogService } from './../../../shared/components/confirm-common-dialog/confirm-common-dialog.service'
import { InvoiceDataService } from 'src/app/shared/services/invoice-data-service/invoice-data.service'
import { MatDialog } from '@angular/material/dialog'
// import { RoomTransactionComponent } from './../room-transaction.component'
import { ToastrService } from 'ngx-toastr'
import { RoomTransactionService } from './../room-transaction.service'
import { MvRoomTransaction } from './../room-transaction.model'
import { RoomAvailabilityService } from 'src/app/shared/services/room-availability/room-availability.service'
import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CustomerService } from '../../customer/customer.service'
import { MatTableDataSource } from '@angular/material/table'
import { SelectionModel } from '@angular/cdk/collections'
import { ThemePalette } from '@angular/material/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { RoomTransactionComponent } from '../room-transaction.component'
@Component({
  selector: 'app-room-transaction-form',
  templateUrl: './room-transaction-form.component.html',
  styleUrls: ['./room-transaction-form.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class RoomTransactionFormComponent implements OnInit {
  customers: any[] = []
  tables: any[] = []
  selectedRoom: any[] = []

  addForm: boolean
  editForm: boolean
  roomTransaction: MvRoomTransaction = {} as MvRoomTransaction
  roomList: boolean
  displayFood: boolean
  displayedColumns: string[] = [
    'select',
    'room_number',
    'check_in_date',
    'room_category',
    'check_out_date',
    'view_foods'
  ]
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow')
  expandedElement: any

  dataSource: MatTableDataSource<Element>
  selection = new SelectionModel<Element>(true, [])
  primaryColor: ThemePalette = 'primary'
  dateTry: Date

  //Food detail
  foodDetail: any[] = []
  itemDetails: any[] = []

  food_total_amount: number
  invoiceParams: any

  @BlockUI() blockUI: NgBlockUI
  @ViewChild('roomTransactionDirectory', { static: true })
  roomTransactionDirectory: RoomTransactionComponent

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private roomAvailabilityService: RoomAvailabilityService,
    private roomTransactionService: RoomTransactionService,
    private dialogRef: MatDialogRef<RoomTransactionFormComponent>,
    private confrimCommonDialogService: ConfirmCommonDialogService,
    private dialog: MatDialog,
    private invoiceService: InvoiceDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dateTry = new Date()
    if (this.data.formType == 'Add') {
      this.addForm = true
      this.getCustomers()
    } else {
      this.editForm = true
      this.roomTransaction = this.data.gridData
      this.roomTransaction.check_in_date = new Date(
        this.roomTransaction.check_in_date
      )
      this.roomTransaction.check_out_date = new Date(
        this.roomTransaction.check_out_date
      )
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle($e) {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row))
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data
    })
  }

  onCustomerSelect(customerId: any) {
    // clear the selected rows for previous customer
    this.selection.clear()
    this.roomList = false
    const paramsCustomerId = {
      customer_id: customerId
    }

    this.roomAvailabilityService
      .getRoomListByCustomer(paramsCustomerId)
      .subscribe((result) => {
        if (result.data != null) {
          this.roomList = true
        }
        const arr = []
        if (result && result.data) {
          result.data.map((roomData) => {
            arr.push({
              room_id: roomData.room_id[0].id,
              room_number: roomData.room_id[0].room_number,
              room_category: roomData.room_id[0].room_category.room_category,
              room_category_id: roomData.room_id[0].room_category.id,
              reservation_id: roomData.reservation_id,
              check_in_date: new Date(roomData.check_in_date),
              check_out_date: new Date(roomData.check_out_date)
              // food_details:roomData.room_id[0].food_orders
            })
          })
          this.dataSource = new MatTableDataSource(arr)
        } else {
          this.toastr.info(result.message, ' Branch Delete')
        }
      })
  }

  expandTable(element) {
    this.displayFood = false

    element.isExpanded = !element.isExpanded
    const params = {
      roomId: element.room_id,
      reservationId: element.reservation_id
    }
    element.isExpanded ? this.getFoodDetail(params) : ''
  }

  getFoodDetail(params) {
    this.blockUI.start('Loading...')
    this.itemDetails = []
    this.roomAvailabilityService.getFoodDetailForRoom(params).subscribe(
      (result) => {
        if (result.length != 0) {
          this.food_total_amount = 0

          result.map((item) => {
            if (item.food_items) {
              this.itemDetails.push({
                item_name: item.food_items.food_name,
                price: item.food_items.price,
                quantity: item.quantity,
                total_amount: item.total_amount
              })
            } else if (item.bar_items) {
              this.itemDetails.push({
                item_name: item.bar_items.bar_name,
                price: item.bar_items.price,
                quantity: item.quantity,
                total_amount: item.total_amount
              })
            } else if (item.coffee_items) {
              this.itemDetails.push({
                item_name: item.coffee_items.coffee_name,
                price: item.coffee_items.price,
                quantity: item.quantity,
                total_amount: item.total_amount
              })
            }
          })
          this.displayFood = true

          // Grand total of food
          result.map((foodData) => {
            this.food_total_amount =
              this.food_total_amount + parseFloat(foodData.total_amount)
          })
        } else {
          this.displayFood = false
          this.blockUI.stop()
        }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  submitRoomTransactionForm(): Promise<any> {
    this.blockUI.start('Loading...')
    if (this.addForm) {
      this.selectedRoom = this.selection.selected
      this.selectedRoom.map((data) => {
        const offsetCIn = data.check_in_date.getTimezoneOffset() * 60000
        const offsetCOut = data.check_out_date.getTimezoneOffset() * 60000

        data.check_in_date = new Date(data.check_in_date.getTime() - offsetCIn)
        data.check_out_date = new Date(
          data.check_out_date.getTime() - offsetCOut
        )
      })
      this.roomTransactionService
        .addRoomTransaction(this.selectedRoom)
        .subscribe(
          (result) => {
            if (result.data) {
              const detail = result.data
              this.confrimCommonDialogService.callFrom = 'room'
              this.invoiceParams = []
              detail.map((detail) => {
                this.invoiceParams.push({
                  address: detail.customer[0].address,
                  amount: detail.transaction.total_amount,
                  callFrom: 'transaction',
                  check_in_date: detail.reservation[0].check_in_date,
                  check_out_date: detail.reservation[0].check_out_date,
                  customer_id: detail.customer[0].id,
                  first_name: detail.customer[0].first_name,
                  invoice_number: '',
                  last_name: detail.customer[0].last_name,
                  middle_name: detail.customer[0].middle_name,
                  no_of_days: detail.transaction.number_of_days,
                  phone_number: detail.customer[0].phone,
                  rate: detail.transaction.rate,
                  reservation_id: detail.reservation[0].id,
                  room_category_id: detail.reservation[0].room.room_category_id,
                  room_id: detail.reservation[0].room.id,
                  room_number: detail.reservation[0].room.room_number,
                  status: 'Due',
                  transaction_id: detail.transaction.id,
                  discount: this.roomTransaction.discount
                    ? this.roomTransaction.discount
                    : 0,
                  service_tax: this.roomTransaction.service_tax
                    ? this.roomTransaction.service_tax
                    : 0
                })
              })

              // tslint:disable-next-line: no-unused-expression
              return new Promise((resolve, reject) => {
                Promise.all([
                  this.roomTransactionDirectory.generateInvoice(
                    this.invoiceParams
                  )
                ]).then(([response]) => {
                  this.blockUI.stop()
                  this.dialogRef.close(response)
                  return resolve(true)
                }, reject)
              })
            } else {
              this.blockUI.stop()
              return true
            }
          },
          (error) => {
            this.blockUI.stop()
            return true
          }
        )
    } else if (this.editForm) {
      const offsetCIn =
        this.roomTransaction.check_in_date.getTimezoneOffset() * 60000
      const offsetCOut =
        this.roomTransaction.check_out_date.getTimezoneOffset() * 60000

      this.roomTransaction.check_in_date = new Date(
        this.roomTransaction.check_in_date.getTime() - offsetCIn
      )
      this.roomTransaction.check_out_date = new Date(
        this.roomTransaction.check_out_date.getTime() - offsetCOut
      )
      const editTransactionParams = {
        reservation_id: this.roomTransaction.reservation_id,
        check_in_date: this.roomTransaction.check_in_date,
        check_out_date: this.roomTransaction.check_out_date,
        rate: this.roomTransaction.rate
      }

      // tslint:disable-next-line: no-unused-expression
      return new Promise((resolve, reject) => {
        Promise.all([
          this.roomTransactionService.editRoomTransaction(editTransactionParams)
        ]).then(([response]) => {
          if (response) {
            this.blockUI.stop()
            this.dialogRef.close(response)
            return resolve(true)
          } else {
            this.blockUI.stop()
            return true
          }
        }, reject)
      })
    }
  }
}
