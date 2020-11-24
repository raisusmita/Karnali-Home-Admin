import { Component, OnInit, Inject } from '@angular/core'
import { MvFood, MvSubFood } from '../food-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FoodService } from '../food.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-sub-food-form',
  templateUrl: './sub-food-form.component.html',
  styleUrls: ['./sub-food-form.component.scss']
})
export class SubFoodFormComponent implements OnInit {
  food: MvSubFood = {} as MvSubFood
  isEdit = false

  mainFood = []
  subFood = []
  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<SubFoodFormComponent>
  ) {
    if (data) {
      this.food = data
    }

    if (data.gridData) {
      this.food = data.gridData
      this.isEdit = true
    }
  }

  ngOnInit() {
    this.getMainFood()
    this.getSubFood()
  }

  getMainFood() {
    this.foodService.getMainFood().subscribe((data) => {
      this.mainFood = data.data
    })
  }

  getSubFood() {
    this.blockUI.start('Loading...')
    this.foodService.getSubFood().subscribe(
      (result) => {
        if (result && result.data) {
          this.subFood = result.data
        } else {
          this.blockUI.stop()
        }
        this.blockUI.stop()
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  submitFoodForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.foodService.editSubFood(this.food).subscribe(
        (e) => {
          this.blockUI.stop()

          this.dialogRef.close(this.food)
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.foodService.addSubFood(this.food).subscribe(
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
