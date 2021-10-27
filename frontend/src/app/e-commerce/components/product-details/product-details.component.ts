import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product = new Product();
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private productservice: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productservice
      .getProduct(this.id)
      .subscribe((product) => (this.product = product));
  }

  addToCart() {
    this.cartService.addItem(this.product);
    this.snackBar.open('Le produit a été ajouté dans votre panier', '!', {
      duration: 2000,
    });
  }
}
