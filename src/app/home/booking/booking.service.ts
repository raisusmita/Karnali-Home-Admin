import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
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

  addBooking(booking: any): Observable<any> {
    return this.http.post(this.baseURL + "booking", booking);
  }

  editBooking(booking: any): Observable<any> {
    return this.http.put(
      this.baseURL + "booking/" + booking.id,
      booking
    );
  }

  deleteBooking(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "booking/" + id);
  }
}
