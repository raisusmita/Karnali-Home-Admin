import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class FoodService {
  private readonly baseURL = environment.apiURL + 'food';

  constructor(private http: HttpClient) { }

  getFood(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  addFood(food: any): Observable<any> {
    return this.http.post(this.baseURL, food);
  }

  editFood(food: any): Observable<any> {
    return this.http.put(this.baseURL + "/" + food.id, food);
  }

  deleteFood(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
