import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit {
  categories: { name: string; icon: string; count: number }[] = [];
  allJobs: Job[] = [];

  constructor(
    private jobService: JobService,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Job Categories - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Browse job opportunities across diverse industries including IT, Marketing, Sales, Healthcare, and more at Vetri Jobs.' });
    this.loadCategories();
  }

  loadCategories(): void {
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
      'Government': '🏛️',
      'Legal': '⚖️',
      'Hospitality': '🏨',
      'Transportation': '🚚',
      'Real Estate': '🏠',
      'Telecommunications': '📡',
      'Pharmaceutical': '💊',
      'Consulting': '🎯',
      'Research': '🔬'
    };

    const categoryCounts = new Map<string, number>();
    this.allJobs.forEach(job => {
      const count = categoryCounts.get(job.category) || 0;
      categoryCounts.set(job.category, count + 1);
    });

    this.categories = Array.from(categoryCounts.entries())
      .map(([name, count]) => ({
        name,
        icon: categoryIcons[name] || '💼',
        count
      }))
      .sort((a, b) => b.count - a.count);
  }

  trackByFn(index: number, item: { name: string }): string {
    return item.name;
  }
}
