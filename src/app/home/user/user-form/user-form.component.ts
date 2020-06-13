import { Component, OnInit, Inject } from "@angular/core";
import { MvUser } from "src/app/home/customer/customer-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/home/user/user.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
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
        this.user = this.data;
      }
    });
  }
  submitUserForm() {
    if (this.isEdit) {
      this.userService.editUser(this.user).subscribe(() => {
        this.dialogRef.close(this.user);
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.dialogRef.close(this.user);
      });
    }
  }
}
