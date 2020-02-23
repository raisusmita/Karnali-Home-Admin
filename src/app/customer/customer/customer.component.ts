import { AddCustomerComponent } from "./../add-customer/add-customer.component";
import { MatDialog } from "@angular/material/dialog";
import { CustomerService } from "./../customer.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    "first_name",
    "middle_name",
    "last_name",
    "email",
    "phone",
    "customer_type",
    "created_at",
    "action"
  ];
  dataSource: any[];

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  getCustomer() {
    this.customerService.getCustomer().subscribe(data => {
      this.dataSource = data.data;
    });
  }
  ngOnInit() {
    this.getCustomer();
  }

  addNewCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        // const newArray = [...this.dataSource];
        // newArray.push(result);
        // this.dataSource = newArray;
        this.getCustomer();
      }
    });
  }
}
