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
    return this.http.post(this.baseURL + "room_transactions", roomParams);
  }

  getRoomTransactionList(params): Observable<any> {
    return this.http.post(this.baseURL + "roomTransactionList", params);
  }

  getRoomTransaction(): Observable<any> {
    return this.http.get(this.baseURL + "room_transactions");
  }

  editRoomTransaction(roomParams: any): Observable<any> {
    return this.http.post(this.baseURL + "editRoomTransaction", roomParams);
  }
}
