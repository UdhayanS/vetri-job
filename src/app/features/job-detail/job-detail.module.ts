import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailComponent } from './job-detail.component';

@NgModule({
  declarations: [JobDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: JobDetailComponent }
    ])
  ]
})
export class JobDetailModule {}
