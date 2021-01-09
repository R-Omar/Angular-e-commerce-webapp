import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderService } from './services/order.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    ProductsCatalogComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    SidebarComponent,
    CartDetailsComponent,
    ViewOrdersComponent,
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    MatBadgeModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ProductService,
    CartService,
    OrderService,
  ],
})
export class ECommerceModule {}
