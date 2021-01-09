import { Product } from './product';

class OrderItem {
  quantity: number;
  product: Product;
}

export class Order {
  _id: string;
  items: OrderItem[];
  orderDate: string;
}
