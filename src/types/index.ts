export type UserRole = 'admin' | 'staff' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  rollNumber: string;
  course: string;
  batch: string;
  parentId?: string;
  roomId?: string;
  bedId?: string;
  feePaid: boolean;
  joinDate: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  block: string;
  capacity: number;
  occupied: number;
  type: 'single' | 'double' | 'triple' | 'quad';
  gender: 'male' | 'female';
  status: 'available' | 'full' | 'maintenance';
}

export interface Bed {
  id: string;
  roomId: string;
  number: number;
  occupied: boolean;
  studentId?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  type: 'hostel' | 'mess' | 'other';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  roomId: string;
  requestedBy: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  resolvedDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
  userId: string;
}