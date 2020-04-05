import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  components: any[] = [
    { name: "Dashboard", path: "dashboard", icon: "dashboard" },
    { name: "Room Category", path: "room-category", icon: "category" },
    { name: "Room", path: "room", icon: "meeting_room" },
    { name: "Table", path: "table", icon: "weekend" },
    { name: "Food", path: "food", icon: "fastfood" },
    { name: "Customer", path: "customer", icon: "perm_identity" },
    { name: "Booking", path: "booking", icon: "book" },
    { name: "Reservation", path: "reservation", icon: "check_circle" },
    { name: "Food Order", path: "food-order", icon: "room_service" },
    { name: "Room Transaction", path: "room-transaction", icon: "description" },
    { name: "Invoice", path: "invoice", icon: "payment" },
    { name: "User", path: "user", icon: "perm_identity" },
  ];

  constructor() { }

  ngOnInit() { }
}
