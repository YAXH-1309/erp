import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { rooms, beds, students } from '../data/mockData';
import { Bed, Edit, Plus, Filter, Search, Eye } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Rooms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBlock, setFilterBlock] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  
  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = 
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.block.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBlock = filterBlock === 'all' || room.block === filterBlock;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    const matchesGender = filterGender === 'all' || room.gender === filterGender;
    
    return matchesSearch && matchesBlock && matchesStatus && matchesGender;
  });
  
  // Calculate total and available beds
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(bed => bed.occupied).length;
  const availableBeds = totalBeds - occupiedBeds;
  
  return (
    <PageLayout
      title="Room & Bed Management"
      subtitle="Manage hostel rooms and bed allocations"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-teal-100 mr-4">
                <Bed className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                <p className="text-2xl font-semibold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-green-100 mr-4">
                <Bed className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Available Beds</p>
                <p className="text-2xl font-semibold text-gray-900">{availableBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-purple-100 mr-4">
                <Bed className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round((occupiedBeds / totalBeds) * 100)}%
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
                placeholder="Search rooms..."
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
                    { value: 'all', label: 'All Blocks' },
                    { value: 'A', label: 'Block A' },
                    { value: 'B', label: 'Block B' },
                  ]}
                  value={filterBlock}
                  onChange={setFilterBlock}
                />
              </div>
              
              <div className="w-full md:w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'available', label: 'Available' },
                    { value: 'full', label: 'Full' },
                    { value: 'maintenance', label: 'Maintenance' },
                  ]}
                  value={filterStatus}
                  onChange={setFilterStatus}
                />
              </div>
              
              <div className="w-full md:w-40">
                <Select
                  options={[
                    { value: 'all', label: 'All Gender' },
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                  ]}
                  value={filterGender}
                  onChange={setFilterGender}
                />
              </div>
              
              <Button leftIcon={<Filter size={16} />} variant="outline">
                Filter
              </Button>
              
              <Button leftIcon={<Plus size={16} />} variant="primary">
                Add Room
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Room Number</TableHeader>
                <TableHeader>Block</TableHeader>
                <TableHeader>Floor</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Capacity</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.number}</TableCell>
                  <TableCell>{room.block}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell className="capitalize">{room.type}</TableCell>
                  <TableCell className="capitalize">{room.gender}</TableCell>
                  <TableCell>{room.occupied}/{room.capacity}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        room.status === 'available' ? 'success' :
                        room.status === 'full' ? 'danger' : 'warning'
                      }
                    >
                      {room.status}
                    </Badge>
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Bed Allocation Preview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Bed Allocation Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.slice(0, 3).map((room) => {
              const roomBeds = beds.filter(bed => bed.roomId === room.id);
              
              return (
                <div key={room.id} className="border rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">Room {room.number}</h3>
                    <p className="text-sm text-gray-500">
                      {room.block} Block, Floor {room.floor}, {room.type} ({room.gender})
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {roomBeds.map((bed) => {
                        const student = bed.studentId 
                          ? students.find(s => s.id === bed.studentId)
                          : null;
                          
                        return (
                          <div 
                            key={bed.id} 
                            className={`p-3 rounded-md border ${bed.occupied 
                              ? 'bg-red-50 border-red-200' 
                              : 'bg-green-50 border-green-200'}`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="font-medium">Bed {bed.number}</div>
                              <Badge variant={bed.occupied ? 'danger' : 'success'}>
                                {bed.occupied ? 'Occupied' : 'Available'}
                              </Badge>
                            </div>
                            {student && (
                              <div className="mt-2 text-sm text-gray-600">
                                <div>Student: {student.name}</div>
                                <div>ID: {student.rollNumber}</div>
                                <div>Course: {student.course}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Rooms;