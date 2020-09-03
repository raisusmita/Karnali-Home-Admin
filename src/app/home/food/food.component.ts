import { NgBlockUI } from "ng-block-ui";
import { Component, OnInit } from "@angular/core";
import { FoodService } from "./food.service";
import { MatDialog } from "@angular/material/dialog";
import { FoodFormComponent } from "./food-form/food-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { MainFoodFormComponent } from "./main-food-form/main-food-form.component";
import { SubFoodFormComponent } from "./sub-food-form/sub-food-form.component";
import { FoodHeaderFormComponent } from "./food-header-form/food-header-form.component";
import { BlockUI } from "ng-block-ui";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.scss"],
})
export class FoodComponent implements OnInit {
  displayedColumns: string[] = [
    "mainFoodCategory",
    "subFoodCategory",
    "foodName",
    "header",
    "price",
    "action",
  ];
  mainFoodDisplayedColumns: string[] = ["mainFoodCategory", "action"];
  subFoodDisplayedColumns: string[] = ["subFoodCategory", "action"];
  FoodHeaderDisplayedColumns: string[] = ["foodHeader", "action"];

  dataSource: any[];
  mainFood: any[];
  subFood: any[];
  foodHeader: any[];

  @BlockUI() blockUI: NgBlockUI;

  constructor(private foodService: FoodService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getFood();
    this.getMainFood();
    this.getSubFood();
    this.getFoodHeader();
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

  getFoodHeader() {
    this.blockUI.start("Loading...");
    this.foodService.getFoodHeader().subscribe(
      (result) => {
        if (result && result.data) {
          this.foodHeader = result.data;
        } else {
          this.blockUI.stop();
        }
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
      }
    );
  }

  addFood() {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: "50%",
      height: "700px",
      data: {
        gridData: null,
        formType: "Add",
      },
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
      data: {
        gridData: null,
        formType: "Add",
      },
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
      data: {
        gridData: null,
        formType: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSubFood();
      }
    });
  }

  addFoodHeader() {
    const dialogRef = this.dialog.open(FoodHeaderFormComponent, {
      width: "50%",
      data: {
        gridData: null,
        formType: "Add",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getFoodHeader();
      }
    });
  }

  editFood(FoodEditData) {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: "50%",
      data: {
        gridData: FoodEditData,
        formType: "Add",
      },
    });
  }

  editMainFood(FoodEditData) {
    const dialogRef = this.dialog.open(MainFoodFormComponent, {
      width: "50%",
      data: {
        gridData: FoodEditData,
        formType: "Add",
      },
    });
  }

  editSubFood(FoodEditData) {
    const dialogRef = this.dialog.open(SubFoodFormComponent, {
      width: "50%",
      data: {
        gridData: FoodEditData,
        formType: "Add",
      },
    });
  }

  editFoodHeader(FoodEditData) {
    console.log(FoodEditData);
    const dialogRef = this.dialog.open(FoodHeaderFormComponent, {
      width: "50%",
      data: {
        gridData: FoodEditData,
        formType: "Add",
      },
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
