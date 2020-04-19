import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class UserAuthService {

  private readonly baseURL = environment.apiURL;

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
