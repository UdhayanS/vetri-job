import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
  
  ngOnInit(): void {
    this.title.setTitle('Privacy Policy - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Privacy Policy for Vetri Jobs - Learn how we collect, use, and protect your personal information.' });
  }
}
