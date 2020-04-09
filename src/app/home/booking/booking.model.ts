export interface MvBooking {
  customer_id: string;
  room_category_id: string;
  number_of_adult: number;
  number_of_child: number;
  number_of_rooms: number;
  check_in_date: Date;
  check_out_date: Date;
  created_at: Date;
}
