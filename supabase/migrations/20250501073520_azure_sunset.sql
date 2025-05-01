/*
  # Add authentication data for users
  
  1. Changes
    - Insert authentication data for admin, staff, and student users
    - Set up passwords for each user
    
  2. Security
    - Passwords are hashed using Supabase Auth
    - Each user has a unique email
*/

-- Create authentication data for admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  confirmation_token,
  email_change_token_current,
  email_change_token_new,
  recovery_token,
  raw_app_meta_data,
  raw_user_meta_data
)
VALUES (
  'ad3aa6d5-14d9-4c76-8d43-a9ae5786c584',
  '00000000-0000-0000-0000-000000000000',
  'admin@hostel.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin User","role":"admin"}'
);

-- Create authentication data for staff user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  confirmation_token,
  email_change_token_current,
  email_change_token_new,
  recovery_token,
  raw_app_meta_data,
  raw_user_meta_data
)
VALUES (
  'b7c3a7d1-75e9-4c0e-9d43-a9ae5786c585',
  '00000000-0000-0000-0000-000000000000',
  'staff@hostel.com',
  crypt('staff123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}',
  '{"name":"Staff Member","role":"staff"}'
);

-- Create authentication data for student user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  confirmation_token,
  email_change_token_current,
  email_change_token_new,
  recovery_token,
  raw_app_meta_data,
  raw_user_meta_data
)
VALUES (
  'c9d4a8e2-86f9-4c0e-9d43-a9ae5786c586',
  '00000000-0000-0000-0000-000000000000',
  'student@hostel.com',
  crypt('student123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}',
  '{"name":"John Student","role":"student"}'
);