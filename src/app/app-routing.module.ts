import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'jobs',
    loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'jobs/:slug',
    loadChildren: () => import('./features/job-detail/job-detail.module').then(m => m.JobDetailModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'category/:name',
    loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'blogs',
    loadChildren: () => import('./features/blogs/blogs.module').then(m => m.BlogsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'about' }
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'contact' }
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'privacy-policy' }
  },
  {
    path: 'terms',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'terms' }
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'disclaimer' }
  },
  {
    path: 'sitemap',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    data: { page: 'sitemap' }
  },
  {
    path: '**',
    loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
