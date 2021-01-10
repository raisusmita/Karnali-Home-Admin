import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserRoleManagementService {
  public allRoutes = {
    Dashboard: '',
    RoomCategory: 'room-category',
    Room: 'room',
    Customer: 'customer',
    Booking: 'booking',
    Reservation: 'reservation',
    Food: 'food',
    Bar: 'bar',
    Table: 'table',
    FoodOrder: 'food-order',
    FoodOrderDetail: 'food-order-detail',
    RoomTransaction: 'room-transaction',
    Invoice: 'invoice',
    User: 'user'
  }

  public userActionEnum = {
    Delete: 'delete',
    Edit: 'edit'
  }

  public userVisibleRoutes = {
    admin: [...Object.values(this.allRoutes)],
    owner: [...Object.values(this.allRoutes)],
    manager: [...Object.values(this.allRoutes)],
    operator: [
      '',
      'customer',
      'booking',
      'reservation',
      'food-order',
      'food-order-detail',
      'room-transaction',
      'invoice'
    ],
    chef: ['', 'food-order-detail'],
    waiter: ['', 'food-order', 'food-order-detail']
  }

  public userPermissions = {
    waiter: {
      'food-order': { delete: true, edit: true },
      'food-order-detail': { delete: true, edit: true }
    },
    chef: { 'food-order-detail': { delete: true, edit: true } },
    operator: {
      customer: { delete: true, edit: true },
      booking: { delete: true, edit: true },
      reservation: { delete: true, edit: true },
      'food-order': { delete: true, edit: true },
      'food-order-detail': { delete: false, edit: true },
      'room-transaction': { delete: true, edit: true },
      invoice: { delete: true, edit: true }
    }
  }

  constructor() {}

  public getUserActionPermission(currentPage: string, action: string): boolean {
    const userRole = localStorage.getItem('userRole')
    const allPermissionUsers = ['admin', 'manager', 'owner']
    if (allPermissionUsers.includes(userRole)) {
      return true
    } else if (
      this.userPermissions[userRole] &&
      this.userPermissions[userRole][currentPage] &&
      this.userPermissions[userRole][currentPage][action]
    ) {
      return this.userPermissions[userRole][currentPage][action]
    }
    return false
  }

  public isEditExists(page: string): boolean {
    return this.getUserActionPermission(page, this.userActionEnum.Edit)
  }

  public isDeleteExists(page: string): boolean {
    return this.getUserActionPermission(page, this.userActionEnum.Delete)
  }

  public isActionExists(page: string): boolean {
    if (
      this.getUserActionPermission(page, this.userActionEnum.Delete) ||
      this.getUserActionPermission(page, this.userActionEnum.Edit)
    ) {
      return true
    }
    return false
  }
}

export interface UserActionPermission {
  Edit: boolean
  Delete: boolean
}
