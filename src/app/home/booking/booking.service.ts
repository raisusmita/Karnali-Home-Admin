import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
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

  addBooking(booking: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL + "booking", booking, options);
  }

  editBooking(booking: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(
      this.baseURL + "booking/" + booking.id,
      booking,
      options
    );
  }

  deleteBooking(id: any): Observable<any> {
    const httpParams = new HttpParams();
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "booking/" + id, options);
  }
}
