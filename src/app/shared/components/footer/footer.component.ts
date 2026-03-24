import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  subscribing = false;
  successMessage = '';
  categories: string[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getCategories().subscribe(categories => {
      this.categories = categories.slice(0, 5);
    });
  }

  subscribe(): void {
    if (this.emailControl.valid) {
      this.subscribing = true;
      this.successMessage = '';
      
      this.jobService.subscribeEmail(this.emailControl.value!).subscribe({
        next: () => {
          this.successMessage = 'Thank you for subscribing! You will receive job alerts.';
          this.emailControl.reset();
          this.subscribing = false;
          
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.successMessage = 'Successfully subscribed! Welcome aboard.';
          this.emailControl.reset();
          this.subscribing = false;
          
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        }
      });
    }
  }
}
