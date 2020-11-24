import { InvoiceReportComponent } from './invoice-report.component'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [InvoiceReportComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],

  exports: [InvoiceReportComponent]
})
export class InvoiceReportModule {}
