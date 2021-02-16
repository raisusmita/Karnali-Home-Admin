import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly baseURL = environment.apiURL
  constructor(private http: HttpClient) {}

  getAvailableRoomCount(): Observable<any> {
    return this.http.get(this.baseURL + 'availableRoomCount')
  }

  getCurrentRevenue(): Observable<any> {
    return this.http.get(this.baseURL + 'revenue')
  }
}
