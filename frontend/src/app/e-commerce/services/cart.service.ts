import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { OrderService } from './order.service';

@Injectable()
export class CartService {
  cartItems: CartItem[] = [];

  constructor(private orderService: OrderService) {}

  getItems() {
    return this.cartItems;
  }

  getItemsCount() {
    return this.cartItems.reduce((count, item) => (count += item.quantity), 0);
  }

  getItemsTotal() {
    return this.cartItems.reduce(
      (total, item) => (total += item.quantity * item.product.price),
      0
    );
  }

  addItem(product: Product) {
    const productIndex = this.cartItems.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex > -1) {
      this.cartItems[productIndex].quantity += 1;
    } else {
      // if item is not in the cart
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  deleteItem(productId: string) {
    const productIndex = this.cartItems.findIndex(
      (item) => item.product._id === productId
    );

    if (productIndex > -1) {
      this.cartItems.splice(productIndex, 1);
    }
  }

  increaseItemQuantity(productId: string) {
    const productIndex = this.cartItems.findIndex(
      (item) => item.product._id === productId
    );

    if (productIndex > -1) {
      this.cartItems[productIndex].quantity += 1;
    }
  }

  decreaseItemQuantity(productId: string) {
    const productIndex = this.cartItems.findIndex(
      (item) => item.product._id === productId
    );

    if (productIndex > -1) {
      this.cartItems[productIndex].quantity -= 1;
    }
  }
  submitOrder() {
    const user = localStorage.getItem('user');
    return this.orderService.saveOrder(this.cartItems, user);
  }
}
