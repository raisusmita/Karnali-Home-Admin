import { NgBlockUI } from 'ng-block-ui'
import { Component, OnInit, Inject } from '@angular/core'
import { MvFoodHeader } from '../food-model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FoodService } from '../food.service'
import { BlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-food-header-form',
  templateUrl: './food-header-form.component.html',
  styleUrls: ['./food-header-form.component.scss']
})
export class FoodHeaderFormComponent implements OnInit {
  food: MvFoodHeader = {} as MvFoodHeader
  isEdit = false
  foodHeader = []
  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<FoodHeaderFormComponent>
  ) {
    if (data.gridData) {
      this.isEdit = true
      this.food = data.gridData
    }
  }

  ngOnInit() {
    // this.getFood();
    // this.getfoodHeader();
  }

  // getFood() {
  //   this.foodService.getFood().subscribe((data) => {
  //     if (this.data) {
  //       this.food = this.data;
  //     }
  //   });
  // }

  // getfoodHeader() {
  //   this.foodService.getFoodHeader().subscribe((data) => {
  //     this.foodHeader = data.data;
  //   });
  // }

  submitFoodForm() {
    this.blockUI.start('Loading...')
    if (this.isEdit) {
      this.foodService.editFoodHeader(this.food).subscribe(
        (e) => {
          this.blockUI.stop()
          this.dialogRef.close(this.food)
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.foodService.addFoodHeader(this.food).subscribe(
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
