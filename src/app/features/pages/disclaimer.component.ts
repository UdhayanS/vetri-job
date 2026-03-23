import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Disclaimer - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Disclaimer for Vetri Jobs - Important information about the use of our website and job listings.' });
  }
}