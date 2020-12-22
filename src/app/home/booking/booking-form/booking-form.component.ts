import { ToastrService } from 'ngx-toastr'
import { RoomAvailabilityService } from './../../../shared/services/room-availability/room-availability.service'
import { ReservationService } from './../../reservation/reservation.service'
import { RoomService } from './../../room/room.service'
import { BookingService } from './../booking.service'
import { RoomCategoryService } from './../../room-category/room-category.service'
import { CustomerService } from './../../customer/customer.service'
import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MvBooking } from '../booking.model'
import { FormControl } from '@angular/forms'
import { BlockUI, NgBlockUI } from 'ng-block-ui'

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  booking: MvBooking = {} as MvBooking

  public unavailableRoom: any[] = [
    {
      reservation_id: 0,
      room_id: 0,
      check_in_date: '',
      check_out_date: '',
      status: '',
      booking_id: 0
    }
  ]

  addForm: boolean
  editForm: boolean
  customers: any[] = []
  roomCategories: any[] = []
  rooms: any[] = []
  roomBasedOnBookingCategory: any[] = []
  showRoomNumber: boolean

  public newRoomCategories: any[] = [
    {
      room_category: '',
      number_of_room: 0,
      number_of_adult: 0,
      number_of_child: 0
    }
  ]

  // For Room Availability
  checkInDate: Date
  checkOutDate: Date
  CI: Date
  CO: Date
  roomCategoryId: Number
  numberOfRooms: number
  availableRoomsByDate: any[]
  paramsDate: {}

  available: any[] = []
  roomList: any[] = []
  paramsRoomCategory: any

  disableButton: boolean
  totalAvailableRoomCategory: number

  //Prepopulated value from griddata
  customerName: string
  selectedRoom: any[] = []
  cloneSelectedRoom: any[] = []
  editParams: any[] = []

  @BlockUI() blockUI: NgBlockUI

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private roomCategoryService: RoomCategoryService,
    private roomAvailableService: RoomAvailabilityService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<BookingFormComponent>
  ) {}

  ngOnInit() {
    if (this.data.formType == 'Add') {
      this.addForm = true
      this.showRoomNumber = false
    } else {
      this.editForm = true
      this.showRoomNumber = true
      this.getRoomByCategory()
    }

    this.getRooms()
    if (this.data.gridData) {
      this.booking = this.data.gridData
      this.booking.check_in_date = new Date(this.data.gridData.check_in_date)
      this.booking.check_out_date = new Date(this.data.gridData.check_out_date)
    }

    this.getCustomers()
    this.getRoomCategories()
  }

  getRooms() {
    this.roomAvailableService.getAvailableRooms().subscribe((result) => {
      this.rooms = result.data
    })
  }
  getRoomByCategory(roomCategoryId?) {
    if (roomCategoryId) {
      this.paramsRoomCategory = {
        room_category_id: roomCategoryId
      }
    } else {
      this.paramsRoomCategory = {
        room_category_id: this.data.gridData.room_category_id
      }
    }
    this.roomService
      .getRoomByCategory(this.paramsRoomCategory)
      .subscribe((result) => {
        this.selectedRoom.length = 0
        this.roomList = result.data

        if (this.data.formType == 'Edit') {
          this.roomList.map((room) => {
            this.data.gridData.room_number.map((selectRoom) => {
              if (room.room_number == selectRoom) {
                this.selectedRoom.push(room.id)
                this.cloneSelectedRoom.push(selectRoom)
              }
            })
          })
        }
      })
  }

  getCustomers() {
    this.blockUI.start('Loading...')

    this.customerService.getCustomer().subscribe(
      (result) => {
        if (result && result.data) {
          this.customers = result.data
        } else {
          this.blockUI.stop()
        }
        this.blockUI.stop() // Stop blocking
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  getRoomCategories() {
    this.blockUI.start('Loading...')
    this.roomCategoryService.getRoomCategory().subscribe(
      (result) => {
        if (result && result.data) {
          this.roomCategories = result.data
        } else {
          this.blockUI.stop()
        }
        this.blockUI.stop() // Stop blocking
      },
      (error) => {
        this.blockUI.stop()
      }
    )
  }

  addRoomCategory() {
    this.newRoomCategories.push({
      room_category: '',
      number_of_room: '',
      number_of_adult: '',
      number_of_child: ''
    })
  }

  removeRoomCategory(i: number) {
    this.newRoomCategories.splice(i, 1)
  }

  getCheckInDate($checkInDate) {
    this.checkInDate = $checkInDate
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms
    }
    this.getRoomAvailabilityByDate(this.paramsDate)
  }

  getCheckOutDate($checkOutDate) {
    this.checkOutDate = $checkOutDate
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms
    }

    this.getRoomAvailabilityByDate(this.paramsDate)
  }

  getRoomCategory($category) {
    this.roomCategoryId = $category
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms
    }
    this.getRoomAvailabilityByDate(this.paramsDate)
    this.getRoomByCategory(this.roomCategoryId)
  }

  getNumberOfRoom($numberOfRooms) {
    this.numberOfRooms = $numberOfRooms
    this.paramsDate = {
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate,
      room_category_id: this.roomCategoryId,
      number_of_rooms: this.numberOfRooms
    }
    this.getRoomAvailabilityByDate(this.paramsDate)
  }

  checkMoreRoomThanAvailable() {
    if (this.totalAvailableRoomCategory < this.booking.number_of_rooms) {
      this.disableButton = true
      this.toastr.error(
        'The number of room is greater than available room number',
        'Warning!',
        {
          closeButton: true,
          positionClass: 'toast-top-right'
        }
      )
    }
  }

  checkRoomCategory() {
    if (!this.available.includes(true)) {
      this.disableButton = true
      this.toastr.error('The room category is not available!', 'Warning!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })
    }
  }

  checkCILessThanCO() {
    this.disableButton = true
    this.toastr.error(
      'Checkin date should not be greater than checkout date',
      'Warning!',
      {
        closeButton: true,
        positionClass: 'toast-top-right'
      }
    )
  }

  checkCICOWithToday() {
    this.disableButton = true
    this.toastr.error('Booking cannot be made for past dates.', 'Warning!', {
      closeButton: true,
      positionClass: 'toast-top-right'
    })
  }
  getRoomAvailabilityByDate(dates) {
    this.disableButton = false

    this.CI = dates.check_in_date
    this.CO = dates.check_out_date
    if (this.CI > this.CO) {
      this.checkCILessThanCO()
    }

    const today = new Date()
    if (this.CI < today || this.CO < today) {
      this.checkCICOWithToday()
    }
    if (
      dates.check_in_date != null &&
      dates.check_out_date != null &&
      dates.room_category_id != null &&
      dates.number_of_rooms != null
    ) {
      this.roomAvailableService
        .getRoomAvailabilityByDate(dates)
        .subscribe((result) => {
          this.availableRoomsByDate = result.data

          const arr = []
          const test = Object.values(this.availableRoomsByDate).map((x) => {
            arr.push({
              id: x[0].room_category.id,
              category: x[0].room_category.room_category,
              totalNumber: x.length
            })
          })

          arr.map((x) => {
            if (x.id == this.booking.room_category_id) {
              this.totalAvailableRoomCategory = x.totalNumber
            }
          })

          Object.values(this.availableRoomsByDate).map((x: any) => {
            x.map((y) => {
              if (y.room_category_id == this.booking.room_category_id) {
                this.available.push(true)
              } else {
                this.available.push(false)
              }
            })
          })

          this.checkMoreRoomThanAvailable()
          this.checkRoomCategory()
          this.available = []
        })
    }
  }

  submitBookingForm() {
    //Removing the timeZone
    let offsetCIn = this.booking.check_in_date.getTimezoneOffset() * 60000
    let offsetCOut = this.booking.check_out_date.getTimezoneOffset() * 60000

    this.booking.check_in_date = new Date(
      this.booking.check_in_date.getTime() - offsetCIn
    )
    this.booking.check_out_date = new Date(
      this.booking.check_out_date.getTime() - offsetCOut
    )

    this.booking.status = 'active'
    if (this.editForm) {
      // First index is for updating booking
      this.editParams.push(this.booking)

      // Remaining are rows for roomAvailabilities
      this.selectedRoom.map((roomId) => {
        this.editParams.push({
          reservation_id: null,
          booking_id: this.data.gridData.id,
          status: 'booked',
          check_in_date: this.booking.check_in_date,
          check_out_date: this.booking.check_out_date,
          created_at: this.booking.created_at,
          updated_at: this.booking.created_at,
          room_id: roomId
        })
      })

      this.blockUI.start('Loading')
      this.bookingService.editBooking(this.editParams).subscribe(
        (result) => {
          this.blockUI.stop()
          this.dialogRef.close(this.booking)
          this.editParams.length = 0
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    } else {
      this.blockUI.start('Loading...')
      this.bookingService.addBooking(this.booking).subscribe(
        (result) => {
          this.blockUI.stop()
          this.dialogRef.close(this.booking)
        },
        (error) => {
          this.blockUI.stop()
        }
      )
    }
  }
}
