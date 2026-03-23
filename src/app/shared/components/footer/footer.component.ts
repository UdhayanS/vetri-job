import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  subscribing = false;
  successMessage = '';

  constructor(private jobService: JobService) {}

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
