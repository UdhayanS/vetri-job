import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { Job, ApiResponse } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsCache$: Observable<Job[]> | null = null;

  constructor(private baseApi: BaseApiService) {}

  getAllJobs(): Observable<Job[]> {
    if (!this.jobsCache$) {
      this.jobsCache$ = this.baseApi.get<ApiResponse<Job>>({ action: 'getJobs' }).pipe(
        map(response => response.data || []),
        shareReplay(1)
      );
    }
    return this.jobsCache$;
  }

  getJobBySlug(slug: string): Observable<Job | undefined> {
    return this.getAllJobs().pipe(
      map(jobs => jobs.find(job => job.slug === slug))
    );
  }

  getJobsByCategory(category: string): Observable<Job[]> {
    return this.getAllJobs().pipe(
      map(jobs => jobs.filter(job => 
        job.category.toLowerCase() === category.toLowerCase() &&
        job.status.toLowerCase() === 'active'
      ).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()))
    );
  }

  searchJobs(query: string): Observable<Job[]> {
    const searchTerm = query.toLowerCase();
    return this.getAllJobs().pipe(
      map(jobs => jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.skills.toLowerCase().includes(searchTerm) ||
        job.tags.toLowerCase().includes(searchTerm)
      ).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()))
    );
  }

  getFeaturedJobs(): Observable<Job[]> {
    return this.getAllJobs().pipe(
      map(jobs => jobs.filter(job => 
        job.featured.toLowerCase() === 'yes' &&
        job.status.toLowerCase() === 'active'
      ).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()).slice(0, 6))
    );
  }

  getLatestJobs(limit: number = 10): Observable<Job[]> {
    return this.getAllJobs().pipe(
      map(jobs => {
        const activeJobs = jobs.filter(job => job.status.toLowerCase() === 'active');
        return activeJobs
          .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
          .slice(0, limit);
      })
    );
  }

  incrementViews(slug: string): Observable<any> {
    return this.baseApi.post({ slug });
  }

  subscribeEmail(email: string): Observable<any> {
    return this.baseApi.post({ email, source: 'website' });
  }

  sendContactForm(formData: { name: string; email: string; subject: string; message: string }): Observable<any> {
    return this.baseApi.post(formData);
  }

  getCategories(): Observable<string[]> {
    return this.getAllJobs().pipe(
      map(jobs => {
        const categories = new Set(jobs.map(job => job.category).filter(Boolean));
        return Array.from(categories).sort();
      })
    );
  }
}