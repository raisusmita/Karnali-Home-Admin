import { RoomAvailabilityService } from './../../shared/services/room-availability/room-availability.service';
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
import { InvoiceService } from "../invoice/invoice.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MatSlideToggleChange } from '@angular/material';
import { RoomService } from "../room/room.service";
import { TableService } from "../table/table.service";

@Component({
  selector: 'app-room-transaction',
  templateUrl: './room-transaction.component.html',
  styleUrls: ['./room-transaction.component.scss']
})
export class RoomTransactionComponent implements OnInit {

  displayedRoomTranColumns:string[]=[
    "select",
    "full_name",
    "phone_number",
    "room_number",
    "room_category",
    "status"
  ]
  displayedTableColumns:string[]=[
    "select",
    'table_number',
    'status'
  ]
  displayedRoomColumns: string[] = [
    "room_number",
    "check_in",
    "check_out",
    "number_of_days",
    "rate",
    "amount"
  ];
  displayedFoodColumns: string[] = [
    "food",
    "quantity",
    "price",
    "sub_total",
  ];
  dataSource: MatTableDataSource<Element>;
  roomTranDataSource:MatTableDataSource<Element>;
  roomDataSource:any={};
  tableDataSource:MatTableDataSource<Element>;
  foodDataSource:MatTableDataSource<Element>;
  foodTableDataSource:any={};

  selectedFoodDetail:any;
  foodTotal:any;
  grandTotal:any;
  selectedRoom:boolean;
  selectedTable:boolean;
  selection = new SelectionModel<Element>(true, []);
  primaryColor: ThemePalette = "primary";

  invoiceData: any
  allData: any
  invoicelRelatedData: any
  transactionRelatedData: any
  valueInitialized: boolean = false

  @BlockUI() blockUI: NgBlockUI

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  SlideText : string;

  // For room/table toggle
  transactionType: boolean;

  highlighted: boolean;
  hovered: boolean;

   //Food detail
   foodDetail: any[] = [];
   food_total_amount:number;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private roomTransactionService: RoomTransactionService,
    private invoiceService: InvoiceService,
    private data: InvoiceDataService,
    private roomService: RoomService,
    private tableService: TableService,
    private roomAvailabilityService:RoomAvailabilityService
  ) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize

    this.SlideText ="Room Transaction/s"

    this.getRoomTransaction()
    this.transactionType=true;
    this.getRoomList();

    this.data.currentInvoiceData.subscribe(
      (invoiceData) => (this.invoiceData = invoiceData)
    )
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize;
    this.getRoomTransaction();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row))
  }

  getRoomTransaction() {
    this.blockUI.start('Loading...')

    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.roomTransactionService
      .getRoomTransactionList(paginationParams)
      .subscribe(
        (result) => {
          const arr = []
          if (result && result.data) {
            this.totalLength = result.totalCount

            result.data.map((x) => {
              arr.push({
                transaction_id: x.id,
                invoice_number: x.invoice_id == null ? "":x.invoice.invoice_number,
                customer_id:x.customer.id,
                first_name: x.customer.first_name,
                middle_name: x.customer.middle_name,
                last_name: x.customer.last_name,
                phone_number: x.customer.phone,
                address: x.customer.address,
                room_category: x.reservation.room.room_category.room_category,
                room_number: x.reservation.room.room_number,
                room_id: x.reservation.room.id,
                no_of_days: x.number_of_days,
                rate: x.rate,
                amount: x.total_amount,
                status: x.invoice_id == null ? 'Due' : 'Paid',
                check_in_date: x.reservation.check_in_date,
                check_out_date: x.reservation.check_out_date,
                reservation_id: x.reservation.id,
                callFrom:'transaction'
              });
            });
            this.dataSource = new MatTableDataSource(arr);
            this.blockUI.stop();
          } else {
            this.blockUI.stop()
          }
        },
        () => {
          this.blockUI.stop();
        }
      )
  }

  generateInvoice() {
    if (this.selection.selected.length == 0) {
      this.toastr.info(
        'Please select atleast one transaction to proceed',
        'Info!',
        {
          positionClass: 'toast-top-right'
        }
      )
    } else {
      // this.generateInvoiceReport();
      const invoiceParams = this.selection.selected
      const customerName = {
        firstName: invoiceParams[0]['first_name'],
        middleName: invoiceParams[0]['middle_name'],
        lastName: invoiceParams[0]['last_name']
      }
      this.data.changeCustomer(customerName)

      this.invoiceService.addInvoice(invoiceParams).subscribe((result) => {
        if (result) {
          this.allData = result.data
          this.invoicelRelatedData = this.allData.filter(
            (invoice) => invoice.invoice
          )
          this.allData.pop()

          this.transactionRelatedData = this.allData

          this.data.changeInvoiceData(this.invoicelRelatedData)
          this.data.changeTransactionData(this.transactionRelatedData)

          // if (this.transactionRelatedData.length > 0) {
          //   setTimeout(() => {
          this.onInvoiceGenerate()
          // });
          // }
        }
      })
    }
  }

  onInvoiceGenerate() {
    const dialogRef = this.dialog.open(ConfirmCommonDialogComponent, {
      data: {
        gridData: this.selection.selected,
        formType: 'Add',
        callFor: 'Invoice Generate',
        confirmationText:
          'The invoice has been generated successfully. Do you want to print it further?',
        positiveResponse: 'Yes Print',
        negativeResponse: 'Cancel the Print'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.print();
        this.initialize();
      }
    })
  }

  onAddClick() {
    const dialogRef = this.dialog.open(RoomTransactionFormComponent, {
      width: '60%',
      height: '700px',
      data: {
        gridData: null,
        formType: 'Add'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomTransaction()
        this.toastr.success('Room Transaction added successfully', 'Success!', {
          positionClass: 'toast-top-right'
        })
      }
    })
  }

  editRoomTransaction(transParams) {
    const dialogRef = this.dialog.open(RoomTransactionFormComponent, {
      width: '60%',
      height: '700px',
      data: {
        gridData: transParams,
        formType: 'Edit'
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoomTransaction()
        this.toastr.success(
          'Room Transaction updated successfully',
          'Success!',
          {
            positionClass: 'toast-top-right'
          }
        )
      }
    })
  }

  onToggle(e: MatSlideToggleChange){
    this.foodDataSource = null;
    if(e.checked){
      this.SlideText="Table Transaction/s"
      this.transactionType =false;
      this.selectedRoom = false;
      this.getTable();
    }else{
      this.selectedTable=false;
      this.SlideText="Room Transaction/s"
      this.transactionType=true;
      this.getRoomList();
    }


  }

  getRoomList() {
    this.blockUI.start('Loading...')
    const roomParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.roomService.getRoomList(roomParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount
          this.roomTranDataSource = result.data
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

  
  getTable() {
    this.blockUI.start('Loading...')
    const paginationParams = {
      limit: this.limit,
      skip: this.skip
    }
    this.tableService.getTableList(paginationParams).subscribe(
      (result) => {
        const arr = []
        if (result && result.data) {
          const filterTable = result.data.filter(data=>data.food_orders[0].invoice_id ==null);
          filterTable.map((table) => {
            this.totalLength = result.totalCount
            arr.push({
              table_number:table.table_number,
              table_id:table.id,
              status: table.food_orders[0].invoice_id == null ? 'Due' : 'Paid',
              callFrom:'tableTransaction'
            });
          });
          this.tableDataSource = new MatTableDataSource(arr);
          this.blockUI.stop();
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

  getTotalFoodCost(){
    this.foodTotal = 0;
    if(this.selectedFoodDetail){
      this.foodTotal = this.selectedFoodDetail.map(food => food.food_items.price *food.quantity).reduce((acc, value) => acc + value, 0);
    }
    return parseFloat(this.foodTotal);
  }

  getGrandTotal(){
    this.grandTotal =0;
    if(this.roomDataSource.amount && this.selectedRoom){
      this.grandTotal =parseFloat(this.foodTotal) + parseFloat(this.roomDataSource.amount);
    }
     return this.grandTotal;

  }

  displaySelectedRoomDetail(data){
   data.middle_name= data.middle_name?data.middle_name:''
    this.roomDataSource ={
    room_number:data.room_number,
    room_category:data.room_category,
    no_of_days: data.no_of_days,
    rate: data.rate,
    amount: data.amount,
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    customer_name:data.first_name + ' '+ data.middle_name+' '+ data.last_name
    }
  }

  displaySelectedTable(data){
    this.foodTableDataSource ={
      table_number:data.table_number
    }
  }

  getFoodDetailForRoom(params){
    this.blockUI.start('Loading...')
    this.roomAvailabilityService.getFoodDetailForRoom(params).subscribe(result=>{
      if (result) {
        const arr =[];
        this.selectedFoodDetail = result;
        result.map(data =>{
          arr.push({
            food:data.food_items.food_name,
            quantity:data.quantity,
            price:data.price,
            sub_total: parseFloat(data.price)*data.quantity
          })
          this.foodDataSource = new MatTableDataSource(arr);

        });
      } else {
          this.blockUI.stop()
      }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
    })
  }

  getFoodDetailForTable(params){
    this.blockUI.start('Loading...')
    this.roomAvailabilityService.getFoodDetailForTable(params).subscribe(result=>{
      if (result) {
        const arr =[];
        this.selectedFoodDetail = result;
        result.map(data =>{
          arr.push({
            food:data.food_items.food_name,
            quantity:data.quantity,
            price:data.price,
            sub_total: parseFloat(data.price)*data.quantity
          })
          this.foodDataSource = new MatTableDataSource(arr);
        });
      } else {
        this.blockUI.stop()
      }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
      });
  }

  selectTransaction(row){
    if(row.callFrom =='transaction'){
      this.selectedRoom=true;
      this.displaySelectedRoomDetail(row);
      const params ={
        roomId:row.room_id,
        reservationId:row.reservation_id
      }
      this.getFoodDetailForRoom(params);
    }else{
      this.selectedTable=true;
      this.displaySelectedTable(row);
      const params ={
        table_id:row.table_id,
      }
      this.getFoodDetailForTable(params);

    }
    
  }




}
