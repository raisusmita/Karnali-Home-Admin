import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor() {}

  public getToken(): string {
    return localStorage.getItem('token')
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()
    if (token) {
      return true
    }
    return false
  }
}
