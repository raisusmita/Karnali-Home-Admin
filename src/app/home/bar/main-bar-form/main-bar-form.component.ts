import { Component, OnInit, Inject } from "@angular/core";
import { MvMainBar } from "../bar-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BarService } from "../bar.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-main-bar-form",
  templateUrl: "./main-bar-form.component.html",
  styleUrls: ["./main-bar-form.component.scss"],
})
export class MainBarFormComponent implements OnInit {
  bar: MvMainBar = {} as MvMainBar;
  isEdit = false;
  mainBar = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private barService: BarService,
    private dialogRef: MatDialogRef<MainBarFormComponent>
  ) {
    if (data) {
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.getBar();
    this.getMainBar();
  }

  getBar() {
    this.barService.getBar().subscribe((data) => {
      if (this.data) {
        this.bar = this.data;
      }
    });
  }

  getMainBar() {
    this.barService.getMainBar().subscribe((data) => {
      this.mainBar = data.data;
    });
  }

  submitBarForm() {
    this.blockUI.start("Loading...");
    if (this.isEdit) {
      this.barService.editMainBar(this.bar).subscribe((e) => {
        this.dialogRef.close(this.bar);
        this.blockUI.stop();
      });
    } else {
      this.barService.addMainBar(this.bar).subscribe((e) => {
        this.dialogRef.close(this.bar);
        this.blockUI.stop();
      });
    }
  }
}
