import { RoomCategoryService } from "./../room-category.service";
import { MvRoomCategory } from "./../room-category-model";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-new-room-category",
  templateUrl: "./new-room-category.component.html",
  styleUrls: ["./new-room-category.component.css"]
})
export class NewRoomCategoryComponent implements OnInit {
  room_category: string;
  number_of_room: number;
  room_price: number;
  category: MvRoomCategory = {} as MvRoomCategory;

  constructor(
    private roomCategoryService: RoomCategoryService,
    private dialogRef: MatDialogRef<NewRoomCategoryComponent>
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.category.room_category = this.room_category;
    this.category.number_of_room = this.number_of_room;
    this.category.room_price = this.room_price;
    this.roomCategoryService.addRoomCategory(this.category).subscribe(data => {
      this.dialogRef.close(this.category);
    });
  }
}
