import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('About Us - VetriJobs');
    this.meta.updateTag({ name: 'description', content: 'Learn about VetriJobs - our mission, values, and commitment to helping you find your dream job.' });
  }
}
