import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { CustomerService } from '../customer/customer.service';
// import { CustomerFormComponent } from '../customer/customer-form/customer-form.component';
import { ConfirmDeleteComponent } from '../shared/confirm-delete/confirm-delete.component';
import { UserService } from '../user.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = [
    "name",
    "email",
    "role",
    "action"
  ];
  dataSource: any[];

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      this.dataSource = data.data;
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "50%",
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
      }
    });
  }
  editUser(userEditData) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "50%",
      data: userEditData
    });
  }

  deleteUser(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.deleteUser(index).subscribe(data => {
          this.getUser();
        });
      }
    });
  }

}
