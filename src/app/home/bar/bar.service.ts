import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BarService {
  private readonly baseURL = environment.apiURL + "bar";

  constructor(private http: HttpClient) {}

  getBar(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  getMainBar(): Observable<any> {
    return this.http.get(environment.apiURL + "mainBar");
  }

  getSubBar(): Observable<any> {
    return this.http.get(environment.apiURL + "subBar");
  }

  getBarList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + "barItemList", barParams);
  }

  getMainBarList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + "mainBarList", barParams);
  }

  getSubBarList(barParams): Observable<any> {
    return this.http.post(environment.apiURL + "subBarList", barParams);
  }

  addBar(bar: any): Observable<any> {
    return this.http.post(this.baseURL, bar);
  }

  addMainBar(bar: any): Observable<any> {
    return this.http.post(`${environment.apiURL}mainBar`, bar);
  }

  addSubBar(bar: any): Observable<any> {
    return this.http.post(`${environment.apiURL}subBar`, bar);
  }

  editBar(bar: any): Observable<any> {
    return this.http.put(this.baseURL + "/" + bar.id, bar);
  }

  editMainBar(bar: any): Observable<any> {
    return this.http.put(`${environment.apiURL}mainBar/${bar.id}`, bar);
  }

  editSubBar(bar: any): Observable<any> {
    return this.http.put(`${environment.apiURL}subBar/${bar.id}`, bar);
  }

  deleteBar(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
