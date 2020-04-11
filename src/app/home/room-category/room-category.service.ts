import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoomCategoryService {
  constructor(private http: HttpClient) { }

  private readonly baseURL = "http://localhost:8000/api/room_categories";

  getRoomCategory(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  addRoomCategory(roomCategory: any): Observable<any> {
    const formData = new FormData();
    formData.append('room_category', roomCategory.room_category);
    formData.append('room_type', roomCategory.room_type);
    formData.append('room_price', roomCategory.room_price);
    formData.append('number_of_rooms', roomCategory.number_of_rooms);
    formData.append('image', roomCategory.image);
    return this.http.post(this.baseURL, formData);
  }

  editRoomCategory(roomCategory: any): Observable<any> {
    // Except image other fields are updatable

    // This code allows passing image
    // const formData = new FormData();
    // formData.append('room_category', roomCategory.room_category);
    // formData.append('room_type', roomCategory.room_type);
    // formData.append('room_price', roomCategory.room_price);
    // formData.append('number_of_rooms', roomCategory.number_of_rooms);
    // formData.append('image', roomCategory.image);
    return this.http.put(
      this.baseURL + "/" + roomCategory.id,
      roomCategory
    );
  }

  deleteRoomCategory(id: any): Observable<any> {
    const httpParams = new HttpParams().set("id", id);
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id, options);
  }
}
