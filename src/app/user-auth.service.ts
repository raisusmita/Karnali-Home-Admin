import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class UserAuthService {

  private readonly baseURL = "http://localhost:8000/api/";

  constructor(private http: HttpClient) {
  }

  getUserValidity() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(this.baseURL + "login", user);
  }
}
