import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoomComponent } from "./room/room.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
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

import { RoomCategoryComponent } from "./room-category/room-category.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { BookingComponent } from "./booking/booking.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RoomTransactionComponent } from "./room-transaction/room-transaction.component";
import { FoodComponent } from "./food/food.component";
import { FoodOrderComponent } from "./food-order/food-order.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { NewRoomCategoryComponent } from "./room-category/new-room-category/new-room-category.component";

import { FormsModule } from "@angular/forms";
import { EditRoomCategoryComponent } from "./room-category/edit-room-category/edit-room-category.component";
import { ConfirmDeleteComponent } from "./shared/confirm-delete/confirm-delete.component";
import { CustomerComponent } from "./customer/customer/customer.component";
import { AddCustomerComponent } from "./customer/add-customer/add-customer.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomComponent,
    RoomCategoryComponent,
    ReservationComponent,
    BookingComponent,
    DashboardComponent,
    RoomTransactionComponent,
    FoodComponent,
    FoodOrderComponent,
    InvoiceComponent,
    NewRoomCategoryComponent,
    EditRoomCategoryComponent,
    ConfirmDeleteComponent,
    CustomerComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  entryComponents: [
    NewRoomCategoryComponent,
    EditRoomCategoryComponent,
    ConfirmDeleteComponent,
    AddCustomerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
