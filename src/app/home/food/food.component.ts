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

  pageSizeOptions = [10, 25, 50, 100];

  pageSize: number;
  pageIndex: number;
  foodTotalLength: number;
  mainFoodTotalLength: number;
  subFoodTotalLength: number;
  foodHeaderTotalLength: number;

  limit: number;
  skip: number;

  tabLabel: string;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private foodService: FoodService, private dialog: MatDialog) {}

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.mainFoodTotalLength = 0;
    this.foodTotalLength = 0;
    this.subFoodTotalLength = 0;
    this.foodHeaderTotalLength = 0;

    this.skip = 0;
    this.limit = this.pageSize;
    this.initialize();
  }

  initialize() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };

    this.getFood();
    this.getMainFood();
    this.getSubFood();
    this.getFoodHeader();
  }
  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0;
    } else {
      this.skip = e.pageIndex * e.pageSize;
    }
    this.limit = e.pageSize;

    if (this.tabLabel == "Main Food") {
      this.getMainFood();
    } else if (this.tabLabel == "Sub Food") {
      this.getSubFood();
    } else if (this.tabLabel == "Food Header") {
      this.getFoodHeader();
    } else if (this.tabLabel == "Food Items") {
      this.getFood();
    }
  }
  getFood() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.foodService.getFoodList(paginationParams).subscribe((result) => {
      this.dataSource = result.data;
      this.foodTotalLength = result.totalCount;
    });
  }

  onTabChange(e: any) {
    this.tabLabel = e.tab["textLabel"];
  }

  getMainFood() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.foodService.getMainFoodList(paginationParams).subscribe((result) => {
      this.mainFood = result.data;
      this.mainFoodTotalLength = result.totalCount;
    });
  }

  getSubFood() {
    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.foodService.getSubFoodList(paginationParams).subscribe((result) => {
      this.subFoodTotalLength = result.totalCount;

      this.subFood = result.data;
    });
  }

  getFoodHeader() {
    this.blockUI.start("Loading...");

    const paginationParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.foodService.getFoodHeaderList(paginationParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.foodHeaderTotalLength = result.totalCount;
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
