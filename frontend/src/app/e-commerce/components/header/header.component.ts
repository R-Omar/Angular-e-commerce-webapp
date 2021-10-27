import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSideBar = new EventEmitter<void>();

  token: boolean;

  constructor(private cartService: CartService) {
    if (localStorage.getItem('token')) {
      this.token = true;
    } else {
      this.token = false;
    }
  }

  cartItemsCount() {
    return this.cartService.getItemsCount();
  }

  onToggleSideBar() {
    this.toggleSideBar.emit();
  }
}
