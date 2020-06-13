import { RoomCategoryService } from "./../room-category.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MvRoomCategory } from "../room-category-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-edit-room-category",
  templateUrl: "./edit-room-category.component.html",
  styleUrls: ["./edit-room-category.component.scss"]
})
export class EditRoomCategoryComponent implements OnInit {
  category: MvRoomCategory = {} as MvRoomCategory;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomCategoryService: RoomCategoryService,
    private dialogRef: MatDialogRef<EditRoomCategoryComponent>
  ) { }

  ngOnInit() {
    this.roomCategoryService.getRoomCategory().subscribe(result => {
      // console.log(result.data[this.data]);
      this.category = result.data[this.data];
    });
  }

  onSubmit() {
    this.roomCategoryService
      .editRoomCategory(this.category)
      .subscribe(data => { });
    this.dialogRef.close(this.category);
    // this.forObject.hotel
    // }
  }
}
