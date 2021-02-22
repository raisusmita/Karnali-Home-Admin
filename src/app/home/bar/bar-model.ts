export interface MvBar {
  id: number
  main_bar_category_id: number
  bar_name_id: number
  quantity: string
  price: number
}

export interface MvMainBar {
  id: number
  main_bar_name: string
}

export interface MvBarName {
  id: number
  bar_name: string
}
