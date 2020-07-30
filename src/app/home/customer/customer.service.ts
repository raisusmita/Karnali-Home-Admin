import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private readonly baseURL = environment.apiURL + 'customer';

  constructor(private http: HttpClient) { }

  getCustomer(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  addCustomer(customer: any): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', customer.first_name);
    if (customer.middle_name) {
      formData.append('middle_name', customer.middle_name);
    }
    formData.append('last_name', customer.last_name);
    if (customer.email) {
      formData.append('email', customer.email);
    }
    formData.append('phone', customer.phone);
    formData.append('country', customer.country);
    formData.append('address', customer.address);
    formData.append('date_of_birth', customer.date_of_birth);
    formData.append('profession', customer.profession);
    formData.append('identity_type', customer.identity_type);
    formData.append('identity_number', customer.identity_number);
    formData.append('identity_image_first', customer.identity_image_first);
    formData.append('identity_image_second', customer.identity_image_second);
    return this.http.post(this.baseURL, formData);
  }

  editCustomer(customer: any): Observable<any> {
    const formData = new FormData();
    formData.append('id', customer.id);
    formData.append('first_name', customer.first_name);
    if (customer.middle_name) {
      formData.append('middle_name', customer.middle_name);
    }
    formData.append('last_name', customer.last_name);
    if (customer.email) {
      formData.append('email', customer.email);
    }
    formData.append('phone', customer.phone);
    formData.append('country', customer.country);
    formData.append('address', customer.address);
    formData.append('date_of_birth', customer.date_of_birth);
    formData.append('profession', customer.profession);
    formData.append('identity_type', customer.identity_type);
    formData.append('identity_number', customer.identity_number);
    if (customer.identity_image_first) {
      formData.append('identity_image_first', customer.identity_image_first);
      formData.append('identity_image_second', customer.identity_image_second);
    }
    return this.http.post(environment.apiURL + "editCustomer", formData);
  }

  deleteCustomer(id: any): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }
}
