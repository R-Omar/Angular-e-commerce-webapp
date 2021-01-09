import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProductsCatalogComponent,
      },
      {
        path: 'category/:id',
        component: ProductsCatalogComponent,
      },
      {
        path: 'cart-details',
        component: CartDetailsComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'view-orders',
        component: ViewOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ECommerceRoutingModule {}
