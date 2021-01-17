import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoomAvailabilityService {
  private readonly baseURL = environment.apiURL
  // private readonly baseURL = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}

  getAvailableRooms(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.get(this.baseURL + 'available', options)
  }

  getUnavailableRooms(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.get(this.baseURL + 'unavailable', options)
  }

  getRoomByBooking(bookingId: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.post(
      this.baseURL + 'availableRoomByBookingId',
      bookingId,
      options
    )
  }

  getRoomListByCustomer(customerId: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.post(
      this.baseURL + 'roomListByCustomerId',
      JSON.stringify(customerId),
      options
    )
  }

  getFoodDetailForRoom(params: any): Observable<any> {
    return this.http.post(this.baseURL + 'foodDetailForRoom', params)
  }

  getFoodDetailForTable(params: any): Observable<any> {
    return this.http.post(this.baseURL + 'foodDetailForTable', params)
  }

  addRoomUnavailable(unavailableRoom: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.post(
      this.baseURL + 'availableRoomByBooking',
      unavailableRoom,
      options
    )
  }

  // getAvailableRoomsByDate(startDate, endDate): Observable<any> {
  //   if (startDate < endDate) {
  //     const httpHeaders = new HttpHeaders().set(
  //       "Content-Type",
  //       "application/json"
  //     );
  //     const options = { headers: httpHeaders };
  //     return this.http.post(this.baseURL + "availableRoomByDate", options);
  //   }
  // }

  getRoomAvailabilityByDate(dates: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.post(this.baseURL + 'availableRoomByDate', dates, options)
  }
}
