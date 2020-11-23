import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly baseURL = environment.apiURL

  constructor(private http: HttpClient) {}

  getActiveBooking(): Observable<any> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
    const options = { headers: httpHeaders }
    return this.http.get(this.baseURL + 'activeBooking', options)
  }
}
