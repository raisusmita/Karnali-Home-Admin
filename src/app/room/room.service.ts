import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoomService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = "http://localhost:8000/api/rooms";

  getRoom(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  addRoom(room: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL, room, options);
  }

  // editRoom(room: any): Observable<any> {
  //   const httpHeaders = new HttpHeaders().set(
  //     "Content-Type",
  //     "application/json"
  //   );
  //   const options = { headers: httpHeaders };
  //   return this.http.put(this.baseURL, room, options);
  // }
  editRoom(room: any): Observable<any> {
    console.log(room.id);
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(this.baseURL + "/" + room.id, room, options);
  }
}
