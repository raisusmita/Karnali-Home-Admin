import { Component, OnInit, Inject } from '@angular/core'
import { MvUser } from 'src/app/home/customer/customer-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { UserService } from 'src/app/home/user/user.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: MvUser = {} as MvUser
  isEdit = false

  roleList = {
    owner: 'Owner',
    manager: 'Manager',
    operator: 'Operator',
    chef: 'Chef',
    waiter: 'Waiter',
    reception: 'Reception'
  }

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      if (this.data) {
        this.isEdit = true
        this.user = this.data
      }
    })
  }
  submitUserForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.userService.editUser(this.user).subscribe(
        () => {
          this.toastr.success('user data is updated', 'Success!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          })
          this.dialogRef.close(this.user)
          this.blockUI.stop()
        },
        (err) => {
          const msg = Object.keys(err.error.errors)[0]
            ? Object.values(err.error.errors)[0][0]
            : 'Invalid Data'
          this.toastr.error(msg, 'Error!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          })
          this.blockUI.stop()
        }
      )
    } else {
      this.userService.addUser(this.user).subscribe(
        () => {
          this.dialogRef.close(this.user)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    }
  }
}
