import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss'],
})
export class ProductsCatalogComponent {
  products: Product[] = [];
  search: string = '';
  searchedProducts: Product[] = [];
  categoryId: string;
  gridColumns = 4;
  currentCategory: Category;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = params.id;
      this.search = '';
      this.onCategoryChange();
    });
  }

  onCategoryChange() {
    this.currentCategory = this.productService.selectedCategory;
    if (this.categoryId) {
      this.getProductsByCurrentCategory();
    } else {
      this.getProducts();
    }
  }

  getProductsByCurrentCategory() {
    this.productService
      .getProductsByCategoryId(this.categoryId)
      .subscribe((products) => {
        this.products = products;
        this.searchedProducts = products;
      });
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.searchedProducts = products;
    });
  }

  searchProducts() {
    this.searchedProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
