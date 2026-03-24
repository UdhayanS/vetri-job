import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-loader',
  template: `
    <div class="blog-loader-container">
      <div class="runner">
        <svg viewBox="0 0 100 100" class="running-man">
          <circle cx="50" cy="20" r="12" fill="#6366f1"/>
          <path d="M45 32 L42 50 L38 65 L35 80 M55 32 L58 50 L62 65 L65 80 M50 35 L60 40 L70 35 L75 38 L65 40 L55 45 L50 35" fill="#6366f1"/>
          <rect x="45" y="40" width="20" height="18" rx="3" fill="#6366f1"/>
          <path d="M35 45 L25 42 L28 55 L38 52" fill="#6366f1"/>
          <path d="M65 45 L75 42 L72 55 L62 52" fill="#6366f1"/>
        </svg>
        <div class="bag"></div>
      </div>
      <p>Loading Blogs...</p>
    </div>
  `,
  styles: [`
    .blog-loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      padding: 3rem;
      color: var(--primary);
    }

    .runner {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .running-man {
      width: 100%;
      height: 100%;
      animation: run 0.8s steps(8) infinite;
    }

    .bag {
      position: absolute;
      right: 8px;
      top: 35px;
      width: 18px;
      height: 22px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border-radius: 2px 4px 4px 2px;
      animation: bag-bounce 0.8s steps(8) infinite;
    }

    .bag::after {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 10px;
      border: 2px solid #f59e0b;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
    }

    @keyframes run {
      0% { transform: translateY(0); }
      12.5% { transform: translateY(-5px); }
      25% { transform: translateY(0); }
      37.5% { transform: translateY(-5px); }
      50% { transform: translateY(0); }
      62.5% { transform: translateY(-5px); }
      75% { transform: translateY(0); }
      87.5% { transform: translateY(-5px); }
      100% { transform: translateY(0); }
    }

    @keyframes bag-bounce {
      0% { transform: translateY(0) rotate(-10deg); }
      12.5% { transform: translateY(-8px) rotate(-15deg); }
      25% { transform: translateY(0) rotate(-10deg); }
      37.5% { transform: translateY(-8px) rotate(-15deg); }
      50% { transform: translateY(0) rotate(-10deg); }
      62.5% { transform: translateY(-8px) rotate(-15deg); }
      75% { transform: translateY(0) rotate(-10deg); }
      87.5% { transform: translateY(-8px) rotate(-15deg); }
      100% { transform: translateY(0) rotate(-10deg); }
    }

    p {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  `]
})
export class BlogLoaderComponent {}