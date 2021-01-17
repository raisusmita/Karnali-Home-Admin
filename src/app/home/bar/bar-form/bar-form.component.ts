import { Component, OnInit, Inject } from '@angular/core'
import { MvBar } from '../bar-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BarService } from '../bar.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-bar-form',
  templateUrl: './bar-form.component.html',
  styleUrls: ['./bar-form.component.scss']
})
export class BarFormComponent implements OnInit {
  bar: MvBar = {} as MvBar
  isEdit = false

  mainBar = []
  barQuantity = {
    '30ML': '30 ML',
    '60ML': '60 ML',
    QTR: 'QTR',
    HALF: 'Half',
    FULL: 'Full',
    GLASS: 'Glass',
    'PER PC': 'Per Piece',
    PACKET: 'Packet'
  }

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private barService: BarService,
    private dialogRef: MatDialogRef<BarFormComponent>
  ) {}

  ngOnInit() {
    this.getBar()
    this.getMainBar()
  }

  getBar() {
    this.barService.getBar().subscribe((data) => {
      if (this.data) {
        this.isEdit = true
        this.bar = this.data
      }
    })
  }

  getMainBar() {
    this.barService.getMainBar().subscribe((data) => {
      this.mainBar = data.data
    })
  }

  submitBarForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.barService.editBar(this.bar).subscribe(
        (e) => {
          this.dialogRef.close(this.bar)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.barService.addBar(this.bar).subscribe(
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
