export interface User {
  _id: string,
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  status: 'pending' | 'active' | 'inactive';
  loginAttempts?: number;
  lastLoginAttempt?: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  dietaryInfo?: string[];
  spiceLevel?: string;
  timeSlot?: string;
  ingredients?: string[];
  popularity?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: Date;
  specialInstructions?: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  details: string;
  timestamp: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  isAdmin?: boolean;
}