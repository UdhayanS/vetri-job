import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  template: `
    <app-about *ngIf="currentPage === 'about'"></app-about>
    <app-contact *ngIf="currentPage === 'contact'"></app-contact>
    <app-privacy-policy *ngIf="currentPage === 'privacy-policy'"></app-privacy-policy>
    <app-terms *ngIf="currentPage === 'terms'"></app-terms>
    <app-disclaimer *ngIf="currentPage === 'disclaimer'"></app-disclaimer>
    <app-sitemap *ngIf="currentPage === 'sitemap'"></app-sitemap>
    <app-not-found *ngIf="currentPage === '404'"></app-not-found>
  `
})
export class PagesComponent implements OnInit {
  currentPage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentPage = this.route.snapshot.data['page'] || '404';
  }
}
