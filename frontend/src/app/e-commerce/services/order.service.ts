import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  private ordersUrl = 'https://e-com-webapp-backend.herokuapp.com/api/orders';

  getOrdersByUserId(id: String) {
    return this.http.get<Order[]>(`${this.ordersUrl}/${id}`);
  }

  saveOrder(cartItems: CartItem[], userId: string) {
    const items = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    return this.http.post(this.ordersUrl, { items: items, user: userId });
  }
}