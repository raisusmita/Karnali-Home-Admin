import { Component, OnInit, Inject } from "@angular/core";
import { MvFoodHeader } from "../food-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FoodService } from "../food.service";

@Component({
  selector: "app-food-header-form",
  templateUrl: "./food-header-form.component.html",
  styleUrls: ["./food-header-form.component.scss"],
})
export class FoodHeaderFormComponent implements OnInit {
  food: MvFoodHeader = {} as MvFoodHeader;
  isEdit = false;
  foodHeader = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<FoodHeaderFormComponent>
  ) {
    if (data) {
      this.isEdit = true;
      this.food = data;
    }
  }

  ngOnInit() {
    // this.getFood();
    // this.getfoodHeader();
  }

  // getFood() {
  //   this.foodService.getFood().subscribe((data) => {
  //     if (this.data) {
  //       this.food = this.data;
  //     }
  //   });
  // }

  // getfoodHeader() {
  //   this.foodService.getFoodHeader().subscribe((data) => {
  //     this.foodHeader = data.data;
  //   });
  // }

  submitFoodForm() {
    if (this.isEdit) {
      this.foodService.editFoodHeader(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    } else {
      this.foodService.addFoodHeader(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    }
  }

}


