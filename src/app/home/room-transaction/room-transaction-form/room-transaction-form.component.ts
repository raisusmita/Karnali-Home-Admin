import { MvRoomTransaction } from "./../room-transaction.model";
import { TableService } from "./../../table/table.service";
import { RoomAvailabilityService } from "src/app/shared/services/room-availability/room-availability.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RoomService } from "../../room/room.service";
import { CustomerService } from "../../customer/customer.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel, DataSource } from "@angular/cdk/collections";
import { FormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-room-transaction-form",
  templateUrl: "./room-transaction-form.component.html",
  styleUrls: ["./room-transaction-form.component.scss"],
})
export class RoomTransactionFormComponent implements OnInit {
  customers: any[] = [];
  tables: any[] = [];
  selectedRoom: any[] = [];

  addForm: boolean;
  editForm: boolean;
  roomTransaction: MvRoomTransaction = {} as MvRoomTransaction;
  roomList: any;
  displayedColumns: string[] = [
    "select",
    "room_id",
    "room_number",
    "room_category",
    "check_in_date",
    "check_out_date",
  ];

  dataSource: MatTableDataSource<Element>;
  selection = new SelectionModel<Element>(true, []);
  primaryColor: ThemePalette = "primary";
  constructor(
    private roomService: RoomService,
    private customerService: CustomerService,
    private tableService: TableService,
    private roomAvailabilityService: RoomAvailabilityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
    }
    this.geUnavailableRoom();
    this.getTables();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  geUnavailableRoom() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data;
    });
  }

  getTables() {
    this.tableService.getTable().subscribe((result) => {
      this.tables = result.data;
    });
  }

  onCustomerSelect(customerId: any) {
    // clear the selected rows for previous customer
    this.selection.clear();

    const paramsCustomerId = {
      customer_id: customerId,
    };

    this.roomAvailabilityService
      .getRoomListByCustomer(paramsCustomerId)
      .subscribe((result) => {
        this.roomList = result.data;
        // this.dataSource = this.roomList;
        const arr = [];
        if (result && result.data) {
          result.data.map((x) => {
            arr.push({
              room_id: x.room_id[0].id,
              room_number: x.room_id[0].room_number,
              room_category: x.room_id[0].room_category.room_category,
              reservation_id: x.reservation_id,
              check_in_date: x.check_in_date,
              check_out_date: x.check_out_date,
            });
          });
          this.dataSource = new MatTableDataSource(arr);
        }
      });
  }

  submitRoomTransactionForm() {
    if (this.addForm) {
      this.selectedRoom = this.selection.selected;
    }
  }
}
