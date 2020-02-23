import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.css"]
})
export class AddCustomerComponent implements OnInit {
  customers: Customer[] = [
    { value: 0, viewValue: "Booking" },
    { value: 1, viewValue: "Reservation" }
  ];
  constructor() {}

  ngOnInit() {}
}
