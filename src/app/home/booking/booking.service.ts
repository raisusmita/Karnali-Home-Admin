import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class BookingService {
  private readonly baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getBooking(): Observable<any> {
    return this.http.get(this.baseURL + "booking");
  }

  getBookedRoom(): Observable<any> {
    return this.http.get(this.baseURL + "booked_rooms");
  }

  // addCustomer(customer: any): Observable<any> {
  //   return this.http.post(this.baseURL, customer);
  // }

  // editCustomer(customer: any): Observable<any> {
  //   return this.http.put(this.baseURL + "/" + customer.id, customer);
  // }

  // deleteCustomer(id: any): Observable<any> {
  //   return this.http.delete(this.baseURL + "/" + id);
  // }
}
