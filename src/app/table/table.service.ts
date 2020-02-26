import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TableService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = "http://localhost:8000/api/tables";

  getTable(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.get(this.baseURL, options);
  }

  addTable(table: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.post(this.baseURL, table, options);
  }

  editTable(table: any): Observable<any> {
    console.log(table.id);
    const httpHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );
    const options = { headers: httpHeaders };
    return this.http.put(this.baseURL + "/" + table.id, table, options);
  }

  deleteTable(id: any): Observable<any> {
    const httpParams = new HttpParams();
    const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id, options);
  }
}
