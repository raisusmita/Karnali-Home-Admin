import { Component, OnInit } from "@angular/core";
import { CustomerService } from "./customer.service";
import { MatDialog } from "@angular/material/dialog";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    "first_name",
    "email",
    "phone",
    "country",
    "address",
    "date_of_birth",
    "profession",
    "identity_type",
    "identity_number",
    "identity_image_first",
    "action",
  ];
  dataSource: any[];

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe((data) => {
      this.dataSource = data.data;
    });
  }

  addCustomer() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "50%",
      height: "700px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomer();
      }
    });
  }
  editCustomer(customerEditData) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "50%",
      height: "700px",
      data: customerEditData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomer();
      }
    });
  }

  deleteCustomer(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.customerService.deleteCustomer(index).subscribe((data) => {
          this.getCustomer();
        });
      }
    });
  }
}
