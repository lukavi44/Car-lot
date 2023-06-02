export interface Car {
  id: string;
  manufacturer: string;
  model: string;
  picture: string;
  transmission: string;
  fuel: string;
  type: string;
  price: number;
}

export interface CarCreate {
  data: {
    id: string;
    manufacturer: string;
    model: string;
    picture: string;
    transmission: string;
    fuel: string;
    type: string;
    price: number;
  };
}
