import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  private readonly baseURL = "http://localhost:8000/api/";

  constructor(private http: HttpClient) {}

  getBooking(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL + "booking", options);
  }

  getBookedRoom(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL + "booked_rooms", options);
  }

  // addCustomer(customer: any): Observable<any> {
  //   const httpHeaders = new HttpHeaders().set(
  //     "Content-Type",
  //     "application/json"
  //   );
  //   const options = { headers: httpHeaders };
  //   return this.http.post(this.baseURL, customer, options);
  // }

  // editCustomer(customer: any): Observable<any> {
  //   const httpHeaders = new HttpHeaders().set(
  //     "Content-Type",
  //     "application/json"
  //   );
  //   const options = { headers: httpHeaders };
  //   return this.http.put(this.baseURL + "/" + customer.id, customer, options);
  // }

  // deleteCustomer(id: any): Observable<any> {
  //   const httpParams = new HttpParams();
  //   const options = { params: httpParams };
  //   return this.http.delete(this.baseURL + "/" + id, options);
  // }
}
