export interface MvReservation {
  reservation_id: number;
  customer_id: number;
  room_id: number;
  room_category_id: number;
  availability: boolean;
  check_in_date: Date;
  check_out_date: Date;
  created_at: Date;
  booking_id: number;
}
