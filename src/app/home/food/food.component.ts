import { Component, OnInit } from "@angular/core";
import { FoodService } from "./food.service";
import { MatDialog } from "@angular/material/dialog";
import { FoodFormComponent } from "./food-form/food-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.css"],
})
export class FoodComponent implements OnInit {
  displayedColumns: string[] = ["name", "price", "food_type", "action"];
  dataSource: any[];

  constructor(private foodService: FoodService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getFood();
  }

  getFood() {
    this.foodService.getFood().subscribe((data) => {
      this.dataSource = data.data;
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
  editFood(FoodEditData) {
    const dialogRef = this.dialog.open(FoodFormComponent, {
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
