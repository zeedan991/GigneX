export interface User {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'client';
  rating: number;
  totalEarnings: number;
  completedJobs: number;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  type: 'online' | 'local';
  clientId: string;
  skills: string[];
  location: string;
  status: 'open' | 'assigned' | 'completed';
  createdAt: string;
  bids: Bid[];
}

export interface Bid {
  workerId: string;
  amount: number;
  proposal: string;
}

export interface Course {
  _id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  rating: number;
  students: number;
  description: string;
}

export interface Filter {
  type?: 'online' | 'local';
  category?: string;
  maxBudget?: number;
}
