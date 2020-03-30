import { UserService } from "./../user.service";
import { MvUser } from "./user-model";
import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: MvUser = {} as MvUser;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitLogin() {
    this.saveInLocal(this.user);
    this.userService.setUserValid();
    if (this.user) {
      this.router.navigate(["/home"]);
    }
  }

  saveInLocal(user): void {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
