import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart,
  LogOut,
  User,
  Calendar,
  MapPin,
  Search,
  Filter,
  Star,
  Phone,
  Clock,
  Building,
  Droplets,
  Plus,
  Settings,
  Camera,
  Edit,
  CheckCircle,
  AlertCircle,
  Navigation
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { CitizenProfile } from "./citizen/CitizenProfile";
import { DoctorSearch } from "./citizen/DoctorSearch";
import { NearbyHospitals } from "./citizen/NearbyHospitals";
import { BloodBanks } from "./citizen/BloodBanks";
import { DonationSection } from "./citizen/DonationSection";
import { AccountSettings } from "./citizen/AccountSettings";
import { MyAppointments } from "./citizen/MyAppointments";

interface CitizenDashboardProps {
  onSignOut: () => void;
}

type ActiveView = 'home' | 'appointments' | 'hospitals' | 'bloodbanks' | 'doctors' | 'donations' | 'settings';

export function CitizenDashboard({ onSignOut }: CitizenDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Mock citizen data
  const [citizenData] = useState({
    id: 'citizen-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    aadhaar: '1234 5678 9012 3456',
    emergencyContact: '+91 98765 43211',
    profilePhoto: null,
    abhaId: 'ABHA-1234567890',
    insuranceProvider: 'Star Health Insurance',
    insurancePolicyNo: 'SH/POL/2024/001234'
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'hospitals', label: 'Nearby Hospitals', icon: Building },
    { id: 'bloodbanks', label: 'Blood Banks', icon: Droplets },
    { id: 'doctors', label: 'Doctors', icon: User },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <CitizenProfile citizenData={citizenData} />;
      case 'appointments':
        return <MyAppointments />;
      case 'hospitals':
        return <NearbyHospitals />;
      case 'bloodbanks':
        return <BloodBanks />;
      case 'doctors':
        return <DoctorSearch />;
      case 'donations':
        return <DonationSection citizenData={citizenData} />;
      case 'settings':
        return <AccountSettings citizenData={citizenData} />;
      default:
        return <CitizenProfile citizenData={citizenData} />;
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
                <p className="text-sm text-muted-foreground">Citizen Portal</p>
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
                <SidebarMenuButton onClick={onSignOut} className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-background border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {sidebarItems.find(item => item.id === activeView)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-muted-foreground">Welcome back, {citizenData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  ABHA Verified
                </Badge>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={citizenData.profilePhoto || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {citizenData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 bg-muted/30">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}