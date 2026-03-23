# Vetri Jobs - Job Portal Web Application

A modern, enterprise-level job portal built with Angular and powered by Google Apps Script as a backend API.

## Features

- **Modern UI**: Beautiful, responsive design with gradient backgrounds and card-based layouts
- **Lazy Loading**: All feature modules are lazy loaded for optimal performance
- **SEO Optimized**: Dynamic meta tags, slug-based URLs, proper heading structure
- **AdSense Ready**: Pre-configured ad spaces throughout the application
- **Fast Loading**: OnPush change detection, shareReplay caching, optimized bundles
- **Google Sheets Backend**: Easy to manage job listings through Google Sheets

## Architecture

```
src/
├── app/
│   ├── core/                    # Core services and interceptors
│   │   ├── models/              # TypeScript interfaces
│   │   ├── services/            # BaseApiService, JobService, UtilityService
│   │   └── interceptors/        # Error handling interceptor
│   ├── shared/                  # Shared components
│   │   └── components/
│   │       ├── header/          # Sticky navigation header
│   │       ├── footer/          # Footer with legal links
│   │       ├── job-card/        # Reusable job listing card
│   │       ├── loader/          # Loading spinner
│   │       └── search-bar/      # Job search component
│   └── features/                # Feature modules (lazy loaded)
│       ├── home/               # Home page
│       ├── jobs/               # Job listing page with filters
│       ├── job-detail/         # Individual job details
│       ├── category/           # Category-based job listing
│       └── pages/              # Static pages (About, Contact, etc.)
├── environments/               # Environment configurations
└── public/                     # Static assets (Netlify _redirects)
```

## Services

### BaseApiService
Handles all HTTP requests (GET/POST) to the Google Apps Script API.

### JobService
- `getAllJobs()` - Fetch all jobs with caching
- `getJobBySlug(slug)` - Get job details by slug
- `getJobsByCategory(category)` - Filter jobs by category
- `searchJobs(query)` - Search across multiple fields
- `getFeaturedJobs()` - Get featured job listings
- `getLatestJobs(limit)` - Get recently posted jobs
- `incrementViews(slug)` - Track job views
- `subscribeEmail(email)` - Email subscription

### UtilityService
- `generateWhatsAppShareText(job)` - Create shareable job text
- `formatDate()` - Date formatting and relative time
- Various helper methods for text processing

## API Configuration

Update the API URLs in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

### Google Apps Script Endpoints

**GET Parameters:**
- `action=getJobs` - Fetch all jobs

**POST Data:**
- `{ slug: 'job-slug' }` - Increment views
- `{ email: 'user@email.com', source: 'website' }` - Subscribe

## Google Sheet Model

Required columns:
```
id, slug, title, company, companyLogo, role, category, location, jobType, workMode, experience, qualification, batch, salary, applyLink, lastDate, postedDate, status, description, responsibilities, skills, selectionProcess, benefits, aboutCompany, tags, seoTitle, seoDescription, canonicalUrl, views, priority, featured
```

## Routes

- `/` - Home page
- `/jobs` - Job listing with filters
- `/jobs/:slug` - Job detail page
- `/category/:name` - Category job listing
- `/about` - About page
- `/contact` - Contact page
- `/privacy-policy` - Privacy policy
- `/terms` - Terms of service
- `/disclaimer` - Disclaimer
- `/sitemap` - Sitemap
- `**` - 404 Not Found

## Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Build with specific environment
ng build --configuration=production
```

## Deployment

### Netlify (Recommended)

1. Build the project: `npm run build`
2. Deploy the `dist/vetri-jobs` folder to Netlify
3. The `_redirects` file is already configured for SPA routing

### Other Platforms

Ensure the server configuration redirects all routes to `index.html` for Angular routing.

## AdSense Integration

Pre-configured ad spaces:
- Top banner (full width)
- Sidebar ads (desktop only)
- In-content ad blocks
- Bottom banner

To enable AdSense:
1. Add your AdSense script to `src/index.html`
2. Replace placeholder divs with actual ad units
3. Ensure ads don't interfere with user experience

## Performance Optimizations

- **OnPush Change Detection**: Reduces unnecessary change detection cycles
- **TrackBy Functions**: Optimized ngFor loops
- **Lazy Loading**: Feature modules loaded on demand
- **shareReplay**: API response caching
- **Production Build**: Optimized bundles with tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Vetri Jobs. All rights reserved.

## Support

For questions or support, please contact:
- Email: contact@vetrijobs.com
- Website: https://vetri-jobs.netlify.app
