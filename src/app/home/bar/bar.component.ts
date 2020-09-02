import { Component, OnInit } from "@angular/core";
import { BarService } from "./bar.service";
import { MatDialog } from "@angular/material/dialog";
import { BarFormComponent } from "./bar-form/bar-form.component";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";
import { MainBarFormComponent } from "./main-bar-form/main-bar-form.component";
import { SubBarFormComponent } from "./sub-bar-form/sub-bar-form.component";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.scss"],
})
export class BarComponent implements OnInit {
  displayedColumns: string[] = [
    "mainBarCategory",
    "subBarCategory",
    "barName",
    "quantity",
    "price",
    "action",
  ];
  mainBarDisplayedColumns: string[] = ["mainBarCategory", "action"];
  subBarDisplayedColumns: string[] = ["subBarCategory", "action"];

  dataSource: any[];
  mainBar: any[];
  subBar: any[];
  barHeader: any[];

  @BlockUI() blockUI: NgBlockUI;

  constructor(private barService: BarService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBar();
    this.getMainBar();
    this.getSubBar();
  }

  getBar() {
    this.barService.getBar().subscribe((data) => {
      this.dataSource = data.data;
    });
  }

  getMainBar() {
    this.barService.getMainBar().subscribe((data) => {
      this.mainBar = data.data;
    });
  }

  getSubBar() {
    this.blockUI.start("Loading...");
    this.barService.getSubBar().subscribe((data) => {
      this.subBar = data.data;
      this.blockUI.stop();
    });
  }

  addBar() {
    const dialogRef = this.dialog.open(BarFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBar();
      }
    });
  }

  addMainBar() {
    const dialogRef = this.dialog.open(MainBarFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMainBar();
      }
    });
  }

  addSubBar() {
    const dialogRef = this.dialog.open(SubBarFormComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSubBar();
      }
    });
  }

  editBar(BarEditData) {
    const dialogRef = this.dialog.open(BarFormComponent, {
      width: "50%",
      data: BarEditData,
    });
  }

  editMainBar(BarEditData) {
    const dialogRef = this.dialog.open(MainBarFormComponent, {
      width: "50%",
      data: BarEditData,
    });
  }

  editSubBar(BarEditData) {
    const dialogRef = this.dialog.open(SubBarFormComponent, {
      width: "50%",
      data: BarEditData,
    });
  }

  deleteBar(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.barService.deleteBar(index).subscribe((data) => {
          this.getBar();
        });
      }
    });
  }
}
