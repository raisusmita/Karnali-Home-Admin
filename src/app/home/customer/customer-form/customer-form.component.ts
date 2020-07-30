import { Component, OnInit, Inject } from "@angular/core";
import { MvCustomer } from "../customer-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../customer.service";
import { ToastrService } from 'ngx-toastr';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})

export class CustomerFormComponent implements OnInit {

  selectedFirstImage: ImageSnippet;
  selectedSecondImage: ImageSnippet;

  otherValidation = false;

  customer: MvCustomer = {} as MvCustomer;
  identityType = {
    Passport: "passport",
    Citizenship: "citizenship",
    Lisence: "liscence",
    IdCard: "id_card"
  }
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) { }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(() => {
      if (this.data) {
        this.isEdit = true;
        this.customer = this.data;
        this.otherValidation = true;
      }
    });
  }

  onSelectedFiles(imageFile: any) {
    const fileFirst: File = imageFile.files[0];
    const fileSecond: File = imageFile.files[1];

    if (imageFile.files && imageFile.files.length == 2) {
      const reader = new FileReader();
      reader.addEventListener("load", (event: any) => {
        this.selectedFirstImage = new ImageSnippet(event.target.result, fileFirst);
        this.selectedSecondImage = new ImageSnippet(event.target.result, fileSecond);
      });
      reader.readAsDataURL(fileFirst); // this line triggers addEventListener (from readAsDataURL documentation)
      this.otherValidation = true;
    } else {
      this.toastr.error(
        "Please select two images.",
        "Warning!",
        {
          closeButton: true,
          positionClass: "toast-top-right",
          disableTimeOut: true,
        }
      );
      this.otherValidation = false;
    }
  }

  submitCustomerForm() {
    if (this.selectedFirstImage) {
      this.customer.identity_image_first = this.selectedFirstImage.file;
      this.customer.identity_image_second = this.selectedSecondImage.file;
    }
    if (this.isEdit) {
      if (!this.selectedFirstImage) {
        this.customer.identity_image_first = null;
        this.customer.identity_image_second = null;
      }
      this.customerService.editCustomer(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    } else {
      this.customerService.addCustomer(this.customer).subscribe(() => {
        this.dialogRef.close(this.customer);
      });
    }
  }

  orderMaintain = (): number => 0;
}


