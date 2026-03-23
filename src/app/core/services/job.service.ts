import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { Job, ApiResponse, PostRequest } from '../models/job.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsCache$: Observable<Job[]> | null = null;

  private apiUrl = environment.apiUrl;

  constructor(private baseApi: BaseApiService, private http: HttpClient) {}

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
  const data: PostRequest = { slug };
  return this.http.post(this.apiUrl, data, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
subscribeEmail(email: string): Observable<any> {
  const body = JSON.stringify({ email, source: 'website' });
  return this.http.post(this.apiUrl, body, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
sendContactForm(formData: { name: string; email: string; subject: string; message: string }): Observable<any> {
  const body = JSON.stringify(formData);
  return this.http.post(this.apiUrl, body, {
    headers: { 'Content-Type': 'text/plain' }
  });
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
