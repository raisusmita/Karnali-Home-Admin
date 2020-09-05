import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TableService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = environment.apiURL + "tables";

  getTable(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  getTableList(params): Observable<any> {
    return this.http.post(environment.apiURL + "tableList", params);
  }

  addTable(table: any): Observable<any> {
    return this.http.post(this.baseURL, table);
  }

  editTable(table: any): Observable<any> {
    console.log(table.id);
    return this.http.put(this.baseURL + "/" + table.id, table);
  }

  deleteTable(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
