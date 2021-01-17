import { Component, OnInit, Inject } from '@angular/core'
import { MvMainCoffee } from '../coffee-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CoffeeService } from '../coffee.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-main-coffee-form',
  templateUrl: './main-coffee-form.component.html',
  styleUrls: ['./main-coffee-form.component.scss']
})
export class MainCoffeeFormComponent implements OnInit {
  coffee: MvMainCoffee = {} as MvMainCoffee
  isEdit = false
  mainCoffee = []

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coffeeService: CoffeeService,
    private dialogRef: MatDialogRef<MainCoffeeFormComponent>
  ) {
    if (data) {
      this.isEdit = true
    }
  }

  ngOnInit() {
    this.getCoffee()
    this.getMainCoffee()
  }

  getCoffee() {
    this.coffeeService.getCoffee().subscribe((data) => {
      if (this.data) {
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
      this.coffeeService.editMainCoffee(this.coffee).subscribe(
        (e) => {
          this.dialogRef.close(this.coffee)
          this.blockUI.stop()
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.coffeeService.addMainCoffee(this.coffee).subscribe(
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
