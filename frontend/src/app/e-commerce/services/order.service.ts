import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderService {
  private ordersUrl = environment.apiUrl + '/api/orders';

  constructor(private http: HttpClient) {}

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