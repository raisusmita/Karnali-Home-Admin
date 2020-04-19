import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RoomTransactionComponent } from "./room-transaction/room-transaction.component";
import { FoodOrderComponent } from "../home/food-order/food-order.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ConfirmDeleteComponent } from "../shared/confirm-delete/confirm-delete.component";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "./home.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

//  These imports has to be shifted to app module since it could be used in other than home module sections
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
//  ---------------------------------------------------------------------

import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { StorageServiceModule } from "angular-webstorage-service";
import { AuthGuard } from "../auth.guard";
import { AppRoutingModule } from "../app-routing.module";
import { RoomComponent } from "./room/room.component";
import { RoomCategoryComponent } from "./room-category/room-category.component";
import { BookingComponent } from "./booking/booking.component";
import { FoodComponent } from "./food/food.component";
import { NewRoomCategoryComponent } from "./room-category/new-room-category/new-room-category.component";
import { EditRoomCategoryComponent } from "./room-category/edit-room-category/edit-room-category.component";
import { CustomerComponent } from "./customer/customer.component";
import { AddRoomComponent } from "./room/add-room/add-room.component";
import { CustomerFormComponent } from "./customer/customer-form/customer-form.component";
import { FoodFormComponent } from "./food/food-form/food-form.component";
import { TableComponent } from "./table/table.component";
import { AddTableComponent } from "./table/add-table/add-table.component";
import { BookingFormComponent } from "./booking/booking-form/booking-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserAuthService } from "../user-auth.service";
import { UserService } from "./user/user.service";

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { ReservationFormComponent } from "./reservation/reservation-form/reservation-form.component";
import { DatePipe } from "@angular/common";
@NgModule({
  declarations: [
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
    AddRoomComponent,
    CustomerFormComponent,
    FoodFormComponent,
    TableComponent,
    AddTableComponent,
    BookingFormComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserFormComponent,
    ReservationFormComponent,
    ReservationComponent,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StorageServiceModule,
  ],
  providers: [UserAuthService, AuthGuard, UserService, DatePipe],
  entryComponents: [
    NewRoomCategoryComponent,
    EditRoomCategoryComponent,
    AddRoomComponent,
    FoodFormComponent,
    ConfirmDeleteComponent,
    CustomerFormComponent,
    AddTableComponent,
    BookingFormComponent,
    UserFormComponent,
    ReservationFormComponent,
  ],
})
export class HomeModule {}
