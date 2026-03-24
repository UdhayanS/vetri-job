import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });
  
  submitting = false;
  successMessage = '';

  constructor(
    private title: Title,
    private meta: Meta,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Contact Us - Vetri Jobs');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Vetri Jobs. We\'d love to hear from you!' });
  }

  onSubmit(): void {
  if (this.contactForm.valid) {
    this.submitting = true;

    const formData = {
      name: this.contactForm.value.name!,
      email: this.contactForm.value.email!,
      subject: this.contactForm.value.subject!,
      message: this.contactForm.value.message!
    };

    this.jobService.sendContactForm(formData).subscribe({
      next: () => {
        this.successMessage = 'Thank you for your message! We\'ll get back to you soon.';
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.successMessage = 'Something went wrong. Please try again later.';
        this.submitting = false;
      }
    });
  }
}
}
