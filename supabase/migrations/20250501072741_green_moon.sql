/*
  # Create Initial Users

  1. New Records
    - Admin user
    - Staff user
    - Student user with associated student record

  2. Changes
    - Insert initial users into users table
    - Insert initial student record into students table
*/

-- Insert admin user
INSERT INTO users (id, email, name, role, created_at)
VALUES (
  'ad3aa6d5-14d9-4c76-8d43-a9ae5786c584',
  'admin@hostel.com',
  'Admin User',
  'admin',
  now()
);

-- Insert staff user
INSERT INTO users (id, email, name, role, created_at)
VALUES (
  'b7c3a7d1-75e9-4c0e-9d43-a9ae5786c585',
  'staff@hostel.com',
  'Staff Member',
  'staff',
  now()
);

-- Insert student user
INSERT INTO users (id, email, name, role, created_at)
VALUES (
  'c9d4a8e2-86f9-4c0e-9d43-a9ae5786c586',
  'student@hostel.com',
  'John Student',
  'student',
  now()
);

-- Insert student record
INSERT INTO students (
  id,
  user_id,
  roll_number,
  course,
  batch,
  phone,
  address,
  fee_paid,
  join_date,
  created_at
)
VALUES (
  'e5f6b9c3-97f9-4c0e-9d43-a9ae5786c587',
  'c9d4a8e2-86f9-4c0e-9d43-a9ae5786c586',
  'ST001',
  'Computer Science',
  '2024',
  '123-456-7890',
  '123 Student Street, College Town',
  false,
  '2024-01-15',
  now()
);