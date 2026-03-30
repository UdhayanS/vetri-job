import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    JobCardComponent,
    LoaderComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    HeaderComponent,
    FooterComponent,
    JobCardComponent,
    LoaderComponent,
    SearchBarComponent
  ]
})
export class SharedModule {}
