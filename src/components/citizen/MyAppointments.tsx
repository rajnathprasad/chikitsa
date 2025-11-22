import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Star,
  MessageSquare
} from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  doctorPhoto: string;
  specialization: string;
  hospital: string;
  date: string;
  time: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  consultationFee: number;
  symptoms: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
}

export function MyAppointments() {
  const [appointments] = useState<Appointment[]>([
    {
      id: 'apt-001',
      doctorName: 'Dr. Rajesh Sharma',
      doctorPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      specialization: 'Cardiology',
      hospital: 'Apollo Hospital',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'in-person',
      status: 'upcoming',
      consultationFee: 800,
      symptoms: 'Chest pain, irregular heartbeat'
    },
    {
      id: 'apt-002',
      doctorName: 'Dr. Priya Patel',
      doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      specialization: 'Pediatrics',
      hospital: 'Fortis Hospital',
      date: '2024-01-20',
      time: '2:00 PM',
      type: 'video',
      status: 'completed',
      consultationFee: 600,
      symptoms: 'Fever, cough in child',
      diagnosis: 'Viral infection',
      prescription: 'Paracetamol 250mg, plenty of fluids',
      notes: 'Follow up in 3 days if symptoms persist'
    },
    {
      id: 'apt-003',
      doctorName: 'Dr. Ahmed Khan',
      doctorPhoto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
      specialization: 'Orthopedics',
      hospital: 'Lilavati Hospital',
      date: '2024-01-18',
      time: '11:00 AM',
      type: 'in-person',
      status: 'cancelled',
      consultationFee: 1200,
      symptoms: 'Knee pain, difficulty walking'
    },
    {
      id: 'apt-004',
      doctorName: 'Dr. Sunita Reddy',
      doctorPhoto: 'https://images.unsplash.com/photo-1594824804732-5f70a178c48d?w=400',
      specialization: 'Dermatology',
      hospital: 'Max Hospital',
      date: '2024-01-22',
      time: '4:00 PM',
      type: 'in-person',
      status: 'upcoming',
      consultationFee: 700,
      symptoms: 'Skin rash, itching'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Clock;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      case 'rescheduled':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const StatusIcon = getStatusIcon(appointment.status);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={appointment.doctorPhoto} />
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                {appointment.doctorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-sm text-blue-600">{appointment.specialization}</p>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {appointment.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{appointment.hospital}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.type === 'video' ? (
                    <Video className="h-4 w-4 text-gray-500" />
                  ) : (
                    <MapPin className="h-4 w-4 text-gray-500" />
                  )}
                  <span>{appointment.type === 'video' ? 'Video Call' : 'In-Person'}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Symptoms:</p>
                <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                
                {appointment.diagnosis && (
                  <>
                    <p className="text-sm font-medium text-gray-900 mb-1 mt-2">Diagnosis:</p>
                    <p className="text-sm text-gray-600">{appointment.diagnosis}</p>
                  </>
                )}

                {appointment.prescription && (
                  <>
                    <p className="text-sm font-medium text-gray-900 mb-1 mt-2">Prescription:</p>
                    <p className="text-sm text-gray-600">{appointment.prescription}</p>
                  </>
                )}

                {appointment.notes && (
                  <>
                    <p className="text-sm font-medium text-gray-900 mb-1 mt-2">Doctor's Notes:</p>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-medium text-gray-900">₹{appointment.consultationFee}</span>
                
                <div className="flex space-x-2">
                  {appointment.status === 'upcoming' && (
                    <>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                        Cancel
                      </Button>
                      {appointment.type === 'video' && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join Call
                        </Button>
                      )}
                    </>
                  )}
                  
                  {appointment.status === 'completed' && (
                    <>
                      <Button size="sm" variant="outline">
                        <Star className="h-4 w-4 mr-1" />
                        Rate Doctor
                      </Button>
                      <Button size="sm" variant="outline">
                        Download Report
                      </Button>
                    </>
                  )}

                  {appointment.status === 'cancelled' && (
                    <Button size="sm">
                      Rebook Appointment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Book New Appointment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{pastAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{cancelledAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-500 mb-4">Book your next appointment with a healthcare provider</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length > 0 ? (
            pastAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                <p className="text-gray-500">Your completed appointments will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          {cancelledAppointments.length > 0 ? (
            cancelledAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <XCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled appointments</h3>
                <p className="text-gray-500">Cancelled appointments will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}