import { Component, OnInit, Inject } from "@angular/core";
import { MvSubBar } from "../bar-model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BarService } from "../bar.service";

@Component({
  selector: "app-sub-bar-form",
  templateUrl: "./sub-bar-form.component.html",
  styleUrls: ["./sub-bar-form.component.scss"],
})
export class SubBarFormComponent implements OnInit {
  bar: MvSubBar = {} as MvSubBar;
  isEdit = false;

  mainBar = [];
  subBar = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private barService: BarService,
    private dialogRef: MatDialogRef<SubBarFormComponent>
  ) {
    if (data) {
      this.bar = data;
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.getMainBar();
    this.getSubBar();
  }

  getMainBar() {
    this.barService.getMainBar().subscribe((data) => {
      this.mainBar = data.data;
    });
  }

  getSubBar() {
    this.barService.getSubBar().subscribe((data) => {
      this.subBar = data.data;
    });
  }

  submitBarForm() {
    if (this.isEdit) {
      this.barService.editSubBar(this.bar).subscribe((e) => {
        this.dialogRef.close(this.bar);
      });
    } else {
      this.barService.addSubBar(this.bar).subscribe((e) => {
        this.dialogRef.close(this.bar);
      });
    }
  }

}


