import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { students, rooms } from '../data/mockData';
import { UserPlus, Search, Filter, Eye, Edit, Download, School } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Students: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  
  // Unique course and batch values from student data
  const courses = [...new Set(students.map(student => student.course))];
  const batches = [...new Set(students.map(student => student.batch))];
  
  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesBatch = filterBatch === 'all' || student.batch === filterBatch;
    const matchesPayment = filterPayment === 'all' || 
      (filterPayment === 'paid' && student.feePaid) || 
      (filterPayment === 'unpaid' && !student.feePaid);
    
    return matchesSearch && matchesCourse && matchesBatch && matchesPayment;
  });
  
  return (
    <PageLayout
      title="Student Management"
      subtitle="View and manage hostel students"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-teal-100 mr-4">
                <School className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-green-100 mr-4">
                <span className="flex h-6 w-6 text-green-600 items-center justify-center font-bold">₹</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fees Paid</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.feePaid).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-red-100 mr-4">
                <span className="flex h-6 w-6 text-red-600 items-center justify-center font-bold">₹</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fees Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => !s.feePaid).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={16} />}
                fullWidth
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Courses' },
                    ...courses.map(course => ({ value: course, label: course }))
                  ]}
                  value={filterCourse}
                  onChange={setFilterCourse}
                />
              </div>
              
              <div className="w-full md:w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Batches' },
                    ...batches.map(batch => ({ value: batch, label: batch }))
                  ]}
                  value={filterBatch}
                  onChange={setFilterBatch}
                />
              </div>
              
              <div className="w-full md:w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Payment' },
                    { value: 'paid', label: 'Fees Paid' },
                    { value: 'unpaid', label: 'Fees Unpaid' },
                  ]}
                  value={filterPayment}
                  onChange={setFilterPayment}
                />
              </div>
              
              <Button leftIcon={<Filter size={16} />} variant="outline">
                Filter
              </Button>
              
              <Button leftIcon={<UserPlus size={16} />} variant="primary">
                Add Student
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Students Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>All Students</CardTitle>
          <Button leftIcon={<Download size={16} />} variant="outline" size="sm" className="mt-2 sm:mt-0">
            Export to Excel
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Course</TableHeader>
                <TableHeader>Batch</TableHeader>
                <TableHeader>Room</TableHeader>
                <TableHeader>Fee Status</TableHeader>
                <TableHeader>Join Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => {
                const studentRoom = student.roomId ? rooms.find(room => room.id === student.roomId) : null;
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>{studentRoom ? studentRoom.number : '-'}</TableCell>
                    <TableCell>
                      <Badge variant={student.feePaid ? 'success' : 'danger'}>
                        {student.feePaid ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" leftIcon={<Eye size={14} />}>
                          View
                        </Button>
                        <Button size="sm" variant="outline" leftIcon={<Edit size={14} />}>
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Students;