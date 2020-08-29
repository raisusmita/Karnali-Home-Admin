import { NgBlockUI } from "ng-block-ui";
import { RoomCategoryService } from "../room-category.service";
import { MvRoomCategory } from "../room-category-model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BlockUI } from "ng-block-ui";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-room-category-form",
  templateUrl: "./room-category-form.component.html",
  styleUrls: ["./room-category-form.component.scss"],
})
export class RoomCategoryFormComponent implements OnInit {
  category: MvRoomCategory = {} as MvRoomCategory;
  isEdit = false;
  addForm: boolean;
  editForm: boolean;

  selectedImageFile: ImageSnippet;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private dialogRef: MatDialogRef<RoomCategoryFormComponent>
  ) {}

  ngOnInit() {
    if (this.data.formType == "Add") {
      this.addForm = true;
    } else {
      this.editForm = true;
      this.isEdit = true;
      this.category = this.data.gridData;
      this.category.image = null;
    }
  }

  onSelectedFiles(imageFile: any) {
    const file: File = imageFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedImageFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file); // this line triggers addEventListener (from readAsDataURL documentation)
  }

  onSubmit() {
    if (this.selectedImageFile) {
      this.category.image = this.selectedImageFile.file;
    }
    if (this.isEdit) {
      if (!this.category.image) {
        delete this.category.image;
      }
      this.blockUI.start("Loading...");
      this.roomCategoryService
        .editRoomCategory(this.category)
        .subscribe((data) => {
          this.blockUI.stop();
          this.dialogRef.close(this.category);
        });
    } else {
      this.blockUI.start("Loading...");
      this.roomCategoryService
        .addRoomCategory(this.category)
        .subscribe((data) => {
          this.blockUI.stop();
          this.dialogRef.close(this.category);
        });
    }
  }
}
