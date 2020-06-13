import { Component, OnInit, Inject } from "@angular/core";
import { MvFood } from "../food-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FoodService } from "../food.service";

@Component({
  selector: "app-food-form",
  templateUrl: "./food-form.component.html",
  styleUrls: ["./food-form.component.scss"]
})
export class FoodFormComponent implements OnInit {
  food: MvFood = {} as MvFood;
  foodType = {
    Kitchen: "kitchen",
    Bar: "bar"
  };
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<FoodFormComponent>
  ) { }

  ngOnInit() {
    this.foodService.getFood().subscribe(data => {
      if (this.data) {
        this.isEdit = true;
        this.food = this.data;
      }
    });
  }

  submitFoodForm() {
    if (this.isEdit) {
      this.foodService.editFood(this.food).subscribe(e => {
        this.dialogRef.close(this.food);
      });
    } else {
      this.foodService.addFood(this.food).subscribe(e => {
        this.dialogRef.close(this.food);
      });
    }
  }
}
