import { Component, OnInit, Inject } from "@angular/core";
import { MvCustomer } from "../customer-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../customer.service";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  customer: MvCustomer = {} as MvCustomer;
  customerType = {
    Booking: "0",
    Reserved: "1"
  };
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {}

  ngOnInit() {
    this.customerService.getCustomer().subscribe(() => {
      if (this.data) {
        this.isEdit = true;
        this.customer = this.data;
      }
    });
  }
  submitCustomerForm() {
    if (this.isEdit) {
      this.customerService.editCustomer(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    } else {
      this.customerService.addCustomer(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    }
  }
}
