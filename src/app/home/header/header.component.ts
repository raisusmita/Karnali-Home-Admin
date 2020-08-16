import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  selectedPath = '';
  components: any[] = [
    // { name: "Dashboard", path: "", icon: "dashboard" },
    { name: "Room Category", path: "room-category", icon: "category" },
    { name: "Room", path: "room", icon: "meeting_room" },
    { name: "Customer", path: "customer", icon: "perm_identity" },
    { name: "Booking", path: "booking", icon: "book" },
    { name: "Reservation", path: "reservation", icon: "check_circle" },
    // {
    //   name: "Room Availability",
    //   path: "room-availability",
    //   icon: "event_available",
    // },
    { name: "Food", path: "food", icon: "fastfood" },
    // { name: "Table", path: "table", icon: "weekend" },
    { name: "Food Order", path: "food-order", icon: "room_service" },
    {
      name: "Transaction",
      path: "room-transaction",
      icon: "description",
    },
    { name: "Invoice", path: "invoice", icon: "payment" },
    { name: "User", path: "user", icon: "group" },
  ];

  constructor(private router: Router) {
    this.selectedPath = router.url.split('/')[1];
  }

  ngOnInit() { }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  selectButton(path) {
    this.selectedPath = path;
  }
}
