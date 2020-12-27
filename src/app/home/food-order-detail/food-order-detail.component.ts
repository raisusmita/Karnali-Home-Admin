import { Component, OnInit } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MatDialog } from "@angular/material/dialog";
import { FoodService } from "../food/food.service";

@Component({
  selector: "app-food-order-detail",
  templateUrl: "./food-order-detail.component.html",
  styleUrls: ["./food-order-detail.component.scss"],
})
export class FoodOrderDetailComponent implements OnInit {
  displayedColumns: string[] = [
    "food_name",
    "price",
    "quantity",
    "total_amount",
    "room_number",
    "table_number",
    "invoice",
    "action",
  ];
  dataSource: any[];

  @BlockUI() blockUI: NgBlockUI;

  pageSizeOptions = [10, 25, 50, 100];

  pageSize: number;
  pageIndex: number;
  totalLength: number;
  limit: number;
  skip: number;

  constructor(private foodService: FoodService, private dialog: MatDialog) {}

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.totalLength = 0;
    this.skip = 0;
    this.limit = this.pageSize;
    this.getFoodOrderList();
  }

  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0;
    } else {
      this.skip = e.pageIndex * e.pageSize;
    }
    this.limit = e.pageSize;
    this.getFoodOrderList();
  }

  getFoodOrderList() {
    this.blockUI.start("Loading...");
    const foodParams = {
      limit: this.limit,
      skip: this.skip,
    };
    this.foodService.getFoodOrder(foodParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount;
          this.dataSource = result.data;
        }
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
      }
    );
  }
}
