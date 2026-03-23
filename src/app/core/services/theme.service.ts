import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'vetri-jobs-theme';
  
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  public darkMode$ = this.darkModeSubject.asObservable();

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored !== null) {
      return stored === 'dark';
    }
    return false;
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  toggleTheme(): void {
    const newValue = !this.darkModeSubject.value;
    this.setTheme(newValue);
  }

  setTheme(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  initializeTheme(): void {
    this.setTheme(this.darkModeSubject.value);
  }
}
