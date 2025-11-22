import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Plus,
  Minus,
  BedDouble,
  Users,
  Activity,
  AlertTriangle
} from "lucide-react";
import { BedGrid } from "./BedGrid";
import { PatientModal } from "./PatientModal";
import { ConfirmDialog } from "./ConfirmDialog";

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

interface DepartmentBlockProps {
  department: Department;
  onUpdate: (department: Department) => void;
}

export function DepartmentBlock({ department, onUpdate }: DepartmentBlockProps) {
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [modalMode, setModalMode] = useState<'admit' | 'view' | 'discharge'>('admit');

  const handleBedClick = (bed: Bed) => {
    setSelectedBed(bed);
    if (bed.status === 'empty') {
      setModalMode('admit');
    } else {
      setModalMode('view');
    }
    setShowPatientModal(true);
  };

  const handleAdmitPatient = (patientData: any) => {
    if (!selectedBed) return;

    const updatedBeds = department.beds.map(bed => 
      bed.id === selectedBed.id 
        ? { ...bed, status: 'occupied' as const, patient: patientData }
        : bed
    );

    const updatedDepartment = {
      ...department,
      beds: updatedBeds,
      availableBeds: department.availableBeds - 1,
      occupiedBeds: department.occupiedBeds + 1
    };

    onUpdate(updatedDepartment);
    setShowPatientModal(false);
    setSelectedBed(null);
  };

  const handleDischargePatient = () => {
    if (!selectedBed) return;

    const updatedBeds = department.beds.map(bed => 
      bed.id === selectedBed.id 
        ? { ...bed, status: 'empty' as const, patient: undefined }
        : bed
    );

    const updatedDepartment = {
      ...department,
      beds: updatedBeds,
      availableBeds: department.availableBeds + 1,
      occupiedBeds: department.occupiedBeds - 1
    };

    onUpdate(updatedDepartment);
    setShowPatientModal(false);
    setSelectedBed(null);
  };

  const handleUpdatePatient = (patientData: any) => {
    if (!selectedBed) return;

    const updatedBeds = department.beds.map(bed => 
      bed.id === selectedBed.id 
        ? { ...bed, patient: patientData }
        : bed
    );

    const updatedDepartment = {
      ...department,
      beds: updatedBeds
    };

    onUpdate(updatedDepartment);
    setShowPatientModal(false);
    setSelectedBed(null);
  };

  const handleAddBed = () => {
    const newBedNumber = department.beds.length + 1;
    const departmentPrefix = department.id.toUpperCase().slice(0, 3);
    
    const newBed: Bed = {
      id: `${department.id}-${newBedNumber}`,
      number: `${departmentPrefix}${String(newBedNumber).padStart(2, '0')}`,
      status: 'empty'
    };

    const updatedDepartment = {
      ...department,
      beds: [...department.beds, newBed],
      totalBeds: department.totalBeds + 1,
      availableBeds: department.availableBeds + 1
    };

    onUpdate(updatedDepartment);
  };

  const handleRemoveBed = () => {
    if (department.beds.length === 0) return;
    
    const lastBed = department.beds[department.beds.length - 1];
    if (lastBed.status === 'occupied') {
      // Show confirmation if bed is occupied
      setShowConfirmRemove(true);
      return;
    }

    removeBed();
  };

  const removeBed = () => {
    const updatedBeds = department.beds.slice(0, -1);
    const lastBed = department.beds[department.beds.length - 1];
    
    const updatedDepartment = {
      ...department,
      beds: updatedBeds,
      totalBeds: department.totalBeds - 1,
      availableBeds: lastBed.status === 'empty' 
        ? department.availableBeds - 1 
        : department.availableBeds,
      occupiedBeds: lastBed.status === 'occupied'
        ? department.occupiedBeds - 1
        : department.occupiedBeds
    };

    onUpdate(updatedDepartment);
    setShowConfirmRemove(false);
  };

  const getDepartmentColor = (departmentId: string) => {
    const colors = {
      general: 'border-blue-200 bg-blue-50',
      icu: 'border-red-200 bg-red-50',
      emergency: 'border-orange-200 bg-orange-50',
      pediatric: 'border-purple-200 bg-purple-50',
      cardiology: 'border-pink-200 bg-pink-50',
      orthopedic: 'border-green-200 bg-green-50',
      maternity: 'border-yellow-200 bg-yellow-50',
      psychiatry: 'border-indigo-200 bg-indigo-50'
    };
    return colors[departmentId as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getDepartmentBadgeColor = (departmentId: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      icu: 'bg-red-100 text-red-800',
      emergency: 'bg-orange-100 text-orange-800',
      pediatric: 'bg-purple-100 text-purple-800',
      cardiology: 'bg-pink-100 text-pink-800',
      orthopedic: 'bg-green-100 text-green-800',
      maternity: 'bg-yellow-100 text-yellow-800',
      psychiatry: 'bg-indigo-100 text-indigo-800'
    };
    return colors[departmentId as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const occupancyRate = department.totalBeds > 0 ? Math.round((department.occupiedBeds / department.totalBeds) * 100) : 0;

  return (
    <>
      <Card className={`border-2 ${getDepartmentColor(department.id)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-xl">{department.name}</CardTitle>
              <Badge className={getDepartmentBadgeColor(department.id)}>
                {occupancyRate}% occupied
              </Badge>
              {department.availableBeds === 0 && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Full</span>
                </Badge>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleAddBed}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Bed
              </Button>
              <Button
                onClick={handleRemoveBed}
                size="sm"
                variant="outline"
                disabled={department.beds.length === 0}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Minus className="h-4 w-4 mr-1" />
                Remove Bed
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <BedDouble className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Total: {department.totalBeds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-600">Available: {department.availableBeds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-600">Occupied: {department.occupiedBeds}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <BedGrid
            beds={department.beds}
            onBedClick={handleBedClick}
          />
        </CardContent>
      </Card>

      {/* Patient Modal */}
      {showPatientModal && selectedBed && (
        <PatientModal
          isOpen={showPatientModal}
          onClose={() => {
            setShowPatientModal(false);
            setSelectedBed(null);
          }}
          bed={selectedBed}
          mode={modalMode}
          onAdmit={handleAdmitPatient}
          onDischarge={handleDischargePatient}
          onUpdate={handleUpdatePatient}
          onModeChange={setModalMode}
        />
      )}

      {/* Confirm Remove Bed Dialog */}
      <ConfirmDialog
        isOpen={showConfirmRemove}
        onClose={() => setShowConfirmRemove(false)}
        onConfirm={removeBed}
        title="Remove Occupied Bed"
        description="This bed is currently occupied. Removing it will discharge the patient. Are you sure you want to continue?"
        confirmText="Remove Bed"
        variant="destructive"
      />
    </>
  );
}