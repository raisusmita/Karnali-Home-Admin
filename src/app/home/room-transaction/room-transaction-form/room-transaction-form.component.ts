import { CustomerService } from "./../../customer/customer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-room-transaction-form",
  templateUrl: "./room-transaction-form.component.html",
  styleUrls: ["./room-transaction-form.component.scss"],
})
export class RoomTransactionFormComponent implements OnInit {
  customers: any[] = [];
  addForm: boolean;
  editForm: boolean;

  constructor(
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
    }
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result.data;
    });
  }
}
