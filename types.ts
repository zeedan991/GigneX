export type UserRole = 'freelancer' | 'provider' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  location: string;
  rating: number;
}

export interface Gig {
  id: string;
  title: string;
  category: string;
  type: 'online' | 'local';
  budget: number;
  budgetType: 'fixed' | 'hourly';
  description: string;
  location?: string;
  postedBy: {
    name: string;
    rating: number;
  };
  skills: string[];
  postedDate: string;
  applicants: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  price: number;
  image: string;
  category: string;
}

export type PageView = 'home' | 'find-gigs' | 'post-gig' | 'dashboard' | 'learning' | 'auth' | 'profile';