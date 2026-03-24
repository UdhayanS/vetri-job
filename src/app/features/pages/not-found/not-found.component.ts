import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
  
  ngOnInit(): void {
    this.title.setTitle('404 - Page Not Found - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'The page you are looking for could not be found.' });
  }
}
