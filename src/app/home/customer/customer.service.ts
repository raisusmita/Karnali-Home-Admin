import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly baseURL = environment.apiURL + 'customer';

  constructor(private http: HttpClient) { }

  getCustomer(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.baseURL, customer);
  }

  editCustomer(customer: any): Observable<any> {
    return this.http.put(this.baseURL + "/" + customer.id, customer);
  }

  deleteCustomer(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
