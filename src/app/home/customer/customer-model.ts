export interface MvCustomer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  // customer_type: string;
  date_of_birth: string;
  profession: string;
  identity_type: string;
  identity_number: string;
  identity_image_first: File;
  identity_image_second: File;
}

export interface MvUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
