import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Blog, ApiResponse } from '../models/blog.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsCache$: Observable<Blog[]> | null = null;
  private blogsApiUrl = environment.blogsApiUrl;

  constructor() {}

  private async fetchBlogs(): Promise<Blog[]> {
    try {
      const response = await fetch(this.blogsApiUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
      });

      if (!response.ok) {
        console.error('Fetch error:', response.status, response.statusText);
        return [];
      }

      const text = await response.text();
      
      // Try to parse as JSON
      try {
        const parsed = JSON.parse(text);
        
        // Check if data is in various possible formats
        if (Array.isArray(parsed)) {
          return parsed;
        }
        if (parsed.data && Array.isArray(parsed.data)) {
          return parsed.data;
        }
        if (parsed.blogs && Array.isArray(parsed.blogs)) {
          return parsed.blogs;
        }
        if (parsed.articles && Array.isArray(parsed.articles)) {
          return parsed.articles;
        }
        if (typeof parsed === 'object' && parsed !== null) {
          // Maybe it's a single object or has data somewhere
          const values = Object.values(parsed);
          const arrayValue = values.find(v => Array.isArray(v));
          if (arrayValue) {
            return arrayValue as Blog[];
          }
        }
        
        console.warn('Unexpected API response structure:', parsed);
        return [];
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Raw text:', text.substring(0, 500));
        return [];
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      return [] as Blog[];
    }
  }

  getAllBlogs(): Observable<Blog[]> {
    if (!this.blogsCache$) {
      this.blogsCache$ = from(this.fetchBlogs()).pipe(
        shareReplay(1),
        catchError(() => of([]))
      );
    }
    return this.blogsCache$;
  }

  getBlogBySlug(slug: string): Observable<Blog | undefined> {
    return this.getAllBlogs().pipe(
      map(blogs => blogs.find(blog => blog.slug === slug))
    );
  }

  searchBlogs(query: string): Observable<Blog[]> {
    const searchTerm = query.toLowerCase();
    return this.getAllBlogs().pipe(
      map(blogs => blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.author?.toLowerCase().includes(searchTerm) ||
        blog.tags?.toLowerCase().includes(searchTerm)
      ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    );
  }

  getLatestBlogs(limit: number = 6): Observable<Blog[]> {
    return this.getAllBlogs().pipe(
      map(blogs => {
        return blogs
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
      })
    );
  }

  getRelatedBlogs(tags: string, currentSlug: string): Observable<Blog[]> {
    return this.getAllBlogs().pipe(
      map(blogs => {
        const tagArray = tags.split(',').map(t => t.trim().toLowerCase());
        return blogs
          .filter(blog =>
            blog.slug !== currentSlug &&
            blog.tags?.split(',').some(t => tagArray.includes(t.trim().toLowerCase()))
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
      })
    );
  }
}