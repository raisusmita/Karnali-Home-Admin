import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class RoomCategoryService {
  constructor(private http: HttpClient) { }

  private readonly baseURL = environment.apiURL + 'room_categories';

  getRoomCategory(): Observable<any> {
    return this.http.get(this.baseURL);
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
    // Image has to be passed from form data. Need to fix issue on image put

    const formData = new FormData();
    formData.append('room_category', roomCategory.room_category);
    formData.append('room_type', roomCategory.room_type);
    formData.append('room_price', roomCategory.room_price);
    formData.append('number_of_rooms', roomCategory.number_of_rooms);
    formData.append('image', roomCategory.image);
    return this.http.put(
      this.baseURL + "/" + roomCategory.id,
      roomCategory
    );
  }

  deleteRoomCategory(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
