export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string;
  createdAt: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
}

export interface ApiResponse<T> {
  data: T[];
  message?: string;
  success: boolean;
}