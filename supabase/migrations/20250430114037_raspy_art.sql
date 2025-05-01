/*
  # Initial Schema for Hostel Management System

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - role (text)
      - avatar_url (text)
      - created_at (timestamp)
      
    - students
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - roll_number (text, unique)
      - course (text)
      - batch (text)
      - phone (text)
      - address (text)
      - parent_id (uuid, references users)
      - room_id (uuid, references rooms)
      - bed_id (uuid, references beds)
      - fee_paid (boolean)
      - join_date (date)
      - created_at (timestamp)
      
    - rooms
      - id (uuid, primary key)
      - number (text, unique)
      - floor (integer)
      - block (text)
      - capacity (integer)
      - type (text)
      - gender (text)
      - status (text)
      - created_at (timestamp)
      
    - beds
      - id (uuid, primary key)
      - room_id (uuid, references rooms)
      - number (integer)
      - occupied (boolean)
      - student_id (uuid, references students)
      - created_at (timestamp)
      
    - payments
      - id (uuid, primary key)
      - student_id (uuid, references students)
      - amount (numeric)
      - payment_date (date)
      - type (text)
      - status (text)
      - reference (text)
      - created_at (timestamp)
      
    - maintenance_requests
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - room_id (uuid, references rooms)
      - requested_by (uuid, references users)
      - request_date (date)
      - status (text)
      - priority (text)
      - assigned_to (uuid, references users)
      - resolved_date (date)
      - created_at (timestamp)
      
    - notifications
      - id (uuid, primary key)
      - title (text)
      - message (text)
      - type (text)
      - notification_date (date)
      - read (boolean)
      - user_id (uuid, references users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'staff', 'student', 'parent')),
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text UNIQUE NOT NULL,
  floor integer NOT NULL,
  block text NOT NULL,
  capacity integer NOT NULL,
  type text NOT NULL CHECK (type IN ('single', 'double', 'triple', 'quad')),
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  status text NOT NULL CHECK (status IN ('available', 'full', 'maintenance')),
  created_at timestamptz DEFAULT now()
);

-- Create beds table
CREATE TABLE beds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE,
  number integer NOT NULL,
  occupied boolean DEFAULT false,
  student_id uuid,
  created_at timestamptz DEFAULT now(),
  UNIQUE(room_id, number)
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  roll_number text UNIQUE NOT NULL,
  course text NOT NULL,
  batch text NOT NULL,
  phone text,
  address text,
  parent_id uuid REFERENCES users,
  room_id uuid REFERENCES rooms,
  bed_id uuid REFERENCES beds,
  fee_paid boolean DEFAULT false,
  join_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint for beds.student_id after students table is created
ALTER TABLE beds ADD CONSTRAINT beds_student_id_fkey 
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL;

-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  payment_date date NOT NULL,
  type text NOT NULL CHECK (type IN ('hostel', 'mess', 'other')),
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  reference text,
  created_at timestamptz DEFAULT now()
);

-- Create maintenance_requests table
CREATE TABLE maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  room_id uuid REFERENCES rooms ON DELETE CASCADE,
  requested_by uuid REFERENCES users ON DELETE CASCADE,
  request_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed', 'rejected')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to uuid REFERENCES users,
  resolved_date date,
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'warning', 'success', 'error')),
  notification_date date NOT NULL,
  read boolean DEFAULT false,
  user_id uuid REFERENCES users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin and staff can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for rooms table
CREATE POLICY "Anyone can view rooms"
  ON rooms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin and staff can manage rooms"
  ON rooms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for beds table
CREATE POLICY "Anyone can view beds"
  ON beds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin and staff can manage beds"
  ON beds FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for students table
CREATE POLICY "Students can view their own data"
  ON students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Parents can view their child's data"
  ON students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'parent' AND id = parent_id
    )
  );

CREATE POLICY "Admin and staff can manage students"
  ON students FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for payments table
CREATE POLICY "Students can view their own payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE id = student_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their child's payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE id = student_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Admin and staff can manage payments"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for maintenance_requests table
CREATE POLICY "Users can view their own maintenance requests"
  ON maintenance_requests FOR SELECT
  USING (requested_by = auth.uid());

CREATE POLICY "Staff can view assigned maintenance requests"
  ON maintenance_requests FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Admin and staff can manage maintenance requests"
  ON maintenance_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Create policies for notifications table
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admin and staff can manage notifications"
  ON notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );