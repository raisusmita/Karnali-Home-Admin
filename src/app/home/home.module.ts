import { CommonService } from './../shared/services/common-service/common.service'
import { InvoiceDataService } from './../shared/services/invoice-data-service/invoice-data.service'
import { RoomAvailabilityService } from './../shared/services/room-availability/room-availability.service'
import { ConfirmCommonDialogComponent } from './../shared/components/confirm-common-dialog/confirm-common-dialog.component'
import { NgModule } from '@angular/core'
import { HeaderComponent } from './header/header.component'
import { ReservationComponent } from './reservation/reservation.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { RoomTransactionComponent } from './room-transaction/room-transaction.component'
import { FoodOrderComponent } from '../home/food-order/food-order.component'
import { InvoiceComponent } from './invoice/invoice.component'
import { ConfirmDeleteComponent } from '../shared/components/confirm-delete/confirm-delete.component'
import { LoginComponent } from '../login/login.component'
import { HomeComponent } from './home.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

//  These imports has to be shifted to app module since it could be used in other than home module sections
import { HttpClientModule } from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTreeModule } from '@angular/material/tree'

import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
//  ---------------------------------------------------------------------

import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { StorageServiceModule } from 'angular-webstorage-service'
import { AuthGuard } from '../auth.guard'
import { AppRoutingModule } from '../app-routing.module'
import { RoomComponent } from './room/room.component'
import { RoomCategoryComponent } from './room-category/room-category.component'
import { BookingComponent } from './booking/booking.component'
import { FoodComponent } from './food/food.component'
import { CustomerComponent } from './customer/customer.component'
import { AddRoomComponent } from './room/add-room/add-room.component'
import { CustomerFormComponent } from './customer/customer-form/customer-form.component'
import { FoodFormComponent } from './food/food-form/food-form.component'
import { MainFoodFormComponent } from './food/main-food-form/main-food-form.component'
import { SubFoodFormComponent } from './food/sub-food-form/sub-food-form.component'
import { TableComponent } from './table/table.component'
import { AddTableComponent } from './table/add-table/add-table.component'
import { BookingFormComponent } from './booking/booking-form/booking-form.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { UserComponent } from './user/user.component'
import { UserFormComponent } from './user/user-form/user-form.component'
import { UserAuthService } from '../user-auth.service'
import { UserService } from './user/user.service'

//Toast
import { ToastrModule } from 'ngx-toastr'
import { MatCardModule } from '@angular/material/card'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule
} from '@angular/material-moment-adapter'
import { BlockUIModule } from 'ng-block-ui'
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component'
import { DatePipe } from '@angular/common'
import { RoomAvailabilityComponent } from './room-availability/room-availability.component'
import { RoomAvailabilityFormComponent } from './room-availability/room-availability-form/room-availability-form.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { RoomTransactionFormComponent } from './room-transaction/room-transaction-form/room-transaction-form.component'

import { ReactiveFormsModule } from '@angular/forms'
import { InvoiceReportModule } from './invoice/invoice-report/invoice-report.module'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { RoomCategoryFormComponent } from './room-category/room-category-form/room-category-form.component'
import { MainBarFormComponent } from './bar/main-bar-form/main-bar-form.component'
import { SubBarFormComponent } from './bar/sub-bar-form/sub-bar-form.component'
import { BarComponent } from './bar/bar.component'
import { BarFormComponent } from './bar/bar-form/bar-form.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FoodOrderDetailComponent } from './food-order-detail/food-order-detail.component'
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
    BarComponent,
    FoodOrderComponent,
    InvoiceComponent,
    RoomCategoryFormComponent,
    ConfirmDeleteComponent,
    ConfirmCommonDialogComponent,
    CustomerComponent,
    AddRoomComponent,
    CustomerFormComponent,
    FoodFormComponent,
    MainFoodFormComponent,
    SubFoodFormComponent,
    BarFormComponent,
    MainBarFormComponent,
    SubBarFormComponent,
    TableComponent,
    AddTableComponent,
    BookingFormComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserFormComponent,
    ReservationFormComponent,
    ReservationComponent,
    RoomAvailabilityComponent,
    RoomAvailabilityFormComponent,
    RoomTransactionFormComponent,
    FoodOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
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
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StorageServiceModule,
    MatCardModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTreeModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    InvoiceReportModule,
    NgbModule
  ],
  providers: [
    UserAuthService,
    AuthGuard,
    UserService,
    DatePipe,
    RoomAvailabilityService,
    InvoiceDataService,
    CommonService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } }
  ],
  entryComponents: [
    RoomCategoryFormComponent,
    AddRoomComponent,
    FoodFormComponent,
    MainFoodFormComponent,
    SubFoodFormComponent,
    BarFormComponent,
    MainBarFormComponent,
    SubBarFormComponent,
    ConfirmDeleteComponent,
    ConfirmCommonDialogComponent,
    CustomerFormComponent,
    AddTableComponent,
    BookingFormComponent,
    UserFormComponent,
    ReservationFormComponent,
    RoomAvailabilityFormComponent,
    RoomTransactionFormComponent
  ]
})
export class HomeModule {}
