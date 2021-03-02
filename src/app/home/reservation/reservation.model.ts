export interface MvReservation {
  id: number
  customer_id: number
  room_id: number
  room_category_id: number
  availability: boolean
  number_of_adult: number
  number_of_child: number
  check_in_date: Date
  check_out_date: Date
  created_at: Date
  booking_id: number
  room_number: string
  status: string
  reservation: {
    check_in_date: Date
    check_out_date: Date
  }
}
