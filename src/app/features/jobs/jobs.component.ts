import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent implements OnInit {
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  paginatedJobs: Job[] = [];
  latestJobs: Job[] = [];
  categories: string[] = [];
  locations: string[] = [];
  experienceLevels = ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'];
  totalJobs = 0;
  loading = true;

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  locationControl = new FormControl('');
  experienceControl = new FormControl('');
  sortControl = new FormControl('latest');

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Browse Jobs - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Browse job opportunities at Vetri Jobs.' });

    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchControl.setValue(params['search']);
        setTimeout(() => this.applyFilters(), 0);
      }
    });

    this.loadJobs();
    this.setupFilters();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getAllJobs().subscribe(jobs => {
      this.allJobs = jobs.filter(job => job.status.toLowerCase() === 'active');
      this.totalJobs = this.allJobs.length;
      
      const sortedByDate = [...this.allJobs].sort((a, b) => 
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
      this.latestJobs = sortedByDate.slice(0, 5);
      this.filteredJobs = sortedByDate;

      const categorySet = new Set(jobs.map(j => j.category).filter(Boolean));
      this.categories = Array.from(categorySet).sort();
      
      const locationSet = new Set(jobs.map(j => j.location).filter(Boolean));
      this.locations = Array.from(locationSet).sort();
      
      this.currentPage = 1;
      this.updatePaginatedJobs();
      
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  setupFilters(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith('')),
      this.categoryControl.valueChanges.pipe(startWith('')),
      this.locationControl.valueChanges.pipe(startWith('')),
      this.experienceControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    const category = this.categoryControl.value || '';
    const location = this.locationControl.value || '';
    const experience = this.experienceControl.value || '';

    this.filteredJobs = this.allJobs.filter(job => {
      const matchesSearch = !search || 
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search);
      
      const matchesCategory = !category || job.category.toLowerCase() === category.toLowerCase();
      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
      const matchesExperience = !experience || job.experience.toLowerCase().includes(experience.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
    });

    this.filteredJobs = this.filteredJobs
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    
    this.currentPage = 1;
    this.updatePaginatedJobs();
    this.cdr.markForCheck();
  }

  updatePaginatedJobs(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedJobs = this.filteredJobs.slice(start, end);
    this.totalPages = Math.ceil(this.filteredJobs.length / this.itemsPerPage) || 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedJobs();
      this.cdr.markForCheck();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch(query: string): void {
    this.searchControl.setValue(query);
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.categoryControl.setValue('');
    this.locationControl.setValue('');
    this.experienceControl.setValue('');
    this.sortControl.setValue('latest');
    this.loadJobs();
  }

  trackByFn(index: number, item: Job): string {
    return item.slug || index.toString();
  }
}