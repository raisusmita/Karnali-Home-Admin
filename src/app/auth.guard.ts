import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot
} from '@angular/router'
import { AuthTokenService } from './shared/services/auth-token-service/auth-token.service'
import { UserRoleManagementService } from './shared/services/user-role-service/user-role-management.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  userRole = ''
  constructor(
    private authToken: AuthTokenService,
    private router: Router,
    private userRoleManagement: UserRoleManagementService
  ) {
    this.userRole = localStorage.getItem('userRole')
  }

  canActivate(): boolean {
    if (this.authToken.isAuthenticated()) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    this.userRole = localStorage.getItem('userRole')
    if (this.authToken.isAuthenticated()) {
      if (
        this.userRoleManagement.userVisibleRoutes[this.userRole] &&
        this.userRoleManagement.userVisibleRoutes[this.userRole].includes(
          route['routeConfig']['path']
        )
      ) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
