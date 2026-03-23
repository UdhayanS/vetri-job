import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { JobsComponent } from './jobs.component';

@NgModule({
  declarations: [JobsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: JobsComponent }
    ])
  ]
})
export class JobsModule {}
