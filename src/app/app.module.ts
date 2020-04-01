import { AuthGuard } from "./auth.guard";
import { UserService } from "./user.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";

import { FormsModule } from "@angular/forms";
import { EditRoomCategoryComponent } from "./home/room-category/edit-room-category/edit-room-category.component";
import { ConfirmDeleteComponent } from "./shared/confirm-delete/confirm-delete.component";
import { CustomerComponent } from "./home/customer/customer.component";
import { AddRoomComponent } from "./home/room/add-room/add-room.component";
import { FoodFormComponent } from "./home/food/food-form/food-form.component";
import { LoginComponent } from "./login/login.component";
import { BookingFormComponent } from "./home/booking/booking-form/booking-form.component";
import { StorageServiceModule } from "angular-webstorage-service";
import { RoomCategoryComponent } from "./home/room-category/room-category.component";
import { ReservationComponent } from "./home/reservation/reservation.component";
import { BookingComponent } from "./home/booking/booking.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { RoomTransactionComponent } from "./home/room-transaction/room-transaction.component";
import { FoodComponent } from "./home/food/food.component";
import { FoodOrderComponent } from "./home/food-order/food-order.component";
import { InvoiceComponent } from "./home/invoice/invoice.component";
import { NewRoomCategoryComponent } from "./home/room-category/new-room-category/new-room-category.component";
import { HeaderComponent } from "./home/header/header.component";
import { RoomComponent } from "./home/room/room.component";
import { CustomerFormComponent } from "./home/customer/customer-form/customer-form.component";
import { TableComponent } from "./home/table/table.component";
import { AddTableComponent } from "./home/table/add-table/add-table.component";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, HomeModule],
  providers: [UserService, AuthGuard],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
