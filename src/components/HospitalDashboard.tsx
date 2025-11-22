import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart,
  LogOut,
  Users,
  Building,
  MapPin,
  Phone,
  Clock,
  Activity,
  BedDouble,
  AlertCircle,
  ArrowRightLeft,
  Package,
  Stethoscope,
  Settings
} from "lucide-react";
import { DepartmentBlock } from "./hospital/DepartmentBlock";
import { HospitalResourceManagement } from "./hospital/HospitalResourceManagement";
import { PatientTransferModal } from "./hospital/PatientTransferModal";

interface HospitalDashboardProps {
  onSignOut: () => void;
}

interface Department {
  id: string;
  name: string;
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number;
  beds: Bed[];
}

interface Bed {
  id: string;
  number: string;
  status: 'empty' | 'occupied' | 'cleaning' | 'maintenance';
  patient?: {
    id: string;
    name: string;
    age: number;
    gender: string;
    contact: string;
    address: string;
    aadhaar: string;
    disease: string;
    doctor: string;
    admissionDate: string;
    emergencyContact: string;
  };
}

export function HospitalDashboard({ onSignOut }: HospitalDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // Mock hospital data
  const [hospitalInfo] = useState({
    name: "Apollo Medical Center",
    id: "APOLLO-001",
    address: "123 Health Street, Medical District, Mumbai 400001",
    phone: "+91 22 1234 5678",
    email: "admin@apollomedical.com",
    license: "MH/HOSP/2020/001234",
    established: "1995",
    totalBeds: 250,
    availableBeds: 45,
    totalStaff: 150,
    departments: 8
  });

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "general",
      name: "General Ward",
      totalBeds: 20,
      availableBeds: 5,
      occupiedBeds: 15,
      beds: Array.from({ length: 20 }, (_, i) => ({
        id: `general-${i + 1}`,
        number: `G${String(i + 1).padStart(2, '0')}`,
        status: i < 15 ? 'occupied' : 'empty' as 'occupied' | 'empty',
        patient: i < 15 ? {
          id: `patient-${i + 1}`,
          name: `Patient ${i + 1}`,
          age: 25 + i,
          gender: i % 2 === 0 ? 'Male' : 'Female',
          contact: `+91 98765 4321${i}`,
          address: `Address ${i + 1}`,
          aadhaar: `1234 5678 9012 345${i}`,
          disease: 'General illness',
          doctor: 'Dr. Smith',
          admissionDate: '2024-01-15',
          emergencyContact: `+91 98765 4321${i + 1}`
        } : undefined
      }))
    },
    {
      id: "icu",
      name: "ICU",
      totalBeds: 12,
      availableBeds: 2,
      occupiedBeds: 10,
      beds: Array.from({ length: 12 }, (_, i) => ({
        id: `icu-${i + 1}`,
        number: `ICU${String(i + 1).padStart(2, '0')}`,
        status: i < 10 ? 'occupied' : 'empty' as 'occupied' | 'empty',
        patient: i < 10 ? {
          id: `icu-patient-${i + 1}`,
          name: `ICU Patient ${i + 1}`,
          age: 30 + i,
          gender: i % 2 === 0 ? 'Male' : 'Female',
          contact: `+91 98765 4321${i}`,
          address: `Address ${i + 1}`,
          aadhaar: `1234 5678 9012 345${i}`,
          disease: 'Critical condition',
          doctor: 'Dr. Johnson',
          admissionDate: '2024-01-10',
          emergencyContact: `+91 98765 4321${i + 1}`
        } : undefined
      }))
    },
    {
      id: "emergency",
      name: "Emergency",
      totalBeds: 15,
      availableBeds: 8,
      occupiedBeds: 7,
      beds: Array.from({ length: 15 }, (_, i) => ({
        id: `emergency-${i + 1}`,
        number: `ER${String(i + 1).padStart(2, '0')}`,
        status: i < 7 ? 'occupied' : 'empty' as 'occupied' | 'empty',
        patient: i < 7 ? {
          id: `emergency-patient-${i + 1}`,
          name: `Emergency Patient ${i + 1}`,
          age: 20 + i,
          gender: i % 2 === 0 ? 'Male' : 'Female',
          contact: `+91 98765 4321${i}`,
          address: `Address ${i + 1}`,
          aadhaar: `1234 5678 9012 345${i}`,
          disease: 'Emergency condition',
          doctor: 'Dr. Williams',
          admissionDate: '2024-01-18',
          emergencyContact: `+91 98765 4321${i + 1}`
        } : undefined
      }))
    },
    {
      id: "pediatric",
      name: "Pediatric",
      totalBeds: 18,
      availableBeds: 12,
      occupiedBeds: 6,
      beds: Array.from({ length: 18 }, (_, i) => ({
        id: `pediatric-${i + 1}`,
        number: `PED${String(i + 1).padStart(2, '0')}`,
        status: i < 6 ? 'occupied' : 'empty' as 'occupied' | 'empty',
        patient: i < 6 ? {
          id: `pediatric-patient-${i + 1}`,
          name: `Child Patient ${i + 1}`,
          age: 5 + i,
          gender: i % 2 === 0 ? 'Male' : 'Female',
          contact: `+91 98765 4321${i}`,
          address: `Address ${i + 1}`,
          aadhaar: `1234 5678 9012 345${i}`,
          disease: 'Pediatric condition',
          doctor: 'Dr. Anderson',
          admissionDate: '2024-01-12',
          emergencyContact: `+91 98765 4321${i + 1}`
        } : undefined
      }))
    }
  ]);

  const updateDepartment = (departmentId: string, updatedDepartment: Department) => {
    setDepartments(prev => 
      prev.map(dept => dept.id === departmentId ? updatedDepartment : dept)
    );
  };

  const totalBeds = departments.reduce((sum, dept) => sum + dept.totalBeds, 0);
  const totalAvailable = departments.reduce((sum, dept) => sum + dept.availableBeds, 0);
  const totalOccupied = departments.reduce((sum, dept) => sum + dept.occupiedBeds, 0);

  const initiateTransfer = () => {
    // Mock patient data for transfer
    const mockPatient = {
      id: 'PAT-001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      disease: 'Acute myocardial infarction requiring immediate cardiac intervention',
      requiredResources: ['ICU Bed', 'Cardiac Monitor', 'Ventilator']
    };
    
    setSelectedPatient(mockPatient);
    setIsTransferModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Chikitsa
                </span>
                <p className="text-sm text-gray-600">Hospital Dashboard</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onSignOut} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hospital Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="beds">Bed Management</TabsTrigger>
            <TabsTrigger value="resources">Resource Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">{hospitalInfo.name}</CardTitle>
                <p className="text-gray-600">Hospital ID: {hospitalInfo.id}</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active Since {hospitalInfo.established}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">{hospitalInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact</p>
                  <p className="text-sm text-gray-600">{hospitalInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Staff</p>
                  <p className="text-sm text-gray-600">{hospitalInfo.totalStaff} employees</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Departments</p>
                  <p className="text-sm text-gray-600">{hospitalInfo.departments} active departments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BedDouble className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Beds</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBeds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupied</p>
                  <p className="text-2xl font-bold text-orange-600">{totalOccupied}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((totalOccupied / totalBeds) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

            {/* Quick Alerts */}
            {totalAvailable < 10 && (
              <div className="mb-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-medium text-amber-800">Low Bed Availability Alert</p>
                      <p className="text-amber-700 text-sm">
                        Only {totalAvailable} beds available across all departments. Consider patient transfer.
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={initiateTransfer}
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Initiate Transfer
                  </Button>
                </div>
              </div>
            )}

            {/* Departments */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Department Management</h2>
              {departments.map((department) => (
                <DepartmentBlock
                  key={department.id}
                  department={department}
                  onUpdate={(updatedDept) => updateDepartment(department.id, updatedDept)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bed Management System</CardTitle>
                <p className="text-gray-600">Manage bed allocation across all departments</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departments.map((department) => (
                    <DepartmentBlock
                      key={department.id}
                      department={department}
                      onUpdate={(updatedDept) => updateDepartment(department.id, updatedDept)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <HospitalResourceManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardContent className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Hospital Settings</h3>
                <p className="text-gray-500">Configure hospital settings and preferences</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <PatientTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => {
            setIsTransferModalOpen(false);
            setSelectedPatient(null);
          }}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
}