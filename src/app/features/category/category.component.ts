import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  categoryName = '';
  categoryJobs: Job[] = [];
  allJobs: Job[] = [];
  otherCategories: { name: string; icon: string; count: number }[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'] || '';
      this.loadJobs();
    });
    
    this.loadAllJobsAndCategories();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getJobsByCategory(this.categoryName).subscribe(jobs => {
      this.categoryJobs = jobs;
      this.title.setTitle(`${this.categoryName} Jobs - Vetri Jobs`);
      this.meta.updateTag({ name: 'description', content: `Browse ${jobs.length} ${this.categoryName} job opportunities at Vetri Jobs.` });
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  loadAllJobsAndCategories(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.allJobs = jobs;
      this.calculateCategories();
      this.cdr.markForCheck();
    });
  }

  calculateCategories(): void {
    const categoryIcons: { [key: string]: string } = {
      'IT': '💻',
      'IT / Software': '💼',
      'Marketing': '📢',
      'Sales': '📈',
      'Finance': '💰',
      'Healthcare': '🏥',
      'Education': '🎓',
      'Engineering': '⚙️',
      'Design': '🎨',
      'Management': '📊',
      'Banking': '🏦',
      'HR': '👥',
      'Manufacturing': '🏭',
      'Retail': '🛒',
      'Media': '📺',
      'Government': '🏛️'
    };

    const categoryCounts = new Map<string, number>();
    this.allJobs.forEach(job => {
      const count = categoryCounts.get(job.category) || 0;
      categoryCounts.set(job.category, count + 1);
    });

    this.otherCategories = Array.from(categoryCounts.entries())
      .filter(([name]) => name !== this.categoryName)
      .map(([name, count]) => ({
        name,
        icon: categoryIcons[name] || '💼',
        count
      }))
      .slice(0, 8);
  }

  trackByFn(index: number, item: Job): string {
    return item.slug || index.toString();
  }
}
