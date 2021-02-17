import { UserService } from 'src/app/home/user/user.service'
import { Component, OnInit } from '@angular/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  users: any[]
  @BlockUI() blockUI: NgBlockUI
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.getUser()
  }

  getUser() {
    this.blockUI.start('Loading...')
    this.userService.getUser().subscribe(
      (result) => {
        if (result && result.data) {
          this.users = result.data

          this.blockUI.stop()
        } else {
          this.blockUI.stop()
        }
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }
}
