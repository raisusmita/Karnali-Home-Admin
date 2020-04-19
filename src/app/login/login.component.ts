import { MvUser } from "./user-model";
import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router } from "@angular/router";
import { UserAuthService } from "../user-auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: MvUser = {} as MvUser;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  submitLogin() {
    this.userAuthService.loginUser(this.user).subscribe(e => {
      if (e.token) {
        localStorage.setItem('token', e.token.token);
        this.router.navigate(['/home']);
      } else {
        localStorage.setItem('token', '');
      }
    },
      error => {
        localStorage.setItem('token', '');
      }
    );
  }
}
