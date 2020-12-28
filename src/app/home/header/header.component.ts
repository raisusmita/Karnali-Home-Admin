import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserRoleManagementService } from 'src/app/shared/services/user-role-service/user-role-management.service'
import { UserAuthService } from 'src/app/user-auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedPath = ''
  userName = ''

  components: any[] = [
    { name: 'Dashboard', path: '', icon: 'dashboard' },
    { name: 'Room Category', path: 'room-category', icon: 'category' },
    { name: 'Room', path: 'room', icon: 'meeting_room' },
    { name: 'Customer', path: 'customer', icon: 'perm_identity' },
    { name: 'Booking', path: 'booking', icon: 'book' },
    { name: 'Reservation', path: 'reservation', icon: 'check_circle' },
    // {
    //   name: "Room Availability",
    //   path: "room-availability",
    //   icon: "event_available",
    // },
    { name: 'Food', path: 'food', icon: 'fastfood' },
    { name: 'Bar', path: 'bar', icon: 'local_bar' },
    { name: 'Table', path: 'table', icon: 'weekend' },
    { name: 'Food Order', path: 'food-order', icon: 'alarm' },

    {
      name: 'Food Order Details',
      path: 'food-order-detail',
      icon: 'room_service'
    },
    {
      name: 'Transaction',
      path: 'room-transaction',
      icon: 'description'
    },
    // { name: 'Invoice', path: 'invoice', icon: 'payment' },
    { name: 'User', path: 'user', icon: 'group' }
  ]

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private userRoleManagement: UserRoleManagementService
  ) {
    this.selectedPath = router.url.split('/')[1]
  }

  ngOnInit() {
    const user = localStorage.getItem('userRole')
    this.userName = localStorage.getItem('userName')

    if (this.userRoleManagement.userVisibleRoutes[user]) {
      this.components = this.components.filter((com) =>
        this.userRoleManagement.userVisibleRoutes[user].includes(com.path)
      )
    }
  }

  logout() {
    this.userAuthService.clearLocalStorage()
    this.router.navigate(['/login'])
  }

  selectButton(path) {
    this.selectedPath = path
  }
}
