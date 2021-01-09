import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  deleteItem(product: Product) {
    this.cartService.deleteItem(product._id);
  }

  increaseItemQuantity(product: Product) {
    this.cartService.increaseItemQuantity(product._id);
  }

  decreaseItemQuantity(product: Product) {
    this.cartService.decreaseItemQuantity(product._id);
  }

  getCartItemsCount() {
    return this.cartService.getItemsCount();
  }

  getCartItemsTotal() {
    return this.cartService.getItemsTotal();
  }

  submitOrder() {
    this.cartService.submitOrder().subscribe(() => {
      this.cartService.cartItems = [];
      this.matSnackBar.open(
        'Votre nouvelle commande est en cours de traitement 🕒',
        'Fermer',
        {
          duration: 5000,
          verticalPosition: 'top',
        }
      );
      this.router.navigate(['/view-orders']);
    });
  }

  isUserLoggedIn() {
    return localStorage.getItem('user');
  }
}
