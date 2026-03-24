import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BlogService } from '../../../core/services/blog.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Blog } from '../../../core/models/blog.model';
import { BlogLoaderComponent } from './blog-loader.component';

@Component({
  selector: 'app-blog-list',
  template: `
    <div class="blogs-page">
      <div class="page-header">
        <div class="header-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="container">
          <div class="header-content">
            <h1>VetriJobs Blog</h1>
            <p class="subtitle">Career insights, job tips, and industry updates</p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="search-section">
          <div class="search-wrapper">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearch()"
              placeholder="Search articles..."
              class="search-input">
          </div>
        </div>

        <div class="blogs-grid" *ngIf="!loading">
          <article class="blog-card" *ngFor="let blog of filteredBlogs; trackBy: trackByFn">
            <a [routerLink]="['/blogs', blog.slug]" class="card-link">
              <div class="card-image" *ngIf="blog.featuredImage">
                <img [src]="blog.featuredImage" [alt]="blog.title" onerror="this.style.display='none'">
              </div>
              <div class="card-image placeholder" *ngIf="!blog.featuredImage">
                <span class="placeholder-icon">📝</span>
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="author">{{ blog.author }}</span>
                  <span class="separator">•</span>
                  <span class="date">{{ utilityService.formatBlogDate(blog.createdAt) }}</span>
                </div>
                <h2 class="card-title">{{ blog.title }}</h2>
                <p class="card-excerpt" *ngIf="blog.metaDescription">{{ blog.metaDescription }}</p>
                <div class="card-tags" *ngIf="blog.tags">
                  <span class="tag" *ngFor="let tag of parseTags(blog.tags)">{{ tag }}</span>
                </div>
              </div>
            </a>
          </article>
        </div>

        <div class="loading-blogs" *ngIf="loading">
          <app-blog-loader></app-blog-loader>
        </div>

        <div class="no-results" *ngIf="!loading && filteredBlogs.length === 0">
          <div class="no-results-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <h3>No articles found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blogs-page {
      min-height: 100vh;
      background: var(--bg-secondary);
    }

    .page-header {
      position: relative;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%);
      padding: 4rem 1.5rem;
      text-align: center;
      overflow: hidden;
    }

    .page-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 25%),
        radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.12) 0%, transparent 25%);
      animation: floatBg 20s ease-in-out infinite;
    }

    @keyframes floatBg {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(2%, 1%) rotate(1deg); }
      66% { transform: translate(-1%, 2%) rotate(-1deg); }
    }

    .header-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.5;
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
      top: -100px;
      right: -50px;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), transparent);
      bottom: 10%;
      left: -50px;
      animation-delay: -2s;
    }

    .shape-3 {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
      top: 40%;
      right: 10%;
      animation-delay: -4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .page-header .container {
      position: relative;
      z-index: 1;
    }

    .header-content {
      text-align: center;
    }

    .header-content h1 {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
    }

    .search-section {
      margin-bottom: 2rem;
    }

    .search-wrapper {
      position: relative;
      max-width: 500px;
      margin: 0 auto;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      font-size: 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--card-bg);
      color: var(--text-primary);
      transition: all var(--transition-fast);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .blogs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .blog-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
      transition: all var(--transition-normal);
    }

    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--primary);
    }

    .card-link {
      text-decoration: none;
      display: block;
    }

    .card-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .blog-card:hover .card-image img {
      transform: scale(1.05);
    }

    .card-image.placeholder {
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .placeholder-icon {
      font-size: 3rem;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }

    .separator {
      color: var(--border);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.75rem 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-excerpt {
      font-size: 0.9375rem;
      color: var(--text-secondary);
      margin: 0 0 1rem 0;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      padding: 0.25rem 0.75rem;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
      transition: all var(--transition-fast);
    }

    .blog-card:hover .tag {
      background: var(--primary-glow);
      color: var(--primary);
    }

    .loading-blogs {
      display: flex;
      justify-content: center;
      padding: 4rem 2rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
    }

    .no-results-icon {
      color: var(--text-muted);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .no-results h3 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .no-results p {
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .header-content h1 {
        font-size: 2.25rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .page-header {
        padding: 3.5rem 1rem;
      }

      .blogs-grid {
        grid-template-columns: 1fr;
      }

      .container {
        padding: 2rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .header-content h1 {
        font-size: 1.875rem;
      }

      .card-image {
        height: 180px;
      }
    }
  `]
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  loading = true;
  searchQuery = '';

  constructor(
    private blogService: BlogService,
    public utilityService: UtilityService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Blog - Career Insights & Job Tips | VetriJobs');
    this.meta.updateTag({ name: 'description', content: 'Read the latest career insights, job search tips, and industry updates on the VetriJobs blog.' });

    this.blogService.getAllBlogs().subscribe({
      next: (blogs) => {
        console.log('Blogs loaded:', blogs);
        this.blogs = blogs;
        this.filteredBlogs = this.blogs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.blogs = [];
        this.filteredBlogs = [];
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredBlogs = this.blogs;
      return;
    }

    const searchTerm = this.searchQuery.toLowerCase();
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.tags.toLowerCase().includes(searchTerm) ||
      blog.metaDescription?.toLowerCase().includes(searchTerm)
    );
  }

  parseTags(tagsString: string): string[] {
    return this.utilityService.parseTags(tagsString);
  }

  trackByFn(index: number, item: Blog): string {
    return item.slug || index.toString();
  }
}