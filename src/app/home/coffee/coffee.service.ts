import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private readonly baseURL = environment.apiURL + 'coffee'

  constructor(private http: HttpClient) {}

  getCoffee(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getMainCoffee(): Observable<any> {
    return this.http.get(environment.apiURL + 'mainCoffee')
  }

  getCoffeeList(coffeeParams): Observable<any> {
    return this.http.post(environment.apiURL + 'coffeeItemList', coffeeParams)
  }

  getCoffeeItemsById(id): Observable<any> {
    return this.http.post(environment.apiURL + 'coffeeItemById', id)
  }

  getMainCoffeeList(coffeeParams): Observable<any> {
    return this.http.post(environment.apiURL + 'mainCoffeeList', coffeeParams)
  }

  addCoffee(coffee: any): Observable<any> {
    return this.http.post(this.baseURL, coffee)
  }

  addMainCoffee(coffee: any): Observable<any> {
    return this.http.post(`${environment.apiURL}mainCoffee`, coffee)
  }

  editCoffee(coffee: any): Observable<any> {
    return this.http.put(this.baseURL + '/' + coffee.id, coffee)
  }

  editMainCoffee(coffee: any): Observable<any> {
    return this.http.put(`${environment.apiURL}mainCoffee/${coffee.id}`, coffee)
  }

  deleteCoffee(id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id)
  }
}
