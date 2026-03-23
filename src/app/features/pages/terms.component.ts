import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
  
  ngOnInit(): void {
    this.title.setTitle('Terms of Service - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Terms of Service for Vetri Jobs - Read our terms and conditions for using our website.' });
  }
}
