import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      }
];
