import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
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

  addReservation(reservation: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    console.log(reservation);
    return this.http.post(this.baseURL, reservation, options);
  }

  editReservation(reservation: any): Observable<any> {
    console.log(reservation.id);
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(
      this.baseURL + "/" + reservation.id,
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
