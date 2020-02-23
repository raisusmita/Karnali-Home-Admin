import { RoomCategoryService } from "./../room-category.service";
import { MvRoomCategory } from "./../room-category-model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-new-room-category",
  templateUrl: "./new-room-category.component.html",
  styleUrls: ["./new-room-category.component.css"]
})
export class NewRoomCategoryComponent implements OnInit {
  category: MvRoomCategory = {} as MvRoomCategory;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private dialogRef: MatDialogRef<NewRoomCategoryComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.category = this.data;
      this.category.image = null;
    }
  }

  onSelectedFiles(imageFile) {
    console.log(imageFile.files);
  }

  onSubmit() {
    if (this.isEdit) {
      if (!this.category.image) {
        delete this.category.image;
      }
      console.log(this.category);
      this.roomCategoryService
        .editRoomCategory(this.category)
        .subscribe(data => {
          this.dialogRef.close(this.category);
        });
    } else {
      this.roomCategoryService
        .addRoomCategory(this.category)
        .subscribe(data => {
          this.dialogRef.close(this.category);
        });
    }
  }
}
