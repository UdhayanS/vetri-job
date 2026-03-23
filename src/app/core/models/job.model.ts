export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  role: string;
  category: string;
  location: string;
  jobType: string;
  workMode: string;
  experience: string;
  qualification: string;
  batch: string;
  salary: string;
  applyLink: string;
  lastDate: string;
  postedDate: string;
  status: string;
  description: string;
  responsibilities: string;
  skills: string;
  selectionProcess: string;
  benefits: string;
  aboutCompany: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  views: number;
  priority: string;
  featured: string;
}

export interface ApiResponse<T> {
  data: T[];
  message?: string;
  success: boolean;
}

export interface PostRequest {
  slug?: string;
  email?: string;
  source?: string;
}
