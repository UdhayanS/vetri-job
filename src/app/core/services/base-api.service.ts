import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private buildUrl(baseUrl: string, params?: Record<string, string>): string {
    if (!params) return baseUrl;
    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
      .join('&');
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  private async fetchWithRedirect(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow'
      });
      
      if (response.ok) {
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
      
      if (response.status === 302 || response.status === 307) {
        const location = response.headers.get('Location');
        if (location) {
          return this.fetchWithRedirect(location);
        }
      }
      
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if ((error as any).message?.includes('Failed to fetch') || (error as any).name === 'TypeError') {
        console.warn('CORS redirect detected, trying direct URL...');
        const directUrl = url.replace('script.google.com', 'script.googleusercontent.com');
        const directResponse = await fetch(directUrl, {
          method: 'GET',
          mode: 'cors'
        });
        const text = await directResponse.text();
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
      throw error;
    }
  }

  get<T>(params?: Record<string, string>): Observable<T> {
    const url = this.buildUrl(this.apiUrl, params);
    return from(this.fetchWithRedirect(url)) as Observable<T>;
  }

  post<T>(data: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers }).pipe(
      map((response: any) => response as T)
    );
  }
}