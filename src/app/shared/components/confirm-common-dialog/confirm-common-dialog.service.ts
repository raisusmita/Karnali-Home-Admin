import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ConfirmCommonDialogService {
  discount: number
  service_tax: number
  callFrom: string

  constructor() {}
}
