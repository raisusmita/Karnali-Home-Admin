import { RoomCategoryService } from "./../room-category.service";
import { MvRoomCategory } from "./../room-category-model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: "app-new-room-category",
  templateUrl: "./new-room-category.component.html",
  styleUrls: ["./new-room-category.component.scss"]
})
export class NewRoomCategoryComponent implements OnInit {
  category: MvRoomCategory = {} as MvRoomCategory;
  isEdit = false;

  selectedImageFile: ImageSnippet;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private dialogRef: MatDialogRef<NewRoomCategoryComponent>
  ) { }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.category = this.data;
      this.category.image = null;
    }
  }

  onSelectedFiles(imageFile: any) {
    const file: File = imageFile.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedImageFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);   // this line triggers addEventListener (from readAsDataURL documentation)
  }

  onSubmit() {
    if (this.selectedImageFile) {
      this.category.image = this.selectedImageFile.file;
    }
    if (this.isEdit) {
      if (!this.category.image) {
        delete this.category.image;
      }
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
