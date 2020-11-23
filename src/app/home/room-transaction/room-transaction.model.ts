import { NumberValueAccessor } from '@angular/forms'

export interface MvRoomTransaction {
  customer_id: number
  first_name: string
  last_name: number
  middle_name: number
  customer_phone: string
  room_id: number
  phone_number: string
  address: string
  room_category: string
  room_number: string
  no_of_days: number
  rate: number
  amount: number
  status: string
  check_in_date: Date
  check_out_date: Date
  reservation_id: number
}
