import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogLoaderComponent } from './blog-list/blog-loader.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: ':slug', component: BlogDetailComponent }
];

@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,
    BlogLoaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogsModule {}
