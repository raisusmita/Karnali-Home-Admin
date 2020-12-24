import { MvUser } from './user-model'
import { Component, OnInit, Inject } from '@angular/core'
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { Router } from '@angular/router'
import { UserAuthService } from '../user-auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: MvUser = {} as MvUser

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitLogin() {
    this.userAuthService.loginUser(this.user).subscribe(
      (userData) => {
        if (userData.token) {
          this.userAuthService.setLocalStorage(
            userData.data,
            userData.token.token
          )
          this.router.navigate(['/dashboard'])
        } else {
          this.userAuthService.clearLocalStorage()
        }
      },
      (error) => {
        this.userAuthService.clearLocalStorage()
      }
    )
  }
}
