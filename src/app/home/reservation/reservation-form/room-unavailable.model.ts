export interface MvRoomUnavailable {
  booking_id: number
  room_id: number
  reservation_id: number
  availability: boolean
  check_in_date: Date
  check_out_date: Date
  status: string
}
