import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly baseURL = environment.apiURL

  constructor(private http: HttpClient) {}

  getInvoiceList(invoiceParams): Observable<any> {
    return this.http.post(environment.apiURL + 'invoiceList', invoiceParams)
  }

  invoiceDetail(invoiceParams): Observable<any> {
    return this.http.post(environment.apiURL + 'invoiceDetail', invoiceParams)
  }

  addInvoice(invoiceParams: any): Observable<any> {
    return this.http.post(this.baseURL + 'invoices', invoiceParams)
  }
}
