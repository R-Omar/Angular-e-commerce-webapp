import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() isAdmin = true;

  constructor(private router: Router, private cartService: CartService) {}

  addToCart() {
    this.cartService.addItem(this.product);
  }

  onNavigate(id: string) {
    this.router.navigate(['/product/' + id]);
  }
}
