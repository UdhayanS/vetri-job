import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileMenuOpen = false;
  isDarkMode = false;
  qrModalOpen = false;
  qrUrl = 'https://vetrijobs.online/jobs';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleQrModal(): void {
    this.qrModalOpen = !this.qrModalOpen;
  }

  closeQrModal(): void {
    this.qrModalOpen = false;
  }

  shareOnWhatsApp(): void {
    const text = `Check out Vetri Jobs: ${this.qrUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  }
}
