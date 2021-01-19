import { Component, OnInit, Inject } from '@angular/core'
import { MvCoffee } from '../coffee-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CoffeeService } from '../coffee.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-coffee-form',
  templateUrl: './coffee-form.component.html',
  styleUrls: ['./coffee-form.component.scss']
})
export class CoffeeFormComponent implements OnInit {
  coffee: MvCoffee = {} as MvCoffee
  isEdit = false

  mainCoffee = []

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coffeeService: CoffeeService,
    private dialogRef: MatDialogRef<CoffeeFormComponent>
  ) {}

  ngOnInit() {
    this.getCoffee()
    this.getMainCoffee()
  }

  getCoffee() {
    this.coffeeService.getCoffee().subscribe((data) => {
      if (this.data) {
        this.isEdit = true
        this.coffee = this.data
      }
    })
  }

  getMainCoffee() {
    this.coffeeService.getMainCoffee().subscribe((data) => {
      this.mainCoffee = data.data
    })
  }

  submitCoffeeForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.coffeeService.editCoffee(this.coffee).subscribe(
        (e) => {
          this.dialogRef.close(this.coffee)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.coffeeService.addCoffee(this.coffee).subscribe(
        (e) => {
          this.dialogRef.close(this.coffee)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    }
  }
}
