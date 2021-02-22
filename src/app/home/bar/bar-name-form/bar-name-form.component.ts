import { Component, OnInit, Inject } from '@angular/core'
import { MvBarName } from '../bar-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BarService } from '../bar.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-bar-name-form',
  templateUrl: './bar-name-form.component.html',
  styleUrls: ['./bar-name-form.component.scss']
})
export class BarNameFormComponent implements OnInit {
  bar: MvBarName = {} as MvBarName
  isEdit = false
  barName = []

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private barService: BarService,
    private dialogRef: MatDialogRef<BarNameFormComponent>
  ) {
    if (data) {
      this.isEdit = true
    }
  }

  ngOnInit() {
    this.getBar()
    this.getBarName()
  }

  getBar() {
    this.barService.getBar().subscribe((data) => {
      if (this.data) {
        this.bar = this.data
      }
    })
  }

  getBarName() {
    this.barService.getBarName().subscribe((data) => {
      this.barName = data.data
    })
  }

  submitBarForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.barService.editBarName(this.bar).subscribe(
        (e) => {
          this.dialogRef.close(this.bar)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.barService.addBarName(this.bar).subscribe(
        (e) => {
          this.dialogRef.close(this.bar)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    }
  }
}
