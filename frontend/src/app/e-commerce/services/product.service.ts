import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable()
export class ProductService {
  private productUrl  = 'https://e-com-webapp-backend.herokuapp.com/api/products';
  private categoryUrl = 'https://e-com-webapp-backend.herokuapp.com/api/categories';

  selectedCategory: Category;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductsByCategoryId(id: String) {
    return this.http.get<Product[]>(`${this.productUrl}/category/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  getCategories() {
    return this.http.get<Category[]>(this.categoryUrl);
  }
}
