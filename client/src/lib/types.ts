// Server-side data models
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  type: PlanType;
  features: string[];
  isPopular: boolean;
  isComingSoon?: boolean;
  createdAt: string;
}

export enum PlanType {
  MINECRAFT = "minecraft",
  VPS = "vps",
  DISCORD_BOT = "discord_bot",
  WEB_HOSTING = "web_hosting"
}

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar?: string;
  skills: string[];
  isStaffOfMonth: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorPosition: string;
  authorCompany: string;
  authorImage?: string;
  rating: number;
  createdAt: string;
}

export interface ServerNode {
  id: string;
  name: string;
  isOperational: boolean;
  cpuLoad: number;
  memoryUsage: number;
  networkUsage: number;
  lastUpdated: string;
}

// Auth types
export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
