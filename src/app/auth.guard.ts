import { Injectable } from "@angular/core";
import { CanActivate, Router, CanActivateChild } from "@angular/router";
import { AuthTokenService } from "./shared/services/auth-token-service/auth-token.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authToken: AuthTokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.authToken.isAuthenticated()) {
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(): boolean {
    if (this.authToken.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
