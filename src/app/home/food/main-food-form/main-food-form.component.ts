import { Component, OnInit, Inject } from "@angular/core";
import { MvFood, MvMainFood } from "../food-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FoodService } from "../food.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-main-food-form",
  templateUrl: "./main-food-form.component.html",
  styleUrls: ["./main-food-form.component.scss"],
})
export class MainFoodFormComponent implements OnInit {
  food: MvMainFood = {} as MvMainFood;
  isEdit = false;
  mainFood = [];
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<MainFoodFormComponent>
  ) {
    if (data.gridData) {
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.getFood();
    this.getMainFood();
  }

  getFood() {
    this.foodService.getFood().subscribe((data) => {
      if (this.data.gridData) {
        this.food = this.data.gridData;
      }
    });
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((data) => {
      this.mainFood = data.data;
    });
  }

  submitFoodForm() {
    this.blockUI.start("Loading...");
    if (this.isEdit) {
      this.foodService.editMainFood(this.food).subscribe(
        (e) => {
          this.blockUI.stop();

          this.dialogRef.close(this.food);
        },
        (error) => {
          this.blockUI.stop();
        }
      );
    } else {
      this.foodService.addMainFood(this.food).subscribe(
        (e) => {
          this.blockUI.stop();

          this.dialogRef.close(this.food);
        },
        (error) => {
          this.blockUI.stop();
        }
      );
    }
  }
}
