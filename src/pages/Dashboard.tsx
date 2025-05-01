import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import StatCard from '../components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { useAuth } from '../context/AuthContext';
import { Bed, Users, School, DollarSign, PenTool, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  rooms, 
  students, 
  maintenanceRequests,
  payments
} from '../data/mockData';
import Badge from '../components/ui/Badge';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role || 'student';
  
  // Calculate statistics based on mock data
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const occupancyRate = Math.round((1 - availableRooms / totalRooms) * 100);
  
  const totalStudents = students.length;
  const pendingMaintenance = maintenanceRequests.filter(req => req.status === 'pending').length;
  
  const totalFees = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const pendingFees = students.filter(student => !student.feePaid).length * 25000;
  
  // Get recent maintenance requests
  const recentMaintenance = [...maintenanceRequests]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Get recent payments
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
    
  return (
    <PageLayout 
      title={`Welcome, ${currentUser?.name}`}
      subtitle="Here's what's happening in your hostel."
    >
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Show different cards based on user role */}
        {(userRole === 'admin' || userRole === 'staff') && (
          <>
            <StatCard 
              title="Room Occupancy" 
              value={`${occupancyRate}%`} 
              icon={<Bed size={24} />}
              change={{ value: "5%", type: "increase" }}
              color="teal"
            />
            <StatCard 
              title="Total Students" 
              value={totalStudents} 
              icon={<School size={24} />}
              change={{ value: "3", type: "increase" }}
              color="blue"
            />
            <StatCard 
              title="Maintenance Requests" 
              value={pendingMaintenance} 
              icon={<PenTool size={24} />}
              change={{ value: "2", type: "decrease" }}
              color="orange"
            />
            <StatCard 
              title="Fee Collection" 
              value={`₹${(totalFees / 1000).toFixed(1)}K`} 
              icon={<DollarSign size={24} />}
              change={{ value: `₹${(pendingFees / 1000).toFixed(1)}K pending`, type: "neutral" }}
              color="green"
            />
          </>
        )}
        
        {userRole === 'student' && (
          <>
            <StatCard 
              title="Your Room" 
              value="A-101" 
              icon={<Bed size={24} />}
              color="teal"
            />
            <StatCard 
              title="Fee Status" 
              value="Paid" 
              icon={<CheckCircle size={24} />}
              color="green"
            />
            <StatCard 
              title="Maintenance Requests" 
              value="1" 
              icon={<PenTool size={24} />}
              color="orange"
            />
            <StatCard 
              title="Upcoming Events" 
              value="2" 
              icon={<TrendingUp size={24} />}
              color="purple"
            />
          </>
        )}
        
        {userRole === 'parent' && (
          <>
            <StatCard 
              title="Child's Room" 
              value="A-101" 
              icon={<Bed size={24} />}
              color="teal"
            />
            <StatCard 
              title="Fee Status" 
              value="Paid" 
              icon={<CheckCircle size={24} />}
              color="green"
            />
            <StatCard 
              title="Academic Performance" 
              value="Good" 
              icon={<TrendingUp size={24} />}
              color="purple"
            />
            <StatCard 
              title="Notifications" 
              value="3" 
              icon={<AlertCircle size={24} />}
              color="orange"
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Room</TableHeader>
                  <TableHeader>Issue</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Date</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentMaintenance.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{rooms.find(r => r.id === request.roomId)?.number}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === 'pending' ? 'warning' :
                          request.status === 'in-progress' ? 'info' :
                          request.status === 'completed' ? 'success' : 'danger'
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Recent Fee Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Fee Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Student</TableHeader>
                  <TableHeader>Amount</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Date</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPayments.map((payment) => {
                  const student = students.find(s => s.id === payment.studentId);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{student?.name}</TableCell>
                      <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{payment.type}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Room Availability Overview */}
        {(userRole === 'admin' || userRole === 'staff') && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Room Availability Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <div 
                    key={room.id}
                    className={`
                      border rounded-lg p-4
                      ${room.status === 'available' ? 'border-green-200 bg-green-50' : 
                        room.status === 'full' ? 'border-red-200 bg-red-50' : 
                        'border-amber-200 bg-amber-50'}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{room.number}</h4>
                        <p className="text-sm text-gray-600">
                          {room.block} Block, Floor {room.floor}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {room.type} | {room.gender}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          room.status === 'available' ? 'success' :
                          room.status === 'full' ? 'danger' : 'warning'
                        }
                      >
                        {room.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${room.status === 'available' ? 'bg-green-500' : 
                            room.status === 'full' ? 'bg-red-500' : 'bg-amber-500'}`}
                          style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {room.occupied}/{room.capacity} beds occupied
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;