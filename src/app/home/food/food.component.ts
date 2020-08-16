import { Component, OnInit } from "@angular/core";
import { FoodService } from "./food.service";
import { MatDialog } from "@angular/material/dialog";
import { FoodFormComponent } from "./food-form/food-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { MainFoodFormComponent } from './main-food-form/main-food-form.component';
import { SubFoodFormComponent } from './sub-food-form/sub-food-form.component';

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.scss"],
})
export class FoodComponent implements OnInit {
  displayedColumns: string[] = ["mainFoodCategory", "subFoodCategory", "foodName", "header", "price", "action"];
  mainFoodDisplayedColumns: string[] = ["mainFoodCategory", "action"];
  subFoodDisplayedColumns: string[] = ["subFoodCategory", "action"];
  dataSource: any[];
  mainFood: any[];
  subFood: any[];

  constructor(private foodService: FoodService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getFood();
    this.getMainFood();
    this.getSubFood();
  }

  getFood() {
    this.foodService.getFood().subscribe((data) => {
      this.dataSource = data.data;
    });
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


  addFood() {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getFood();
      }
    });
  }

  addMainFood() {
    const dialogRef = this.dialog.open(MainFoodFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMainFood();
      }
    });
  }

  addSubFood() {
    const dialogRef = this.dialog.open(SubFoodFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSubFood();
      }
    });
  }

  editFood(FoodEditData) {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: "50%",
      data: FoodEditData,
    });
  }

  editMainFood(FoodEditData) {
    const dialogRef = this.dialog.open(MainFoodFormComponent, {
      width: "50%",
      data: FoodEditData,
    });
  }

  editSubFood(FoodEditData) {
    const dialogRef = this.dialog.open(SubFoodFormComponent, {
      width: "50%",
      data: FoodEditData,
    });
  }

  deleteFood(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.foodService.deleteFood(index).subscribe((data) => {
          this.getFood();
        });
      }
    });
  }
}
