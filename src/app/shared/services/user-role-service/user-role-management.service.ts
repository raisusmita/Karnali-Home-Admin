import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserRoleManagementService {
  public userVisibleRoutes = {
    admin: [
      '',
      'room-category',
      'room',
      'customer',
      'booking',
      'reservation',
      'food',
      'bar',
      'table',
      'food-order',
      'food-order-detail',
      'room-transaction',
      'invoice',
      'user'
    ],
    owner: [
      '',
      'room-category',
      'room',
      'customer',
      'booking',
      'reservation',
      'food',
      'bar',
      'table',
      'food-order',
      'food-order-detail',
      'room-transaction',
      'invoice',
      'user'
    ],
    manager: [
      '',
      'room-category',
      'room',
      'customer',
      'booking',
      'reservation',
      'food',
      'bar',
      'table',
      'food-order',
      'food-order-detail',
      'room-transaction',
      'invoice',
      'user'
    ],
    operator: [
      '',
      'room-category',
      'room',
      'customer',
      'booking',
      'reservation',
      'food',
      'bar',
      'table',
      'food-order',
      'food-order-detail',
      'room-transaction',
      'invoice'
    ],
    chef: ['', 'food', 'bar', 'table', 'food-order', 'food-order-detail'],
    waiter: [
      '',
      'room-category',
      'room',
      'customer',
      'booking',
      'reservation',
      'food',
      'bar',
      'table',
      'food-order',
      'food-order-detail'
      // 'room-transaction',
      // 'invoice'
    ]
  }

  constructor() {}
}
