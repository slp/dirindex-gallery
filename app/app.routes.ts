import { provideRouter, RouterConfig }  from '@angular/router';
import { GalleryComponent } from './gallery.component';

const routes: RouterConfig = [
  {
    path: '',
    component: GalleryComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];