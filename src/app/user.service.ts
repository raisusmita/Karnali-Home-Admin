import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isUserValid: boolean;
  private username;

  private readonly baseURL = "http://localhost:8000/api/user";


  constructor(private http: HttpClient) {
    this.isUserValid = false;
  }

  setUserValid() {
    const getObj = JSON.parse(localStorage.getItem("user"));
    if (getObj.username === "admin@gmail.com" && getObj.password === "admin") {
      this.isUserValid = true;
    }
  }

  getUserValid() {
    return this.isUserValid;
  }


  getUser(): Observable<any> {
    // const httpHeaders = new HttpHeaders().set(
    //   "Content-Type",
    //   "application/json"
    // );
    // const options = { headers: httpHeaders };
    return this.http.get(this.baseURL);
  }

  addUser(user: any): Observable<any> {
    // const httpHeaders = new HttpHeaders().set(
    //   "Content-Type",
    //   "application/json"
    // );
    // const options = { headers: httpHeaders };
    return this.http.post(this.baseURL, user);
  }

  editUser(user: any): Observable<any> {
    // const httpHeaders = new HttpHeaders().set(
    //   "Content-Type",
    //   "application/json"
    // );
    // const options = { headers: httpHeaders };
    return this.http.put(this.baseURL + "/" + user.id, user);
  }

  deleteUser(id: any): Observable<any> {
    // const httpParams = new HttpParams();
    // const options = { params: httpParams };
    return this.http.delete(this.baseURL + "/" + id);
  }



}
