import { TableComponent } from "./table/table.component";
import { CustomerComponent } from "./customer/customer/customer.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { BookingComponent } from "./booking/booking.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { FoodOrderComponent } from "./food-order/food-order.component";
import { FoodComponent } from "./food/food.component";
import { RoomTransactionComponent } from "./room-transaction/room-transaction.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoomComponent } from "./room/room.component";
import { RoomCategoryComponent } from "./room-category/room-category.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "dashboard", pathMatch: "full", redirectTo: "" },
  { path: "room-category", component: RoomCategoryComponent },
  { path: "room-transaction", component: RoomTransactionComponent },
  { path: "food", component: FoodComponent },
  { path: "food-order", component: FoodOrderComponent },
  { path: "reservation", component: ReservationComponent },
  { path: "booking", component: BookingComponent },
  { path: "invoice", component: InvoiceComponent },
  { path: "room", component: RoomComponent },
  { path: "customer", component: CustomerComponent },
  { path: "table", component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
