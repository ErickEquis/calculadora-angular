import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import("@/calculator/view/calculator-view/calculator-view.component")
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
