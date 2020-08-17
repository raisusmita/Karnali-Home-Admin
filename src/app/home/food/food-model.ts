export interface MvFood {
  id: number;
  main_food_category_id: number;
  sub_food_category_id: number;
  food_name: string;
  food_header_id: string;
  price: number;
}

export interface MvMainFood {
  id: number;
  main_food_name: string;
}

export interface MvSubFood {
  id: number;
  main_food_category_id: number;
  sub_food_name: string;
}
