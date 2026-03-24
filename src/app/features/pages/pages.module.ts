import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
