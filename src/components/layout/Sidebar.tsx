import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  User, 
  Bed, 
  Users, 
  School, 
  CreditCard, 
  Wrench, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  hasSubmenu = false,
  isOpen = false,
  onClick,
  children 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <div className="mb-1">
      <div 
        className={`
          flex items-center px-3 py-2 text-sm rounded-md cursor-pointer
          ${isActive ? 'bg-teal-100 text-teal-900' : 'text-gray-700 hover:bg-gray-100'}
        `}
        onClick={onClick}
      >
        <div className="mr-3">{icon}</div>
        <span className="flex-1">{label}</span>
        {hasSubmenu && (
          <div className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </div>
      {hasSubmenu && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  
  // Show specific menu items based on user role
  const showAdminMenu = currentUser?.role === 'admin';
  const showStaffMenu = currentUser?.role === 'admin' || currentUser?.role === 'staff';
  const showStudentMenu = currentUser?.role === 'student';
  const showParentMenu = currentUser?.role === 'parent';
  
  const closeMenu = () => {
    setIsMobileOpen(false);
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 m-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-teal-700">HostelERP</span>
            </div>
            <button 
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={closeMenu}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* User info */}
          {currentUser && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt="User"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs font-medium text-gray-500 capitalize">{currentUser.role}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation links */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <Link to="/dashboard" onClick={closeMenu}>
              <SidebarLink to="/dashboard" icon={<Home size={18} />} label="Dashboard" />
            </Link>
            
            {/* Admin and Staff links */}
            {showAdminMenu && (
              <Link to="/users" onClick={closeMenu}>
                <SidebarLink to="/users" icon={<Users size={18} />} label="User Management" />
              </Link>
            )}
            
            {showStaffMenu && (
              <>
                <SidebarLink 
                  to="/rooms" 
                  icon={<Bed size={18} />} 
                  label="Rooms & Beds" 
                  hasSubmenu={true}
                  isOpen={roomsOpen}
                  onClick={() => setRoomsOpen(!roomsOpen)}
                >
                  <Link to="/rooms" onClick={closeMenu}>
                    <div className="py-1 px-3 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                      All Rooms
                    </div>
                  </Link>
                  <Link to="/rooms/allocation" onClick={closeMenu}>
                    <div className="py-1 px-3 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                      Allocate Rooms
                    </div>
                  </Link>
                  <Link to="/rooms/vacate" onClick={closeMenu}>
                    <div className="py-1 px-3 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                      Vacate Rooms
                    </div>
                  </Link>
                </SidebarLink>
                
                <SidebarLink 
                  to="/students" 
                  icon={<School size={18} />} 
                  label="Students" 
                  hasSubmenu={true}
                  isOpen={studentsOpen}
                  onClick={() => setStudentsOpen(!studentsOpen)}
                >
                  <Link to="/students" onClick={closeMenu}>
                    <div className="py-1 px-3 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                      All Students
                    </div>
                  </Link>
                  <Link to="/students/registration" onClick={closeMenu}>
                    <div className="py-1 px-3 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                      Registration
                    </div>
                  </Link>
                </SidebarLink>
              </>
            )}
            
            {/* Common links for all roles */}
            <Link to="/payments" onClick={closeMenu}>
              <SidebarLink to="/payments" icon={<CreditCard size={18} />} label="Payments" />
            </Link>
            
            <Link to="/maintenance" onClick={closeMenu}>
              <SidebarLink to="/maintenance" icon={<Wrench size={18} />} label="Maintenance" />
            </Link>
            
            <Link to="/notifications" onClick={closeMenu}>
              <SidebarLink to="/notifications" icon={<Bell size={18} />} label="Notifications" />
            </Link>
            
            {/* Student-specific links */}
            {showStudentMenu && (
              <Link to="/profile" onClick={closeMenu}>
                <SidebarLink to="/profile" icon={<User size={18} />} label="My Profile" />
              </Link>
            )}
            
            {/* Parent-specific links */}
            {showParentMenu && (
              <Link to="/child" onClick={closeMenu}>
                <SidebarLink to="/child" icon={<School size={18} />} label="My Child" />
              </Link>
            )}
            
            <Link to="/settings" onClick={closeMenu}>
              <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
            </Link>
          </nav>
          
          {/* Footer with logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut size={18} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;