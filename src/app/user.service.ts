import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isUserValid: boolean;
  private username;

  constructor() {
    this.isUserValid = false;
  }

  setUserValid() {
    const getObj = JSON.parse(localStorage.getItem("user"));
    if (getObj.username == "admin@gmail.com") {
      this.isUserValid = true;
    }
  }

  getUserValid() {
    return this.isUserValid;
  }
}
