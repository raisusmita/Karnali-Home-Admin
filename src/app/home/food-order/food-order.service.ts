import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = environment.apiURL + 'foodOrder'

  addFoodOrder(food: any): Observable<any> {
    return this.http.post(this.baseURL, food)
  }

  getFoodOrder(foodParams: any): Observable<any> {
    return this.http.get(this.baseURL, foodParams)
  }

  editFoodOrder(id: number, foodOrderItems: any): Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, foodOrderItems)
  }

  cancelFoodOrder(id: any): Observable<any> {
    return this.http.delete(this.baseURL + `/${id}`)
  }
}
