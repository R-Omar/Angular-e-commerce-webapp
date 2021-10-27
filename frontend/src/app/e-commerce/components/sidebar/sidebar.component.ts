import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: Category[] = [];
  name: String;
  role: String;

  constructor(private productService: ProductService) {
    if (this.isUserLoggedIn()) {
      this.name = localStorage.getItem('name');
      this.role = localStorage.getItem('role');
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem('user');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategorySelect(category: Category) {
    this.productService.selectedCategory = category;
  }

  isUser(): boolean {
    if (this.role == 'USER') {
      return true;
    }
  }
}
