import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesPageComponent } from './categories-page.component';

const routes: Routes = [
  { path: '', component: CategoriesPageComponent }
];

@NgModule({
  declarations: [CategoriesPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule {}
