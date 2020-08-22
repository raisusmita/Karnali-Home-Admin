import { Component, OnInit, Inject } from "@angular/core";
import { MvFood, MvSubFood } from "../food-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FoodService } from "../food.service";

@Component({
  selector: "app-sub-food-form",
  templateUrl: "./sub-food-form.component.html",
  styleUrls: ["./sub-food-form.component.scss"],
})
export class SubFoodFormComponent implements OnInit {
  food: MvSubFood = {} as MvSubFood;
  isEdit = false;

  mainFood = [];
  subFood = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<SubFoodFormComponent>
  ) {
    if (data) {
      this.food = data;
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.getMainFood();
    this.getSubFood();
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((data) => {
      this.mainFood = data.data;
    });
  }

  getSubFood() {
    this.foodService.getSubFood().subscribe((data) => {
      this.subFood = data.data;
    });
  }

  submitFoodForm() {
    if (this.isEdit) {
      this.foodService.editSubFood(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    } else {
      this.foodService.addSubFood(this.food).subscribe((e) => {
        this.dialogRef.close(this.food);
      });
    }
  }

}


