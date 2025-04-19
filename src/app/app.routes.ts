import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'generator',
    loadComponent: () => import('./features/generator/pages/generator-page/generator-page.component').then(m => m.GeneratorPageComponent)
  },
  {
    path: '',
    redirectTo: 'generator',
    pathMatch: 'full'
  }
];