import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoomComponent } from "./room/room.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";

import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { RoomCategoryComponent } from "./room-category/room-category.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { BookingComponent } from "./booking/booking.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RoomTransactionComponent } from "./room-transaction/room-transaction.component";
import { FoodComponent } from "./food/food.component";
import { FoodOrderComponent } from "./food-order/food-order.component";
import { InvoiceComponent } from "./invoice/invoice.component";

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
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
