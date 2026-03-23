import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: ':name', component: CategoryComponent }
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule {}
