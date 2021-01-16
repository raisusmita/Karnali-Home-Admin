import { Component, OnInit, Inject } from '@angular/core'
import { MvFood } from '../food-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FoodService } from '../food.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent implements OnInit {
  food: MvFood = {} as MvFood
  isEdit = false

  mainFood = []
  subFood = []
  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<FoodFormComponent>
  ) {}

  ngOnInit() {
    this.getFood()
    this.getMainFood()
    this.getSubFood()
  }

  getFood() {
    this.foodService.getFood().subscribe((data) => {
      if (this.data.gridData) {
        this.isEdit = true
        this.food = this.data.gridData
      }
    })
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((data) => {
      this.mainFood = data.data
    })
  }

  getSubFood() {
    this.foodService.getSubFood().subscribe((data) => {
      this.subFood = data.data
    })
  }

  submitFoodForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.foodService.editFood(this.food).subscribe(
        (e) => {
          this.blockUI.stop()
          this.dialogRef.close(this.food)
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.foodService.addFood(this.food).subscribe(
        (e) => {
          this.blockUI.stop()
          this.dialogRef.close(this.food)
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    }
  }
}
