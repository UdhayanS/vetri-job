import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../core/services/job.service';
import { BlogService } from '../../core/services/blog.service';
import { UtilityService } from '../../core/services/utility.service';
import { Job } from '../../core/models/job.model';
import { Blog } from '../../core/models/blog.model';

@Component({
  selector: 'app-job-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="job-detail-page" *ngIf="job; else notFound">
      <div class="job-header">
        <div class="header-bg"></div>
        <div class="container">
          <div class="breadcrumb">
            <a routerLink="/">Home</a>
            <span>/</span>
            <a routerLink="/jobs">Jobs</a>
            <span>/</span>
            <a [routerLink]="['/category', job.category]">{{ job.category }}</a>
          </div>
          
          <div class="job-title-section">
            <div class="company-header">
              <div class="company-logo" *ngIf="job.companyLogo">
                <img [src]="job.companyLogo" [alt]="job.company + ' logo'" onerror="this.style.display='none'">
              </div>
              <div class="company-info">
                <h1>{{ job.title }}</h1>
                <p class="company">{{ job.company }}</p>
              </div>
            </div>
            
            <div class="job-meta-grid">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💼</span>
                <span>{{ job.experience }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span>{{ job.salary }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📋</span>
                <span>{{ job.jobType }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">🏷️</span>
                <span>{{ job.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="job-layout">
          <main class="job-content">
            <article class="job-article">
              <section class="job-section" *ngIf="job.description">
                <h2>Job Description</h2>
                <div class="content" [innerHTML]="job.description"></div>
              </section>

              <section class="job-section" *ngIf="job.skills">
                <h2>Required Skills</h2>
                <div class="skills-text">{{ job.skills }}</div>
              </section>

              <section class="job-section" *ngIf="job.responsibilities">
                <h2>Requirements</h2>
                <ul class="content-list">
                  <li *ngFor="let item of parseList(job.responsibilities)">{{ item }}</li>
                </ul>
              </section>

              <section class="job-section" *ngIf="job.benefits">
                <h2>Benefits & Perks</h2>
                <ul class="benefits-list">
                  <li *ngFor="let benefit of parseList(job.benefits)">✓ {{ benefit }}</li>
                </ul>
              </section>

              <section class="job-section" *ngIf="job.selectionProcess">
                <h2>Selection Process</h2>
                <ul class="process-list">
                  <li *ngFor="let step of parseList(job.selectionProcess); let i = index">
                    <span class="step-number">{{ i + 1 }}</span>
                    <span>{{ step }}</span>
                  </li>
                </ul>
              </section>

              <section class="job-section" *ngIf="job.aboutCompany">
                <h2>About {{ job.company }}</h2>
                <div class="content" [innerHTML]="job.aboutCompany"></div>
              </section>
            </article>
          </main>

          <aside class="job-sidebar">
            <div class="apply-card">
              <div class="company-logo-card" *ngIf="job.companyLogo">
                <img [src]="job.companyLogo" [alt]="job.company + ' logo'" onerror="this.style.display='none'">
              </div>
              <div class="info-item">
                <span class="info-label">Salary</span>
                <span class="info-value">{{ job.salary }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Job Type</span>
                <span class="info-value">{{ job.jobType }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Experience</span>
                <span class="info-value">{{ job.experience }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Posted</span>
                <span class="info-value">{{ utilityService.formatLastDate(job.postedDate) }}</span>
              </div>
              <button (click)="openApplyPopup(job.applyLink)" class="apply-btn">
                Apply Now
              </button>
              <div class="share-section">
                <span class="share-label">Share:</span>
                <button class="share-btn whatsapp" (click)="shareOnWhatsApp()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </button>
                <button class="share-btn" (click)="copyLink()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section class="featured-jobs-section" *ngIf="featuredJobs.length > 0">
        <div class="container">
          <div class="section-header">
            <div class="section-title">
              <span class="featured-badge">⭐ Featured</span>
              <h2>More Featured Jobs</h2>
            </div>
            <a routerLink="/jobs" class="view-all">
              View All Jobs
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          
          <div class="jobs-grid">
            <app-job-card 
              *ngFor="let job of featuredJobs; trackBy: trackByFn"
              [job]="job">
            </app-job-card>
          </div>
        </div>
      </section>

      <section class="recent-blogs-section" *ngIf="recentBlogs.length > 0">
        <div class="container">
          <div class="section-header">
            <div class="section-title">
              <span class="blog-badge">📝 Latest</span>
              <h2>Recent Blogs</h2>
            </div>
            <a routerLink="/blogs" class="view-all">
              View All Blogs
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          
          <div class="blogs-grid">
            <article class="blog-card" *ngFor="let blog of recentBlogs; trackBy: trackByBlogFn">
              <a [routerLink]="['/blogs', blog.slug]" class="card-image">
                <img [src]="blog.featuredImage || 'https://placehold.co/600x400?text=Blog'" [alt]="blog.title" onerror="this.src='https://placehold.co/600x400?text=Blog'">
              </a>
              <div class="card-content">
                <div class="card-meta">
                  <span class="author">{{ blog.author }}</span>
                  <span class="date">{{ formatDate(blog.createdAt) }}</span>
                </div>
                <h3 class="card-title">
                  <a [routerLink]="['/blogs', blog.slug]">{{ blog.title }}</a>
                </h3>
                <div class="card-tags" *ngIf="blog.tags">
                  <span class="tag" *ngFor="let tag of parseTags(blog.tags)">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>

    <ng-template #notFound>
      <div class="not-found" *ngIf="!loading">
        <div class="not-found-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <h2>Job Not Found</h2>
        <p>The job you're looking for doesn't exist, has been removed, or the link might be incorrect.</p>
        <div class="not-found-actions">
          <a routerLink="/jobs" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Browse All Jobs
          </a>
          <a routerLink="/" class="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go Home
          </a>
        </div>
      </div>
    </ng-template>

    <app-loader *ngIf="loading"></app-loader>

    <div class="popup-overlay" *ngIf="showApplyPopup" (click)="closeApplyPopup()">
      <div class="popup-content" (click)="$event.stopPropagation()">
        <div class="popup-icon">☕</div>
        <h3>Buy me a Coffee</h3>
        <p>If this job helped you land your dream role, consider buying me a coffee! It keeps Vetri Jobs free & running. 🙏</p>
        <div class="popup-buttons">
          <button class="popup-btn next-time" (click)="proceedToApply()">
            Next Time 👋 Apply Now
          </button>
          <button class="popup-btn buy-coffee" (click)="buyMeCoffee()">
            ☕ Buy Me a Coffee
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .job-detail-page {
      min-height: 100vh;
      background: var(--bg-secondary);
    }
    
    .job-header {
      position: relative;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 2rem 1.5rem 3rem;
      overflow: hidden;
    }
    
    .job-header::before {
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
    
    .company-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .company-logo {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: var(--radius-lg);
      padding: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    .company-info h1 {
      font-size: 2.25rem;
      color: white;
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
    }
    
    .company {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 600;
    }
    
    .job-meta-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.15);
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      color: white;
      font-size: 0.875rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .meta-icon {
      font-size: 1rem;
    }
    
    .job-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      padding: 2rem 0;
      margin-top: -1rem;
    }
    
    .job-article {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    
    .job-section {
      margin-bottom: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid var(--border);
    }
    
    .job-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .job-section h2 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      font-weight: 700;
    }
    
    .content {
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 1rem;
    }
    
    .skills-text {
      color: var(--text-secondary);
      line-height: 1.8;
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: var(--radius);
      border-left: 4px solid var(--primary);
    }
    
    .content-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .content-list li {
      padding: 0.75rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: var(--text-secondary);
      line-height: 1.7;
    }
    
    .content-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary);
      font-weight: bold;
      font-size: 1.25rem;
    }
    
    .benefits-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.75rem;
    }
    
    .benefits-list li {
      padding: 0.75rem 1rem;
      background: var(--primary-glow);
      color: var(--success);
      border-radius: var(--radius);
      font-weight: 500;
    }
    
    .process-list {
      list-style: none;
      padding: 0;
      margin: 0;
      counter-reset: step;
    }
    
    .process-list li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      margin-bottom: 0.75rem;
      border-radius: var(--radius);
      counter-increment: step;
      color: var(--text-secondary);
      font-weight: 500;
    }
    
    .step-number {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
    }
    
    .job-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: sticky;
      top: 88px;
      height: fit-content;
    }
    
    .apply-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      text-align: center;
    }
    
    .company-logo-card {
      width: 80px;
      height: 80px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 0.75rem;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
    }
    
    .company-logo-card img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .info-item:last-of-type {
      border-bottom: none;
    }
    
    .info-label {
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .info-value {
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.875rem;
      text-align: right;
    }
    
    .apply-btn {
      display: block;
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: var(--radius);
      font-weight: 700;
      font-size: 1.0625rem;
      margin: 1rem 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px var(--primary-glow);
    }
    
    .apply-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
    
    .share-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border);
    }
    
    .share-label {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.875rem;
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
      border-color: #20BD5A;
    }
    
    .not-found {
      text-align: center;
      padding: 6rem 2rem;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      margin: 2rem 0;
      border: 1px solid var(--border);
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
      max-width: 400px;
      line-height: 1.6;
      font-size: 0.9375rem;
    }
    
    .not-found-actions {
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      font-weight: 600;
      font-size: 1rem;
      border-radius: var(--radius);
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
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
    
    .featured-jobs-section {
      padding: 4rem 0;
      background: var(--bg-primary);
      margin-top: 2rem;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .section-title {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .featured-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: fit-content;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }
    
    .section-title h2 {
      font-size: 1.75rem;
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
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      transition: all 0.2s ease;
      border: 2px solid var(--primary);
    }
    
    .view-all:hover {
      background: var(--primary);
      color: white;
    }
    
    .jobs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .recent-blogs-section {
      padding: 4rem 0;
      background: var(--bg-primary);
      margin-top: 2rem;
    }
    
    .blog-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: fit-content;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    
    .blogs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    
    .blog-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    
    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-glow);
    }
    
    .blog-card .card-image {
      display: block;
      height: 180px;
      overflow: hidden;
    }
    
    .blog-card .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .blog-card:hover .card-image img {
      transform: scale(1.05);
    }
    
    .blog-card .card-content {
      padding: 1.25rem;
    }
    
    .blog-card .card-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
    
    .blog-card .card-meta .author {
      font-weight: 600;
      color: var(--primary);
    }
    
    .blog-card .card-title {
      font-size: 1.0625rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
    }
    
    .blog-card .card-title a {
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .blog-card .card-title a:hover {
      color: var(--primary);
    }
    
    .blog-card .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }
    
    .blog-card .tag {
      padding: 0.25rem 0.5rem;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
    }
    
    .popup-content {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border);
      animation: popupSlide 0.3s ease;
    }
    
    @keyframes popupSlide {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .popup-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .popup-content h3 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin: 0 0 0.75rem 0;
      font-weight: 700;
    }
    
    .popup-content p {
      color: var(--text-secondary);
      margin: 0 0 1rem 0;
      line-height: 1.6;
      font-size: 0.9375rem;
    }
    
    .popup-subtext {
      font-size: 0.8125rem !important;
      font-style: italic;
      color: var(--text-muted) !important;
    }
    
    .popup-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .popup-btn {
      padding: 0.875rem 1.5rem;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }
    
    .popup-btn.next-time {
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 2px solid var(--border);
    }
    
    .popup-btn.next-time:hover {
      background: var(--bg-tertiary);
      border-color: var(--primary);
    }
    
    .popup-btn.buy-coffee {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
    }
    
    .popup-btn.buy-coffee:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(245, 158, 11, 0.4);
    }
    
    @media (max-width: 968px) {
      .job-layout {
        grid-template-columns: 1fr;
      }
      
      .job-sidebar {
        position: static;
      }
      
      .company-info h1 {
        font-size: 1.75rem;
      }
    }
    
    @media (max-width: 640px) {
      .container {
        padding: 0 0.75rem;
      }
      
      .job-header {
        padding: 1rem 0.75rem 1.5rem;
      }
      
      .breadcrumb {
        font-size: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .company-header {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .company-logo {
        width: 60px;
        height: 60px;
        padding: 0.5rem;
      }
      
      .company-info h1 {
        font-size: 1.25rem;
      }
      
      .company {
        font-size: 0.9375rem;
      }
      
      .job-meta-grid {
        gap: 0.375rem;
      }
      
      .meta-item {
        font-size: 0.75rem;
        padding: 0.375rem 0.5rem;
      }
      
      .job-layout {
        padding: 1rem 0;
        gap: 1rem;
      }
      
      .job-article {
        padding: 1rem;
        border-radius: var(--radius);
      }
      
      .job-section {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
      }
      
      .job-section h2 {
        font-size: 1.125rem;
        margin-bottom: 0.75rem;
      }
      
      .content {
        font-size: 0.875rem;
        line-height: 1.6;
      }
      
      .skills-text {
        padding: 1rem;
        font-size: 0.875rem;
      }
      
      .content-list li {
        padding: 0.5rem 0;
        padding-left: 1.25rem;
        font-size: 0.875rem;
      }
      
      .benefits-list li {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }
      
      .process-list li {
        padding: 0.75rem;
        font-size: 0.875rem;
      }
      
      .step-number {
        width: 28px;
        height: 28px;
        font-size: 0.75rem;
      }
      
      .apply-card {
        padding: 1rem;
      }
      
      .company-logo-card {
        width: 60px;
        height: 60px;
      }
      
      .info-item {
        padding: 0.5rem 0;
      }
      
      .info-label,
      .info-value {
        font-size: 0.8125rem;
      }
      
      .apply-btn {
        padding: 0.875rem;
        font-size: 1rem;
      }
      
      .not-found {
        padding: 3rem 1rem;
        margin: 1rem 0;
      }
      
      .not-found h2 {
        font-size: 1.5rem;
      }
      
      .not-found p {
        font-size: 0.875rem;
      }
      
      .not-found-actions {
        flex-direction: column;
        width: 100%;
      }
      
      .btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
      }
      
      .featured-jobs-section {
        padding: 2rem 0;
      }
      
      .section-header {
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .section-title h2 {
        font-size: 1.25rem;
      }
      
      .view-all {
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
      }
      
      .jobs-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .recent-blogs-section {
        padding: 2rem 0;
      }
      
      .blogs-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .blog-card .card-image {
        height: 160px;
      }
      
      .popup-content {
        padding: 1.5rem;
        margin: 1rem;
      }
      
      .popup-icon {
        font-size: 3rem;
      }
      
      .popup-content h3 {
        font-size: 1.25rem;
      }
      
      .popup-content p {
        font-size: 0.875rem;
      }
    }
  `]
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  featuredJobs: Job[] = [];
  recentBlogs: Blog[] = [];
  loading = true;
  showApplyPopup = false;
  pendingApplyLink = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private blogService: BlogService,
    public utilityService: UtilityService,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadJob(slug);
      }
    });
    
    this.loadFeaturedJobs();
    this.loadRecentBlogs();
  }

  loadJob(slug: string): void {
    this.loading = true;
    this.jobService.getJobBySlug(slug).subscribe(job => {
      this.job = job || null;
      this.loading = false;
      
      if (job) {
        const pageUrl = `https://vetrijobs.online/jobs/${job.slug}`;
        
        this.title.setTitle(`${job.title} - ${job.company} | Vetri Jobs`);
        this.meta.updateTag({ name: 'description', content: `${job.title} at ${job.company}. ${job.location}. ${job.experience}. Apply now!` });
        
        this.meta.updateTag({ property: 'og:title', content: `${job.title} at ${job.company}` });
        this.meta.updateTag({ property: 'og:description', content: `${job.location} | ${job.jobType} | ${job.experience} | Salary: ${job.salary}` });
        this.meta.updateTag({ property: 'og:url', content: pageUrl });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:image', content: job.companyLogo || 'https://vetrijobs.online/assets/images/vetrijobs-logo.png' });
        
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: `${job.title} at ${job.company}` });
        this.meta.updateTag({ name: 'twitter:description', content: `${job.location} | ${job.jobType} | ${job.experience}` });
        this.meta.updateTag({ name: 'twitter:image', content: job.companyLogo || 'https://vetrijobs.online/assets/images/vetrijobs-logo.png' });
        
        this.jobService.incrementViews(slug).subscribe();
      }
      
      this.cdr.markForCheck();
    });
  }

  loadFeaturedJobs(): void {
    this.jobService.getFeaturedJobs().subscribe(jobs => {
      this.featuredJobs = jobs.filter(j => j.slug !== this.job?.slug).slice(0, 3);
      this.cdr.markForCheck();
    });
  }

  loadRecentBlogs(): void {
    this.blogService.getLatestBlogs(3).subscribe(blogs => {
      this.recentBlogs = blogs;
      this.cdr.markForCheck();
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  parseTags(tags: string): string[] {
    return tags.split(',').map(tag => tag.trim()).slice(0, 3);
  }

  trackByBlogFn(index: number, item: Blog): string {
    return item.slug || index.toString();
  }

  parseList(text: string): string[] {
    return this.utilityService.parseList(text);
  }

  shareOnWhatsApp(): void {
    if (!this.job) return;
    const text = this.utilityService.generateWhatsAppShareText(this.job);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  copyLink(): void {
    if (!this.job) return;
    const url = this.utilityService.generateCanonicalUrl(this.job.slug);
    const text = `Check out this job: ${this.job.title} at ${this.job.company}\n\n${url}\n\nJoin our WhatsApp Channel for more jobs: https://whatsapp.com/channel/0029VbCB3VNI7BeGcd0uji3O`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  openApplyPopup(link: string): void {
    this.pendingApplyLink = link;
    this.showApplyPopup = true;
  }

  closeApplyPopup(): void {
    this.showApplyPopup = false;
    this.pendingApplyLink = '';
  }

  proceedToApply(): void {
    if (this.pendingApplyLink) {
      window.open(this.pendingApplyLink, '_blank');
    }
    this.closeApplyPopup();
  }

  buyMeCoffee(): void {
    window.open('https://buymeacoffee.com/udhayan_sk7', '_blank');
    this.closeApplyPopup();
  }

  trackByFn(index: number, item: Job): string {
    return item.slug || index.toString();
  }
}
