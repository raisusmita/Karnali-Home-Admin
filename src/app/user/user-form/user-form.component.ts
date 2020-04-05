import { Component, OnInit, Inject } from '@angular/core';
import { MvUser } from 'src/app/customer/customer-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  user: MvUser = {} as MvUser;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(() => {
      if (this.data) {
        this.isEdit = true;
        this.customer = this.data;
      }
    });
  }
  submitUserForm() {
    if (this.isEdit) {
      this.userService.editUser(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    } else {
      this.userService.addUser(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    }
  }



}
