import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BlogService } from '../../../core/services/blog.service';
import { JobService } from '../../../core/services/job.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Blog } from '../../../core/models/blog.model';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-blog-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="blog-detail-page">
      <div class="blog-header" *ngIf="blog; else headerSkeleton">
        <div class="header-bg"></div>
        <div class="container">
          <div class="breadcrumb">
            <a routerLink="/">Home</a>
            <span>/</span>
            <a routerLink="/blogs">Blog</a>
            <span>/</span>
            <span>{{ blog.title }}</span>
          </div>
          
          <div class="header-content">
            <h1>{{ blog.title }}</h1>
            <div class="header-meta">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {{ blog.author }}
              </span>
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ utilityService.formatBlogDate(blog.createdAt) }}
              </span>
            </div>
            <div class="header-tags" *ngIf="blog.tags">
              <span class="tag" *ngFor="let tag of parseTags(blog.tags)">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <ng-template #headerSkeleton>
        <div class="blog-header skeleton-header">
          <div class="header-bg"></div>
          <div class="container">
            <div class="breadcrumb-skeleton">
              <div class="skeleton-line short"></div>
            </div>
            <div class="header-skeleton">
              <div class="skeleton-title"></div>
              <div class="skeleton-meta"></div>
            </div>
          </div>
        </div>
      </ng-template>

      <div class="container">
        <div class="blog-layout">
          <main class="blog-content" *ngIf="blog; else contentSkeleton">
            <article class="blog-article">
              <div class="featured-image" *ngIf="blog.featuredImage">
                <img [src]="blog.featuredImage" [alt]="blog.title">
              </div>

              <div class="article-content" [innerHTML]="blog.content"></div>

              <footer class="article-footer">
                <div class="share-section">
                  <span class="share-label">Share this article:</span>
                  <div class="share-buttons">
                    <button class="share-btn" (click)="copyLink()" title="Copy link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </button>
                    <button class="share-btn whatsapp" (click)="shareOnWhatsApp()" title="Share on WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </footer>
            </article>

            <section class="related-blogs" *ngIf="relatedBlogs.length > 0">
              <div class="section-header">
                <h2>Related Articles</h2>
                <a routerLink="/blogs" class="view-all">
                  View All
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div class="related-grid">
                <article class="related-card" *ngFor="let related of relatedBlogs">
                  <a [routerLink]="['/blogs', related.slug]" class="card-link">
                    <div class="card-image" *ngIf="related.featuredImage">
                      <img [src]="related.featuredImage" [alt]="related.title" onerror="this.style.display='none'">
                    </div>
                    <div class="card-content">
                      <span class="card-date">{{ utilityService.formatBlogDate(related.createdAt) }}</span>
                      <h3 class="card-title">{{ related.title }}</h3>
                      <span class="card-author">by {{ related.author }}</span>
                    </div>
                  </a>
                </article>
              </div>
            </section>
          </main>

          <ng-template #contentSkeleton>
            <main class="blog-content">
              <div class="blog-article skeleton-article">
                <div class="skeleton-image"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
              </div>
            </main>
          </ng-template>

          <aside class="blog-sidebar">
            <div class="sidebar-section">
              <h3>Latest Jobs</h3>
              <div class="latest-jobs-list">
                <a *ngFor="let job of latestJobs" [routerLink]="['/jobs', job.slug]" class="latest-job-item">
                  <div class="job-info">
                    <span class="latest-job-company">{{ job.company }}</span>
                    <span class="latest-job-title">{{ job.title }}</span>
                    <span class="latest-job-date">{{ job.postedDate | date:'mediumDate' }}</span>
                  </div>
                  <div class="job-logo" *ngIf="job.companyLogo">
                    <img [src]="job.companyLogo" [alt]="job.company" onerror="this.style.display='none'">
                  </div>
                </a>
              </div>
            </div>

            <div class="sidebar-section">
              <a routerLink="/categories" class="sidebar-link">Browse Categories</a>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <div class="not-found-overlay" *ngIf="!loading && !blog">
      <div class="not-found">
        <div class="not-found-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        </div>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <div class="not-found-actions">
          <a routerLink="/blogs" class="btn btn-primary">
            Browse All Articles
          </a>
          <a routerLink="/" class="btn btn-secondary">
            Go Home
          </a>
        </div>
      </div>
    </div>

    <app-loader *ngIf="loading"></app-loader>
  `,
  styles: [`
    .blog-detail-page {
      min-height: 100vh;
      background: var(--bg-secondary);
    }

    .blog-header {
      position: relative;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 2rem 0 3rem;
      overflow: hidden;
    }

    .blog-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
    }

    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      position: relative;
      z-index: 1;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .breadcrumb a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .breadcrumb a:hover {
      color: white;
    }

    .breadcrumb span {
      color: rgba(255, 255, 255, 0.5);
    }

    .header-content {
      color: white;
    }

    .header-content h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: white;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .header-meta {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .header-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      padding: 0.375rem 0.875rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
      backdrop-filter: blur(10px);
    }

    .blog-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 2rem;
      padding: 2rem 0;
    }

    .blog-content {
      min-width: 0;
    }

    .blog-article {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }

    .featured-image {
      width: 100%;
      max-height: 450px;
      overflow: hidden;
    }

    .featured-image img {
      width: 100%;
      height: 100%;
      max-height: 450px;
      object-fit: cover;
    }

    .article-content {
      padding: 2rem;
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 1.0625rem;
    }

    :host ::ng-deep .article-content h2,
    :host ::ng-deep .article-content h3 {
      color: var(--text-primary);
      margin: 2rem 0 1rem 0;
      font-weight: 700;
    }

    :host ::ng-deep .article-content p {
      margin-bottom: 1.5rem;
    }

    :host ::ng-deep .article-content ul,
    :host ::ng-deep .article-content ol {
      margin: 1.5rem 0;
      padding-left: 1.5rem;
    }

    :host ::ng-deep .article-content li {
      margin-bottom: 0.5rem;
    }

    :host ::ng-deep .article-content img {
      max-width: 100%;
      height: auto;
      border-radius: var(--radius);
      margin: 1.5rem 0;
    }

    :host ::ng-deep .article-content a {
      color: var(--primary);
      text-decoration: none;
    }

    :host ::ng-deep .article-content a:hover {
      text-decoration: underline;
    }

    :host ::ng-deep .article-content blockquote {
      border-left: 4px solid var(--primary);
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: var(--text-muted);
    }

    .article-footer {
      padding: 1.5rem 2rem;
      border-top: 1px solid var(--border);
    }

    .share-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .share-label {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.9375rem;
    }

    .share-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .share-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text-primary);
    }

    .share-btn:hover {
      background: var(--bg-tertiary);
      border-color: var(--primary);
    }

    .share-btn.whatsapp {
      background: #25D366;
      border-color: #25D366;
      color: white;
    }

    .share-btn.whatsapp:hover {
      background: #20BD5A;
    }

    .related-blogs {
      margin-top: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    .view-all {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .view-all:hover {
      transform: translateX(4px);
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .related-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
      transition: all var(--transition-normal);
    }

    .related-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--primary);
    }

    .related-card .card-link {
      text-decoration: none;
      display: block;
    }

    .related-card .card-image {
      width: 100%;
      height: 150px;
      overflow: hidden;
    }

    .related-card .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .related-card:hover .card-image img {
      transform: scale(1.05);
    }

    .related-card .card-content {
      padding: 1.25rem;
    }

    .related-card .card-date {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 0.5rem;
    }

    .related-card .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .related-card .card-author {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .blog-sidebar {
      position: sticky;
      top: 88px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .sidebar-section {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1rem;
      border: 1px solid var(--border);
    }

    .sidebar-section h3 {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.75rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border);
    }

    .latest-jobs-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .latest-job-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: var(--radius);
      transition: background 0.2s ease;
    }

    .latest-job-item:hover {
      background: var(--bg-tertiary);
    }

    .job-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      min-width: 0;
    }

    .latest-job-company {
      font-size: 0.6875rem;
      color: var(--primary);
      font-weight: 600;
      text-transform: uppercase;
    }

    .latest-job-title {
      font-size: 0.8125rem;
      color: var(--text-primary);
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .latest-job-date {
      font-size: 0.6875rem;
      color: var(--text-muted);
    }

    .job-logo {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .job-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .sidebar-link {
      display: block;
      text-align: center;
      color: var(--primary);
      font-size: 0.8125rem;
      font-weight: 600;
      text-decoration: none;
      padding: 0.75rem;
      border-radius: var(--radius);
      transition: background 0.2s ease;
    }

    .sidebar-link:hover {
      background: var(--primary-glow);
    }

    .not-found-overlay {
      padding: 4rem 1.5rem;
    }

    .not-found {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      max-width: 500px;
      margin: 0 auto;
    }

    .not-found-icon {
      color: var(--text-muted);
      opacity: 0.5;
      margin-bottom: 1.5rem;
    }

    .not-found h2 {
      font-size: 1.75rem;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      font-weight: 700;
    }

    .not-found p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
      font-size: 0.9375rem;
    }

    .not-found-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      border-radius: var(--radius);
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--primary-glow);
    }

    .btn-secondary {
      background: var(--card-bg);
      color: var(--text-primary);
      border: 2px solid var(--border);
    }

    .btn-secondary:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .skeleton-header {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    }

    .skeleton-line,
    .skeleton-title,
    .skeleton-meta,
    .skeleton-image {
      background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--radius);
    }

    .skeleton-article {
      padding: 2rem;
    }

    .skeleton-line {
      height: 16px;
      margin-bottom: 1rem;
    }

    .skeleton-line.short {
      width: 60%;
    }

    .skeleton-title {
      height: 32px;
      width: 80%;
      margin-bottom: 1rem;
    }

    .skeleton-meta {
      height: 20px;
      width: 40%;
    }

    .skeleton-image {
      width: 100%;
      height: 300px;
      margin-bottom: 1.5rem;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (max-width: 1024px) {
      .blog-layout {
        grid-template-columns: 1fr;
      }

      .blog-sidebar {
        position: static;
      }

      .jobs-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .related-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .header-content h1 {
        font-size: 1.75rem;
      }

      .header-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .blog-layout {
        padding: 1.5rem 0;
      }

      .featured-image {
        max-height: 250px;
      }

      .article-content {
        padding: 1.5rem;
        font-size: 1rem;
      }

      .jobs-list {
        grid-template-columns: 1fr;
      }

      .related-grid {
        grid-template-columns: 1fr;
      }

      .not-found-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .header-content h1 {
        font-size: 1.5rem;
      }

      .featured-image {
        max-height: 200px;
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  relatedBlogs: Blog[] = [];
  latestJobs: Job[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private jobService: JobService,
    public utilityService: UtilityService,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLatestJobs();
    
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadBlog(slug);
      }
    });
  }

  loadLatestJobs(): void {
    this.jobService.getLatestJobs(5).subscribe(jobs => {
      this.latestJobs = jobs;
      this.cdr.markForCheck();
    });
  }

  loadBlog(slug: string): void {
    this.loading = true;
    this.blogService.getBlogBySlug(slug).subscribe(blog => {
      this.blog = blog || null;
      this.loading = false;

      if (blog) {
        const pageUrl = this.utilityService.generateBlogCanonicalUrl(blog.slug);

        this.title.setTitle(blog.metaTitle || `${blog.title} | VetriJobs Blog`);
        this.meta.updateTag({ name: 'description', content: blog.metaDescription || blog.title });

        this.meta.updateTag({ property: 'og:title', content: blog.metaTitle || blog.title });
        this.meta.updateTag({ property: 'og:description', content: blog.metaDescription || '' });
        this.meta.updateTag({ property: 'og:url', content: pageUrl });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:image', content: blog.featuredImage || 'https://vetrijobs.online/assets/images/vetrijobs-logo.png' });

        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: blog.metaTitle || blog.title });
        this.meta.updateTag({ name: 'twitter:description', content: blog.metaDescription || '' });
        this.meta.updateTag({ name: 'twitter:image', content: blog.featuredImage || 'https://vetrijobs.online/assets/images/vetrijobs-logo.png' });

        this.loadRelatedBlogs(blog.tags, blog.slug);
      }

      this.cdr.markForCheck();
    });
  }

  loadRelatedBlogs(tags: string, currentSlug: string): void {
    this.blogService.getRelatedBlogs(tags, currentSlug).subscribe(blogs => {
      this.relatedBlogs = blogs;
      this.cdr.markForCheck();
    });
  }

  parseTags(tagsString: string): string[] {
    return this.utilityService.parseTags(tagsString);
  }

  copyLink(): void {
    if (!this.blog) return;
    const url = this.utilityService.generateBlogCanonicalUrl(this.blog.slug);
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  shareOnWhatsApp(): void {
    if (!this.blog) return;
    const url = this.utilityService.generateBlogCanonicalUrl(this.blog.slug);
    const message = `${this.blog.title}\n\nRead more: ${url}\n\nFor more job updates, Join our WhatsApp Channel: https://whatsapp.com/channel/0029VbCB3VNI7BeGcd0uji3O`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }
}