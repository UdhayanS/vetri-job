import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostRequest } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(params?: Record<string, string>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(this.apiUrl, { params: httpParams });
  }

  post<T>(p0: string, p1: { headers: { 'Content-Type': string; }; }, data: PostRequest): Observable<T> {
    return this.http.post<T>(this.apiUrl, data);
  }
}
