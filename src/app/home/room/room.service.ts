import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}
  private readonly baseURL = environment.apiURL + 'rooms'
  getRoom(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getRoomList(roomParams: any): Observable<any> {
    return this.http.post(environment.apiURL + 'roomList', roomParams)
  }

  getRoomByCategory(category: any): Observable<any> {
    return this.http.post(environment.apiURL + 'room_category/room', category)
  }

  addRoom(room: any): Observable<any> {
    return this.http.post(this.baseURL, room)
  }

  editRoom(room: any): Observable<any> {
    return this.http.put(this.baseURL + '/' + room.id, room)
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id)
  }
}
