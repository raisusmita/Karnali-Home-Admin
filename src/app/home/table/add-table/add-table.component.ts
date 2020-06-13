import { MvTable } from "./../table.model";
import { TableService } from "./../table.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-table",
  templateUrl: "./add-table.component.html",
  styleUrls: ["./add-table.component.scss"],
})
export class AddTableComponent implements OnInit {
  table: MvTable = {} as MvTable;
  isEdit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tableService: TableService,
    private dialogRef: MatDialogRef<AddTableComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.table = this.data;
    }
  }

  submitTableForm() {
    if (this.isEdit) {
      this.tableService.editTable(this.table).subscribe((e) => {
        this.dialogRef.close(this.table);
      });
    } else {
      this.tableService.addTable(this.table).subscribe((e) => {
        this.dialogRef.close(this.table);
      });
    }
  }
}
