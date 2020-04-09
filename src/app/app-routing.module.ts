import { AuthGuard } from "./auth.guard";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { RoomCategoryComponent } from "./home/room-category/room-category.component";
import { RoomTransactionComponent } from "./home/room-transaction/room-transaction.component";
import { FoodComponent } from "./home/food/food.component";
import { FoodOrderComponent } from "./home/food-order/food-order.component";
import { ReservationComponent } from "./home/reservation/reservation.component";
import { BookingComponent } from "./home/booking/booking.component";
import { InvoiceComponent } from "./home/invoice/invoice.component";
import { RoomComponent } from "./home/room/room.component";
import { CustomerComponent } from "./home/customer/customer.component";
import { TableComponent } from "./home/table/table.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: BookingComponent },
  {
    path: "home",
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },

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
    ]
  }

  // { path: "dashboard", pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
