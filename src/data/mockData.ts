import { User, Room, Bed, Student, Payment, MaintenanceRequest, Notification } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hostel.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Staff Member',
    email: 'staff@hostel.com',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'John Student',
    email: 'john@student.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Parent User',
    email: 'parent@family.com',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const rooms: Room[] = [
  {
    id: '101',
    number: 'A-101',
    floor: 1,
    block: 'A',
    capacity: 2,
    occupied: 1,
    type: 'double',
    gender: 'male',
    status: 'available'
  },
  {
    id: '102',
    number: 'A-102',
    floor: 1,
    block: 'A',
    capacity: 3,
    occupied: 3,
    type: 'triple',
    gender: 'male',
    status: 'full'
  },
  {
    id: '103',
    number: 'B-101',
    floor: 1,
    block: 'B',
    capacity: 2,
    occupied: 1,
    type: 'double',
    gender: 'female',
    status: 'available'
  },
  {
    id: '104',
    number: 'B-102',
    floor: 1,
    block: 'B',
    capacity: 1,
    occupied: 0,
    type: 'single',
    gender: 'female',
    status: 'maintenance'
  },
  {
    id: '201',
    number: 'A-201',
    floor: 2,
    block: 'A',
    capacity: 4,
    occupied: 2,
    type: 'quad',
    gender: 'male',
    status: 'available'
  }
];

export const beds: Bed[] = [
  { id: '1', roomId: '101', number: 1, occupied: true, studentId: '1' },
  { id: '2', roomId: '101', number: 2, occupied: false },
  { id: '3', roomId: '102', number: 1, occupied: true, studentId: '2' },
  { id: '4', roomId: '102', number: 2, occupied: true, studentId: '3' },
  { id: '5', roomId: '102', number: 3, occupied: true, studentId: '4' },
  { id: '6', roomId: '103', number: 1, occupied: true, studentId: '5' },
  { id: '7', roomId: '103', number: 2, occupied: false },
  { id: '8', roomId: '201', number: 1, occupied: true, studentId: '6' },
  { id: '9', roomId: '201', number: 2, occupied: true, studentId: '7' },
  { id: '10', roomId: '201', number: 3, occupied: false },
  { id: '11', roomId: '201', number: 4, occupied: false }
];

export const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@student.com',
    phone: '123-456-7890',
    address: '123 Student St, College Town',
    rollNumber: 'ST001',
    course: 'Computer Science',
    batch: '2023',
    parentId: '9',
    roomId: '101',
    bedId: '1',
    feePaid: true,
    joinDate: '2023-08-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@student.com',
    phone: '234-567-8901',
    address: '456 College Ave, University City',
    rollNumber: 'ST002',
    course: 'Electrical Engineering',
    batch: '2023',
    parentId: '10',
    roomId: '102',
    bedId: '3',
    feePaid: true,
    joinDate: '2023-08-10'
  },
  {
    id: '3',
    name: 'Sam Wilson',
    email: 'sam@student.com',
    phone: '345-678-9012',
    address: '789 University Rd, Academic Village',
    rollNumber: 'ST003',
    course: 'Business Administration',
    batch: '2022',
    parentId: '11',
    roomId: '102',
    bedId: '4',
    feePaid: false,
    joinDate: '2022-08-20'
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily@student.com',
    phone: '456-789-0123',
    address: '321 Dorm Lane, Campus View',
    rollNumber: 'ST004',
    course: 'Psychology',
    batch: '2022',
    roomId: '102',
    bedId: '5',
    feePaid: true,
    joinDate: '2022-08-18'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa@student.com',
    phone: '567-890-1234',
    address: '654 Scholar St, Knowledge Park',
    rollNumber: 'ST005',
    course: 'Biotechnology',
    batch: '2023',
    parentId: '12',
    roomId: '103',
    bedId: '6',
    feePaid: true,
    joinDate: '2023-08-05'
  },
  {
    id: '6',
    name: 'Mike Brown',
    email: 'mike@student.com',
    phone: '678-901-2345',
    address: '987 Education Blvd, Learning City',
    rollNumber: 'ST006',
    course: 'Mechanical Engineering',
    batch: '2021',
    roomId: '201',
    bedId: '8',
    feePaid: false,
    joinDate: '2021-08-25'
  },
  {
    id: '7',
    name: 'Sarah Davis',
    email: 'sarah@student.com',
    phone: '789-012-3456',
    address: '246 Campus Dr, College Park',
    rollNumber: 'ST007',
    course: 'Physics',
    batch: '2021',
    parentId: '13',
    roomId: '201',
    bedId: '9',
    feePaid: true,
    joinDate: '2021-08-22'
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    amount: 25000,
    date: '2023-08-01',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY123456'
  },
  {
    id: '2',
    studentId: '2',
    amount: 25000,
    date: '2023-08-02',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY234567'
  },
  {
    id: '3',
    studentId: '3',
    amount: 25000,
    date: '2022-08-05',
    type: 'hostel',
    status: 'pending',
    reference: 'PAY345678'
  },
  {
    id: '4',
    studentId: '1',
    amount: 5000,
    date: '2023-09-01',
    type: 'mess',
    status: 'completed',
    reference: 'PAY456789'
  },
  {
    id: '5',
    studentId: '4',
    amount: 25000,
    date: '2022-08-10',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY567890'
  },
  {
    id: '6',
    studentId: '5',
    amount: 25000,
    date: '2023-08-03',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY678901'
  },
  {
    id: '7',
    studentId: '6',
    amount: 25000,
    date: '2021-08-15',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY789012'
  },
  {
    id: '8',
    studentId: '7',
    amount: 25000,
    date: '2021-08-20',
    type: 'hostel',
    status: 'completed',
    reference: 'PAY890123'
  }
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaking Faucet',
    description: 'The bathroom faucet is leaking continuously.',
    roomId: '101',
    requestedBy: '1',
    date: '2023-10-15',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: '2'
  },
  {
    id: '2',
    title: 'Broken Window',
    description: 'The window glass is cracked and needs replacement.',
    roomId: '104',
    requestedBy: '3',
    date: '2023-10-10',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Light Bulb Replacement',
    description: 'The ceiling light bulb has burned out.',
    roomId: '102',
    requestedBy: '2',
    date: '2023-10-05',
    status: 'completed',
    priority: 'low',
    assignedTo: '2',
    resolvedDate: '2023-10-07'
  },
  {
    id: '4',
    title: 'Air Conditioner Not Working',
    description: 'The AC is not cooling properly.',
    roomId: '201',
    requestedBy: '6',
    date: '2023-10-12',
    status: 'pending',
    priority: 'high'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Reminder',
    message: 'Your hostel fee payment is due in 5 days.',
    type: 'warning',
    date: '2023-10-15',
    read: false,
    userId: '3'
  },
  {
    id: '2',
    title: 'Maintenance Update',
    message: 'Your maintenance request for "Leaking Faucet" is now in progress.',
    type: 'info',
    date: '2023-10-16',
    read: true,
    userId: '1'
  },
  {
    id: '3',
    title: 'New Room Assignment',
    message: 'You have been assigned to Room A-101, Bed 1.',
    type: 'success',
    date: '2023-08-14',
    read: true,
    userId: '1'
  },
  {
    id: '4',
    title: 'Hostel Meeting',
    message: 'All students are required to attend a hostel meeting on Sunday at 6 PM.',
    type: 'info',
    date: '2023-10-14',
    read: false,
    userId: '1'
  },
  {
    id: '5',
    title: 'Payment Confirmation',
    message: 'Your payment of ₹25,000 has been received successfully.',
    type: 'success',
    date: '2023-08-01',
    read: true,
    userId: '1'
  }
];