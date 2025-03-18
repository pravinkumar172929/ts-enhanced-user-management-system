export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  role: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
