import { AddTableComponent } from "./add-table/add-table.component";
import { MatDialog } from "@angular/material/dialog";
import { TableService } from "./table.service";
import { Component, OnInit } from "@angular/core";
import { ConfirmDeleteComponent } from "src/app/shared/components/confirm-delete/confirm-delete.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ["table_number", "created_at", "action"];
  dataSource: any[];
  selectedRowIndex: number;
  selectedRoomId: any;
  constructor(private tableService: TableService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getTable();
  }

  getTable() {
    this.tableService.getTable().subscribe((result) => {
      this.dataSource = result.data;
    });
  }

  addTable() {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: "50%",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTable();
      }
    });
  }
  editTable(tableEditData) {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: "50%",
      data: tableEditData,
    });
  }

  deleteTable(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.tableService.deleteTable(index).subscribe((data) => {
          this.getTable();
        });
      }
    });
  }
}
