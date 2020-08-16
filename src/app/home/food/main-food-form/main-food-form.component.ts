import { Component, OnInit, Inject } from "@angular/core";
import { MvFood, MvMainFood } from "../food-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FoodService } from "../food.service";

@Component({
  selector: "app-main-food-form",
  templateUrl: "./main-food-form.component.html",
  styleUrls: ["./main-food-form.component.scss"],
})
export class MainFoodFormComponent implements OnInit {
  food: MvMainFood = {} as MvMainFood;
  isEdit = false;
  mainFood = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<MainFoodFormComponent>
  ) {
    if (data) {
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.getFood();
    this.getMainFood();
  }

  getFood() {
    this.foodService.getFood().subscribe((data) => {
      if (this.data) {
        this.food = this.data;
      }
    });
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((data) => {
      this.mainFood = data.data;
    });
  }

  submitFoodForm() {
    if (this.isEdit) {
      this.foodService.editMainFood(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    } else {
      this.foodService.addMainFood(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    }
  }

}


