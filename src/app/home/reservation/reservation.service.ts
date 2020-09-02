import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private readonly baseURL = environment.apiURL;
  // private readonly baseURL = "http://localhost:8000/api/reservations";

  constructor(private http: HttpClient) {}

  getReservation(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  getAvailableRoom(): Observable<any> {
    return this.http.get(this.baseURL + "available");
  }

  addReservation(reservation: any): Observable<any> {
    return this.http.post(this.baseURL + "reservations", reservation);
  }

  addRoomUnavailable(unavailableRoom: any): Observable<any> {
    return this.http.post(
      this.baseURL + "availableRoomByBooking",
      JSON.stringify(unavailableRoom)
    );
  }

  bookingToReservation(reservation: any): Observable<any> {
    return this.http.post(
      this.baseURL + "bookingToReservation",
      JSON.stringify(reservation)
    );
  }

  getRoomAvailabilityByDate(dates: any): Observable<any> {
    return this.http.post(
      this.baseURL + "reservations/availableRoomByDate",
      dates
    );
  }

  editReservation(reservation: any): Observable<any> {
    return this.http.put(
      this.baseURL + "reservations/" + reservation[0].reservation_id,
      reservation
    );
  }

  deleteReservation(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "reservations/" + id);
  }
}
