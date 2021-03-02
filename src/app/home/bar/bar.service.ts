import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private readonly baseURL = environment.apiURL + 'bar'

  constructor(private http: HttpClient) {}

  getBar(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getMainBar(): Observable<any> {
    return this.http.get(environment.apiURL + 'mainBar')
  }

  getBarName(): Observable<any> {
    return this.http.get(environment.apiURL + 'barName')
  }

  getBarList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + 'barItemList', barParams)
  }

  getMainBarList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + 'mainBarList', barParams)
  }

  getBarNameList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + 'barNameList', barParams)
  }

  getBarItemsById(id): Observable<any> {
    return this.http.post(environment.apiURL + 'barItemById', id)
  }

  addBar(bar: any): Observable<any> {
    return this.http.post(this.baseURL, bar)
  }

  addMainBar(bar: any): Observable<any> {
    return this.http.post(`${environment.apiURL}mainBar`, bar)
  }

  addBarName(bar: any): Observable<any> {
    return this.http.post(`${environment.apiURL}barName`, bar)
  }

  editBar(bar: any): Observable<any> {
    return this.http.put(this.baseURL + '/' + bar.id, bar)
  }

  editMainBar(bar: any): Observable<any> {
    return this.http.put(`${environment.apiURL}mainBar/${bar.id}`, bar)
  }

  editBarName(bar: any): Observable<any> {
    return this.http.put(`${environment.apiURL}barName/${bar.id}`, bar)
  }

  deleteBar(id: any): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id)
  }
}
