import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomTransactionService {
  private readonly baseURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  addRoomTransaction(roomParams: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(
      this.baseURL + "room_transactions",
      roomParams,
      options
    );
  }

  getRoomTransaction(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL + "room_transactions", options);
  }

  editRoomTransaction(roomParams: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(
      this.baseURL + "editRoomTransaction",
      roomParams,
      options
    );
  }
}
