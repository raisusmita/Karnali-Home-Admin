import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly baseURL = "http://localhost:8000/api/customer";

  constructor(private http: HttpClient) {}

  getCustomer(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  addCustomer(customer: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL, customer, options);
  }

  editCustomer(customer: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(this.baseURL + "/" + customer.id, customer, options);
  }

  deleteCustomer(id: any): Observable<any> {
    const httpParams = new HttpParams();
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id, options);
  }
}
