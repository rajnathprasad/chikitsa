import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { 
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Heart,
  Shield,
  Calendar,
  Clock,
  Activity,
  Camera,
  Edit
} from "lucide-react";

interface CitizenData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  aadhaar: string;
  emergencyContact: string;
  profilePhoto: string | null;
  abhaId: string;
  insuranceProvider: string;
  insurancePolicyNo: string;
}

interface CitizenProfileProps {
  citizenData: CitizenData;
}

export function CitizenProfile({ citizenData }: CitizenProfileProps) {
  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      description: 'Appointment booked with Dr. Smith',
      date: '2024-01-20',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'donation',
      description: 'Blood donation at Apollo Hospital',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'emergency',
      description: 'Emergency alert sent to nearby hospitals',
      date: '2024-01-10',
      status: 'resolved'
    }
  ];

  const quickStats = [
    {
      label: 'Total Appointments',
      value: '12',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Blood Donations',
      value: '5',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      label: 'Emergency Contacts',
      value: '3',
      icon: Phone,
      color: 'text-green-600'
    },
    {
      label: 'Active Insurance',
      value: '1',
      icon: Shield,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={citizenData.profilePhoto || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl">
                    {citizenData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{citizenData.name}</h3>
                  <p className="text-gray-600">{citizenData.age} years old, {citizenData.gender}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{citizenData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{citizenData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Blood Group</p>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {citizenData.bloodGroup}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">ABHA ID</p>
                      <p className="text-sm text-gray-600">{citizenData.abhaId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-sm text-gray-600">{citizenData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Find Nearby Hospitals
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Donate Blood
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Emergency Alert
            </Button>
          </CardContent>
        </Card>
      </div>

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

      {/* Recent Activity & Insurance Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'appointment' && <Calendar className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'donation' && <Heart className="h-5 w-5 text-red-600" />}
                    {activity.type === 'emergency' && <Activity className="h-5 w-5 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <Badge variant={activity.status === 'completed' || activity.status === 'resolved' ? 'secondary' : 'default'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Insurance Provider</p>
                <p className="text-sm text-gray-600">{citizenData.insuranceProvider}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Policy Number</p>
                <p className="text-sm text-gray-600">{citizenData.insurancePolicyNo}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Badge className="bg-green-100 text-green-800">
                Active Coverage
              </Badge>
            </div>
            
            <Button variant="outline" className="w-full">
              View Policy Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}