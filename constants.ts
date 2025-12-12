import { Gig, Course } from './types';

export const MOCK_GIGS: Gig[] = [
  {
    id: '1',
    title: 'E-commerce Website Design',
    category: 'Web Development',
    type: 'online',
    budget: 50000,
    budgetType: 'fixed',
    description: 'Looking for an experienced UI/UX designer to redesign our Shopify store.',
    postedBy: { name: 'TechSolutions India', rating: 4.9 },
    skills: ['Figma', 'Shopify', 'UI Design'],
    postedDate: '2 days ago',
    applicants: 12
  },
  {
    id: '2',
    title: 'Apartment Interior Painting',
    category: 'Painting',
    type: 'local',
    budget: 800,
    budgetType: 'hourly',
    location: 'Mumbai, Bandra West',
    description: 'Need a team to paint a 3BHK apartment. Paint provided.',
    postedBy: { name: 'Rahul Sharma', rating: 4.5 },
    skills: ['Interior Painting', 'Wall Putty'],
    postedDate: '5 hours ago',
    applicants: 4
  },
  {
    id: '3',
    title: 'Python Chatbot Development',
    category: 'Software Development',
    type: 'online',
    budget: 25000,
    budgetType: 'fixed',
    description: 'Build a customer support chatbot using Python and OpenAI API.',
    postedBy: { name: 'Innovate AI', rating: 5.0 },
    skills: ['Python', 'NLP', 'API Integration'],
    postedDate: '1 day ago',
    applicants: 28
  },
  {
    id: '4',
    title: 'AC Repair & Service',
    category: 'Electrical',
    type: 'local',
    budget: 1500,
    budgetType: 'fixed',
    location: 'Delhi, Connaught Place',
    description: 'Split AC not cooling properly. Need urgent service.',
    postedBy: { name: 'Priya Singh', rating: 4.7 },
    skills: ['AC Repair', 'Electrical'],
    postedDate: 'Just now',
    applicants: 1
  },
  {
    id: '5',
    title: 'Logo Design for Startup',
    category: 'Graphic Design',
    type: 'online',
    budget: 5000,
    budgetType: 'fixed',
    description: 'Minimalist logo needed for a sustainable fashion brand.',
    postedBy: { name: 'GreenWear', rating: 4.2 },
    skills: ['Adobe Illustrator', 'Branding'],
    postedDate: '3 days ago',
    applicants: 45
  },
  {
    id: '6',
    title: 'Plumbing Installation',
    category: 'Plumbing',
    type: 'local',
    budget: 1200,
    budgetType: 'fixed',
    location: 'Bangalore, Indiranagar',
    description: 'Install new bathroom fittings and fix leakage.',
    postedBy: { name: 'Karthik R', rating: 4.8 },
    skills: ['Plumbing', 'Pipe Fitting'],
    postedDate: '1 week ago',
    applicants: 3
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Web Development with MERN',
    instructor: 'Sandeep Gupta',
    duration: '40h',
    level: 'Advanced',
    rating: 4.8,
    students: 1250,
    price: 4999,
    image: 'https://picsum.photos/400/225?random=10',
    category: 'Development'
  },
  {
    id: '2',
    title: 'Professional Electrical Certification',
    instructor: 'ITI Training Center',
    duration: '20h',
    level: 'Intermediate',
    rating: 4.6,
    students: 850,
    price: 1999,
    image: 'https://picsum.photos/400/225?random=11',
    category: 'Vocational'
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery',
    instructor: 'Anjali Verma',
    duration: '15h',
    level: 'Beginner',
    rating: 4.9,
    students: 3000,
    price: 2499,
    image: 'https://picsum.photos/400/225?random=12',
    category: 'Marketing'
  },
  {
    id: '4',
    title: 'Entrepreneurship 101',
    instructor: 'Startup India Hub',
    duration: '10h',
    level: 'Beginner',
    rating: 4.7,
    students: 5000,
    price: 0,
    image: 'https://picsum.photos/400/225?random=13',
    category: 'Business'
  }
];