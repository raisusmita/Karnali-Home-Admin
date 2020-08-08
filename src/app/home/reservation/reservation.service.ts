import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private readonly baseURL = "http://localhost:8000/api/reservations";

  constructor(private http: HttpClient) {}

  getReservation(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  getAvailableRoom(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get("http://localhost:8000/api/available", options);
  }

  addReservation(reservation: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL, reservation, options);
  }

  addRoomUnavailable(unavailableRoom: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(
      "http://localhost:8000/api/availableRoomByBooking",
      JSON.stringify(unavailableRoom),
      options
    );
  }

  bookingToReservation(reservation: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(
      "http://localhost:8000/api/bookingToReservation",
      JSON.stringify(reservation),
      options
    );
  }

  getRoomAvailabilityByDate(dates: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(
      "http://localhost:8000/api/availableRoomByDate",
      dates,
      options
    );
  }

  editReservation(reservation: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(
      this.baseURL + "/" + reservation[0].reservation_id,
      reservation,
      options
    );
  }

  deleteReservation(id: any): Observable<any> {
    const httpParams = new HttpParams();
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id, options);
  }
}
