import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly baseURL = environment.apiURL + 'user';
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.baseURL, user);
  }

  editUser(user: any): Observable<any> {
    return this.http.put(this.baseURL + "/" + user.id, user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
