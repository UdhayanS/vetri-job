import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  generateWhatsAppShareText(job: Job): string {
    const url = this.generateCanonicalUrl(job.slug);
    const message = `Check out this job opportunity!\n\n${job.title} at ${job.company}\n${job.location} | ${job.workMode}\nSalary: ${job.salary}\n\nView details: ${url}\n\nFor more jobs, Join our WhatsApp Channel: https://whatsapp.com/channel/0029VbCB3VNI7BeGcd0uji3O`;
    return encodeURIComponent(message);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  formatLastDate(dateString: string): string {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  getDaysRemaining(dateString: string): number {
    if (!dateString) return -1;
    const lastDate = new Date(dateString);
    const now = new Date();
    const diffTime = lastDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  parseTags(tagsString: string): string[] {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
  }

  parseList(text: string): string[] {
    if (!text) return [];
    return text.split('\n').map(item => item.trim()).filter(Boolean);
  }

  generateCanonicalUrl(slug: string): string {
    return `https://vetrijobs.online/jobs/${slug}`;
  }
}
