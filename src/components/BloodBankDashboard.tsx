import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { 
  Heart,
  LogOut,
  Droplets,
  AlertTriangle,
  Settings,
  Bell,
  Users,
  Activity,
  TrendingUp,
  MapPin,
  Phone,
  Send
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { BloodInventoryManagement } from "./bloodbank/BloodInventoryManagement";
import { SendAlertsModal } from "./bloodbank/SendAlertsModal";

interface BloodBankDashboardProps {
  onSignOut: () => void;
}

type ActiveView = 'home' | 'inventory' | 'alerts' | 'requests' | 'profile' | 'settings';

export function BloodBankDashboard({ onSignOut }: BloodBankDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [isSendAlertOpen, setIsSendAlertOpen] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  // Mock blood bank data
  const [bloodBankData] = useState({
    id: 'bb-001',
    name: 'Apollo Blood Bank',
    email: 'bloodbank@apollo.com',
    phone: '+91 22 1234 5678',
    address: '123 Health Street, Mumbai, Maharashtra 400001',
    license: 'BB-MH-2020-001234',
    established: '1995',
    rating: 4.6,
    reviews: 89,
    profilePhoto: null
  });

  const [bloodStock] = useState({
    'A+': { available: 25, total: 50, status: 'good' as const },
    'A-': { available: 8, total: 20, status: 'low' as const },
    'B+': { available: 30, total: 45, status: 'good' as const },
    'B-': { available: 3, total: 15, status: 'critical' as const },
    'AB+': { available: 12, total: 25, status: 'good' as const },
    'AB-': { available: 2, total: 10, status: 'critical' as const },
    'O+': { available: 40, total: 60, status: 'good' as const },
    'O-': { available: 5, total: 20, status: 'low' as const }
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'inventory', label: 'Blood Inventory', icon: Droplets },
    { id: 'alerts', label: 'Emergency Alerts', icon: Bell },
    { id: 'requests', label: 'Requests', icon: Users },
    { id: 'profile', label: 'Profile', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSendAlert = (bloodGroup?: string) => {
    setSelectedBloodGroup(bloodGroup || '');
    setIsSendAlertOpen(true);
  };

  const handleAlertSent = (alertData: any) => {
    setIsSendAlertOpen(false);
    setSelectedBloodGroup('');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <BloodBankHome bloodBankData={bloodBankData} bloodStock={bloodStock} onSendAlert={handleSendAlert} />;
      case 'inventory':
        return <BloodInventoryManagement />;
      case 'alerts':
        return <EmergencyAlerts />;
      case 'requests':
        return <BloodRequests />;
      case 'profile':
        return <BloodBankProfile bloodBankData={bloodBankData} />;
      case 'settings':
        return <BloodBankSettings />;
      default:
        return <BloodBankHome bloodBankData={bloodBankData} bloodStock={bloodStock} onSendAlert={handleSendAlert} />;
    }
  };

  const criticalStockCount = Object.values(bloodStock).filter(stock => stock.status === 'critical').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Chikitsa
                </span>
                <p className="text-sm text-gray-600">Blood Bank Portal</p>
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
                      {item.id === 'alerts' && criticalStockCount > 0 && (
                        <Badge className="bg-red-600 text-white ml-auto">{criticalStockCount}</Badge>
                      )}
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
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {sidebarItems.find(item => item.id === activeView)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-gray-600">Welcome back, {bloodBankData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {criticalStockCount > 0 && (
                  <Badge className="bg-red-100 text-red-800 flex items-center space-x-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{criticalStockCount} Critical</span>
                  </Badge>
                )}
                <Avatar>
                  <AvatarImage src={bloodBankData.profilePhoto || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                    {bloodBankData.name.split(' ').map(n => n[0]).join('')}
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

      <SendAlertsModal
        isOpen={isSendAlertOpen}
        onClose={() => {
          setIsSendAlertOpen(false);
          setSelectedBloodGroup('');
        }}
        preselectedBloodGroup={selectedBloodGroup}
        onAlertSent={handleAlertSent}
      />
    </SidebarProvider>
  );
}

// Blood Bank Home Component
function BloodBankHome({ bloodBankData, bloodStock, onSendAlert }: { bloodBankData: any, bloodStock: any, onSendAlert: (bloodGroup?: string) => void }) {
  const totalUnits = Object.values(bloodStock).reduce((sum: number, stock: any) => sum + stock.available, 0);
  const criticalUnits = Object.values(bloodStock).filter((stock: any) => stock.status === 'critical').length;
  const lowUnits = Object.values(bloodStock).filter((stock: any) => stock.status === 'low').length;

  const quickStats = [
    { label: 'Total Blood Units', value: totalUnits.toString(), icon: Droplets, color: 'text-red-600' },
    { label: 'Critical Stock', value: criticalUnits.toString(), icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Low Stock', value: lowUnits.toString(), icon: Activity, color: 'text-yellow-600' },
    { label: 'Active Requests', value: '12', icon: Users, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Blood Bank Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={bloodBankData.profilePhoto || ''} />
              <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl">
                {bloodBankData.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{bloodBankData.name}</h2>
              <p className="text-gray-600">{bloodBankData.address}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{bloodBankData.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Since {bloodBankData.established}</span>
                </div>
              </div>
            </div>
            
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {criticalUnits > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Critical Blood Shortage Alert</p>
                <p className="text-red-700 text-sm">
                  {criticalUnits} blood type(s) are critically low. Consider sending emergency notifications.
                </p>
              </div>
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => onSendAlert()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Blood Stock Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Stock Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(bloodStock).map(([bloodType, stock]: [string, any]) => (
              <div key={bloodType} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{bloodType}</span>
                  <Badge className={
                    stock.status === 'good' ? 'bg-green-100 text-green-800' :
                    stock.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {stock.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={(stock.available / stock.total) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">{stock.available} units</span>
                    <span className="text-gray-500">/{stock.total}</span>
                  </div>
                  
                  {stock.status === 'critical' && (
                    <Button 
                      size="sm" 
                      className="w-full bg-red-600 hover:bg-red-700 text-xs mt-2"
                      onClick={() => onSendAlert(bloodType)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send Alert
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder components for other views
function BloodInventory({ bloodStock }: { bloodStock: any }) {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Droplets className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Blood Inventory Management</h3>
        <p className="text-gray-500">Detailed inventory management features will be available here</p>
      </CardContent>
    </Card>
  );
}

function EmergencyAlerts() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Emergency Alerts</h3>
        <p className="text-gray-500">Manage emergency notifications and alerts</p>
      </CardContent>
    </Card>
  );
}

function BloodRequests() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Blood Requests</h3>
        <p className="text-gray-500">Manage incoming blood requests and donations</p>
      </CardContent>
    </Card>
  );
}

function BloodBankProfile({ bloodBankData }: { bloodBankData: any }) {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Blood Bank Profile</h3>
        <p className="text-gray-500">Manage your blood bank profile and information</p>
      </CardContent>
    </Card>
  );
}

function BloodBankSettings() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
        <p className="text-gray-500">Configure blood bank settings and preferences</p>
      </CardContent>
    </Card>
  );
}