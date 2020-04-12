import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  private isUserValid: boolean;
  private username;

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
}
