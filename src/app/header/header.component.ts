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

    { name: "Food", path: "food", icon: "fastfood" },
    { name: "Room", path: "room", icon: "meeting_room" },
    { name: "Reservation", path: "reservation", icon: "check_circle" },
    { name: "Booking", path: "booking", icon: "book" },
    { name: "Room Transaction", path: "room-transaction", icon: "description" },
    { name: "Food Order", path: "food-order", icon: "room_service" },
    { name: "Invoice", path: "invoice", icon: "payment" },
    { name: "Customer", path: "customer", icon: "perm_identity" }
  ];

  constructor() {}

  ngOnInit() {}
}
