import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: '404', component: NotFoundPage },
];
