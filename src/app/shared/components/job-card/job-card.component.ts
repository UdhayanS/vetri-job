import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent {
  @Input() job!: Job;

  constructor(public utilityService: UtilityService) {}

  get isNew(): boolean {
    if (!this.job.postedDate) return false;
    const daysDiff = Math.floor((Date.now() - new Date(this.job.postedDate).getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 3;
  }

  parseSkills(skills: string): string[] {
    if (!skills) return [];
    return skills.split(/[,;]/).map(s => s.trim()).filter(Boolean);
  }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    window.location.href = `/jobs/${this.job.slug}`;
  }
}
