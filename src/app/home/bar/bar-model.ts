export interface MvBar {
  id: number;
  main_bar_category_id: number;
  sub_bar_category_id: number;
  bar_name: string;
  quantity: string;
  price: number;
}

export interface MvMainBar {
  id: number;
  main_bar_name: string;
}

export interface MvSubBar {
  id: number;
  main_bar_category_id: number;
  sub_bar_name: string;
}