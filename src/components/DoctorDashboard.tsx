import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { 
  Heart,
  LogOut,
  User,
  Calendar,
  Users,
  Star,
  Clock,
  Settings,
  Stethoscope,
  FileText,
  RotateCcw
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

interface DoctorDashboardProps {
  onSignOut: () => void;
  onSwitchToCitizen: () => void;
}

type ActiveView = 'home' | 'patients' | 'appointments' | 'profile' | 'reviews' | 'settings';

export function DoctorDashboard({ onSignOut, onSwitchToCitizen }: DoctorDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Mock doctor data
  const [doctorData] = useState({
    id: 'doc-001',
    name: 'Dr. Rajesh Sharma',
    email: 'dr.rajesh@apollo.com',
    phone: '+91 98765 43210',
    specialization: 'Cardiology',
    experience: 15,
    hospital: 'Apollo Hospital',
    qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 800,
    rating: 4.8,
    reviews: 125,
    profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    license: 'MCI-12345-2010',
    availability: 'available' as const
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'patients', label: 'My Patients', icon: Users },
    { id: 'appointments', label: 'Appointment Requests', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <DoctorHome doctorData={doctorData} />;
      case 'patients':
        return <MyPatients />;
      case 'appointments':
        return <AppointmentRequests />;
      case 'profile':
        return <DoctorProfile doctorData={doctorData} />;
      case 'reviews':
        return <ReviewsAndRatings />;
      case 'settings':
        return <DoctorSettings />;
      default:
        return <DoctorHome doctorData={doctorData} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Chikitsa
                </span>
                <p className="text-sm text-gray-600">Doctor Portal</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id as ActiveView)}
                      isActive={activeView === item.id}
                      className="w-full"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onSwitchToCitizen} className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <RotateCcw className="h-4 w-4" />
                  <span>Switch to Citizen Mode</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onSignOut} className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {sidebarItems.find(item => item.id === activeView)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-gray-600">Welcome back, {doctorData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available
                </Badge>
                <Avatar>
                  <AvatarImage src={doctorData.profilePhoto} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {doctorData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 bg-gray-50">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Doctor Home Component
function DoctorHome({ doctorData }: { doctorData: any }) {
  const quickStats = [
    { label: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'text-blue-600' },
    { label: 'Total Patients', value: '324', icon: Users, color: 'text-green-600' },
    { label: 'Pending Requests', value: '5', icon: Clock, color: 'text-orange-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={doctorData.profilePhoto} />
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl">
                {doctorData.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{doctorData.name}</h2>
              <p className="text-blue-600 font-medium">{doctorData.specialization}</p>
              <p className="text-gray-600">{doctorData.hospital}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium">{doctorData.rating}</span>
                  <span className="text-gray-500">({doctorData.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Stethoscope className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{doctorData.experience} years experience</span>
                </div>
              </div>
            </div>
            
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Patient {i}</p>
                    <p className="text-sm text-gray-600">10:{i}0 AM - Consultation</p>
                  </div>
                  <Badge variant="outline">Confirmed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">"Great doctor, very helpful and professional."</p>
                  <p className="text-xs text-gray-500 mt-1">- Patient {i}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Placeholder components for other views
function MyPatients() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">My Patients</h3>
        <p className="text-gray-500">Patient management features will be available here</p>
      </CardContent>
    </Card>
  );
}

function AppointmentRequests() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Requests</h3>
        <p className="text-gray-500">Manage appointment requests and scheduling</p>
      </CardContent>
    </Card>
  );
}

function DoctorProfile({ doctorData }: { doctorData: any }) {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Doctor Profile</h3>
        <p className="text-gray-500">Manage your professional profile and credentials</p>
      </CardContent>
    </Card>
  );
}

function ReviewsAndRatings() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Reviews & Ratings</h3>
        <p className="text-gray-500">View patient feedback and ratings</p>
      </CardContent>
    </Card>
  );
}

function DoctorSettings() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
        <p className="text-gray-500">Manage availability, fees, and preferences</p>
      </CardContent>
    </Card>
  );
}