import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  private readonly baseURL = "http://localhost:8000/api/food";

  constructor(private http: HttpClient) {}

  getFood(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  addFood(food: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    console.log(food);
    return this.http.post(this.baseURL, food, options);
  }

  editFood(food: any): Observable<any> {
    console.log(food.id);
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(this.baseURL + "/" + food.id, food, options);
  }

  deleteFood(id: any): Observable<any> {
    const httpParams = new HttpParams();
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id, options);
  }
}
