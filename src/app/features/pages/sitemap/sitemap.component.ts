import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sitemap',
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Sitemap</h1>
      </div>
      <div class="container">
        <div class="content">
          <section>
            <h2>Main Pages</h2>
            <ul class="sitemap-list">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/jobs">All Jobs</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
            </ul>
          </section>

          <section>
            <h2>Job Categories</h2>
            <ul class="sitemap-list">
              <li><a routerLink="/category/IT">IT Jobs</a></li>
              <li><a routerLink="/category/Software">Software Jobs</a></li>
              <li><a routerLink="/category/Engineering">Engineering Jobs</a></li>
              <li><a routerLink="/category/Marketing">Marketing Jobs</a></li>
              <li><a routerLink="/category/Sales">Sales Jobs</a></li>
              <li><a routerLink="/category/Finance">Finance Jobs</a></li>
            </ul>
          </section>

          <section>
            <h2>Legal</h2>
            <ul class="sitemap-list">
              <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
              <li><a routerLink="/terms">Terms of Service</a></li>
              <li><a routerLink="/disclaimer">Disclaimer</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height: 100vh; background: var(--bg-secondary); }
    .page-header { background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white; padding: 3rem 1.5rem; text-align: center; }
    .page-header h1 { font-size: 2.5rem; margin: 0; }
    .container { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem; }
    .content { background: var(--card-bg); border-radius: 12px; padding: 2rem; box-shadow: var(--shadow); border: 1px solid var(--border); }
    section { margin-bottom: 2rem; }
    section:last-child { margin-bottom: 0; }
    h2 { color: var(--text-primary); font-size: 1.5rem; margin-bottom: 1rem; }
    .sitemap-list { list-style: none; padding: 0; margin: 0; }
    li { margin-bottom: 0.75rem; }
    a { color: var(--primary); text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
  `]
})
export class SitemapComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
  ngOnInit(): void {
    this.title.setTitle('Sitemap - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Sitemap for Vetri Jobs - Find all pages and job categories.' });
  }
}
