import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  components: any[] = [
    { name: "Dashboard", path: "home/dashboard", icon: "dashboard" },
    { name: "Room Category", path: "home/room-category", icon: "category" },
    { name: "Room", path: "home/room", icon: "meeting_room" },
    { name: "Table", path: "home/table", icon: "weekend" },
    { name: "Food", path: "home/food", icon: "fastfood" },
    { name: "Customer", path: "home/customer", icon: "perm_identity" },
    { name: "Booking", path: "home/booking", icon: "book" },
    { name: "Reservation", path: "home/reservation", icon: "check_circle" },
    { name: "Food Order", path: "home/food-order", icon: "room_service" },
    {
      name: "Room Transaction",
      path: "home/room-transaction",
      icon: "description"
    },
    { name: "Invoice", path: "home/invoice", icon: "payment" }
  ];

  constructor() {}

  ngOnInit() {}
}
