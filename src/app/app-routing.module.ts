import { AuthGuard } from "./auth.guard";
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
import { UserComponent } from "./home/user/user.component";
import { RoomAvailabilityComponent } from "./home/room-availability/room-availability.component";
import { BarComponent } from './home/bar/bar.component';
import { FoodOrderDetailComponent } from './home/food-order-detail/food-order-detail.component';
const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: "",
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "room-category", component: RoomCategoryComponent },
      { path: "room-transaction", component: RoomTransactionComponent },
      { path: "food", component: FoodComponent },
      { path: "bar", component: BarComponent },
      { path: "food-order", component: FoodOrderComponent },
      { path: "food-order-detail", component: FoodOrderDetailComponent },
      { path: "reservation", component: ReservationComponent },
      { path: "booking", component: BookingComponent },
      { path: "invoice", component: InvoiceComponent },
      { path: "room", component: RoomComponent },
      { path: "customer", component: CustomerComponent },
      { path: "table", component: TableComponent },
      { path: "user", component: UserComponent },
      { path: "room-availability", component: RoomAvailabilityComponent },
    ],
  },
  { path: "dashboard", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
