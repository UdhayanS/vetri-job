import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { TermsComponent } from './terms.component';
import { DisclaimerComponent } from './disclaimer.component';
import { SitemapComponent } from './sitemap.component';
import { NotFoundComponent } from './not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent }
];

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    DisclaimerComponent,
    SitemapComponent,
    NotFoundComponent,
    PagesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule {}
