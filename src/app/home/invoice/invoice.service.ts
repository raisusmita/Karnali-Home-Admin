import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private readonly baseURL = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}

  addInvoice(invoiceParams: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL + "invoices", invoiceParams, options);
  }
}
