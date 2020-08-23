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

  getMainFood(): Observable<any> {
    return this.http.get(environment.apiURL + 'mainFood');
  }

  getSubFood(): Observable<any> {
    return this.http.get(environment.apiURL + 'subFood');
  }

  getSubFoodAndFoodItemsById(id): Observable<any> {
    return this.http.post(environment.apiURL + 'subFoodById', id);
  }

  getFoodHeader(): Observable<any> {
    return this.http.get(environment.apiURL + 'foodHeader');
  }

  addFood(food: any): Observable<any> {
    return this.http.post(this.baseURL, food);
  }

  addMainFood(food: any): Observable<any> {
    return this.http.post(`${environment.apiURL}mainFood`, food);
  }

  addSubFood(food: any): Observable<any> {
    return this.http.post(`${environment.apiURL}subFood`, food);
  }

  addFoodHeader(food: any): Observable<any> {
    return this.http.post(`${environment.apiURL}foodHeader`, food);
  }

  editFood(food: any): Observable<any> {
    return this.http.put(this.baseURL + "/" + food.id, food);
  }

  editMainFood(food: any): Observable<any> {
    return this.http.put(`${environment.apiURL}mainFood/${food.id}`, food);
  }

  editSubFood(food: any): Observable<any> {
    return this.http.put(`${environment.apiURL}subFood/${food.id}`, food);
  }

  editFoodHeader(food: any): Observable<any> {
    return this.http.put(`${environment.apiURL}foodHeader/${food.id}`, food);
  }

  deleteFood(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
