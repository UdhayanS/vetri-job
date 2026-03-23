import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  featuredJobs: Job[] = [];
  latestJobs: Job[] = [];
  categories: { name: string; icon: string; count: number }[] = [];
  trendingTags = ['Software Engineer', 'Data Analyst', 'Digital Marketing', 'Frontend Developer', 'Business Development', 'Content Writer'];
  loading = true;

  constructor(
    private jobService: JobService,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Vetri Jobs - Find Your Dream Job in India');
    this.meta.updateTag({ name: 'description', content: 'Connect with top employers and discover thousands of job opportunities tailored for your skills and career goals at Vetri Jobs.' });
    
    this.loadData();
  }

  loadData(): void {
    this.jobService.getFeaturedJobs().subscribe(featured => {
      this.featuredJobs = featured;
      this.cdr.markForCheck();
    });
    
    this.jobService.getLatestJobs(6).subscribe(latest => {
      this.latestJobs = latest;
      this.cdr.markForCheck();
    });
    
    this.jobService.getAllJobs().subscribe(jobs => {
      const categoryCounts = new Map<string, number>();
      jobs.forEach(job => {
        const count = categoryCounts.get(job.category) || 0;
        categoryCounts.set(job.category, count + 1);
      });
      
      this.categories = [
        { name: 'IT', icon: '💻', count: categoryCounts.get('IT') || 0 },
        { name: 'IT / Software', icon: '💼', count: categoryCounts.get('IT / Software') || 0 }
      ];
      
      const otherCategories = Array.from(categoryCounts.entries())
        .filter(([name]) => name !== 'IT' && name !== 'IT / Software')
        .slice(0, 6);
      
      const categoryIcons: { [key: string]: string } = {
        'Marketing': '📢',
        'Sales': '📈',
        'Finance': '💰',
        'Healthcare': '🏥',
        'Education': '🎓',
        'Engineering': '⚙️',
        'Design': '🎨',
        'Management': '📊'
      };
      
      otherCategories.forEach(([name, count]) => {
        this.categories.push({
          name,
          icon: categoryIcons[name] || '💼',
          count
        });
      });
      
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  onSearch(query: string): void {
    if (query && query.trim()) {
      this.router.navigate(['/jobs'], { queryParams: { search: query.trim() } });
    }
  }

  trackByFn(index: number, item: any): string {
    return item.slug || index.toString();
  }
}
