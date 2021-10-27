import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService
      .getOrdersByUserId(localStorage.getItem('user'))
      .subscribe((orders) => {
        this.orders = this.sortOrderByRecentDate(orders);
      });
  }

  sortOrderByRecentDate(orders: Order[]) {
    return orders.sort((o1, o2) =>
      o1.orderDate < o2.orderDate ? 1 : o1.orderDate > o2.orderDate ? -1 : 0
    );
  }

  getOderItemsCount(order: Order) {
    return order.items.reduce((count, item) => (count += item.quantity), 0);
  }

  getOderTotal(order: Order) {
    return order.items.reduce(
      (total, item) => (total += item.quantity * item.product.price),
      0
    );
  }
}
