export interface IItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}
