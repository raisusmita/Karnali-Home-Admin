import { Component, OnInit, ViewChild } from '@angular/core'
import { RoomService } from './room.service'
import { MatDialog } from '@angular/material/dialog'
import { AddRoomComponent } from './add-room/add-room.component'
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component'
import { MatPaginator } from '@angular/material'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  displayedColumns: string[] = [
    'room_number',
    'number_of_bed',
    'telephone_number',
    'action'
  ]
  dataSource: any[]
  selectedRowIndex: number
  selectedRoomId: any

  @BlockUI() blockUI: NgBlockUI

  pageSizeOptions = [10, 25, 50, 100]

  pageSize: number
  pageIndex: number
  totalLength: number
  limit: number
  skip: number

  constructor(private roomService: RoomService, private dialog: MatDialog) {}

  ngOnInit() {
    this.pageSize = 10
    this.pageIndex = 0
    this.totalLength = 0

    this.skip = 0
    this.limit = this.pageSize
    this.getRoomList()
  }
  onPageChange(e: any) {
    if (e.pageIndex === 0) {
      this.skip = 0
    } else {
      this.skip = e.pageIndex * e.pageSize
    }
    this.limit = e.pageSize

    this.getRoomList()
  }
  getRoomList() {
    this.blockUI.start('Loading...')

    const roomParams = {
      limit: this.limit,
      skip: this.skip
    }

    this.roomService.getRoomList(roomParams).subscribe(
      (result) => {
        if (result && result.data) {
          this.totalLength = result.totalCount
          this.dataSource = result.data
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

  addRoom() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '50%',
      data: null
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.getRoomList()
    })
  }
  editRoom(roomEditData) {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '50%',
      data: roomEditData
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.getRoomList()
    })
  }

  deleteRoom(index) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.roomService.deleteRoom(index).subscribe((data) => {
          this.getRoomList()
        })
      }
    })
  }
}
