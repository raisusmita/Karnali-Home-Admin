export interface MvCustomer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  customer_type: string;
  address: string;
  country: string;
}

export interface MvUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
