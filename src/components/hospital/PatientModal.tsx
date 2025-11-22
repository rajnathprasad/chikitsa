import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { 
  Fingerprint, 
  User, 
  Calendar,
  Phone,
  MapPin,
  CreditCard,
  Stethoscope,
  UserCheck,
  Edit,
  Trash2,
  Save,
  X
} from "lucide-react";
import { BiometricScanner } from "./BiometricScanner";

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

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  bed: Bed;
  mode: 'admit' | 'view' | 'discharge';
  onAdmit: (patientData: any) => void;
  onDischarge: () => void;
  onUpdate: (patientData: any) => void;
  onModeChange: (mode: 'admit' | 'view' | 'discharge') => void;
}

export function PatientModal({
  isOpen,
  onClose,
  bed,
  mode,
  onAdmit,
  onDischarge,
  onUpdate,
  onModeChange
}: PatientModalProps) {
  const [admissionMethod, setAdmissionMethod] = useState<'biometric' | 'manual'>('biometric');
  const [isEditing, setIsEditing] = useState(false);
  const [showBiometricScanner, setShowBiometricScanner] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    aadhaar: '',
    disease: '',
    doctor: '',
    emergencyContact: ''
  });

  // Populate form data when viewing/editing existing patient
  useEffect(() => {
    if (mode === 'view' && bed.patient) {
      setFormData({
        name: bed.patient.name,
        age: bed.patient.age.toString(),
        gender: bed.patient.gender,
        contact: bed.patient.contact,
        address: bed.patient.address,
        aadhaar: bed.patient.aadhaar,
        disease: bed.patient.disease,
        doctor: bed.patient.doctor,
        emergencyContact: bed.patient.emergencyContact
      });
    } else if (mode === 'admit') {
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        address: '',
        aadhaar: '',
        disease: '',
        doctor: '',
        emergencyContact: ''
      });
    }
  }, [mode, bed.patient]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patientData = {
      id: bed.patient?.id || `patient-${Date.now()}`,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      contact: formData.contact,
      address: formData.address,
      aadhaar: formData.aadhaar,
      disease: formData.disease,
      doctor: formData.doctor,
      admissionDate: bed.patient?.admissionDate || new Date().toISOString().split('T')[0],
      emergencyContact: formData.emergencyContact
    };

    if (mode === 'admit') {
      onAdmit(patientData);
    } else if (isEditing) {
      onUpdate(patientData);
      setIsEditing(false);
    }
  };

  const handleBiometricSuccess = (patientData: any) => {
    setFormData({
      name: patientData.name,
      age: patientData.age.toString(),
      gender: patientData.gender,
      contact: patientData.contact,
      address: patientData.address,
      aadhaar: patientData.aadhaar,
      disease: '',
      doctor: '',
      emergencyContact: patientData.emergencyContact
    });
    setShowBiometricScanner(false);
    setAdmissionMethod('manual'); // Switch to manual to fill remaining details
  };

  const isFormValid = () => {
    return formData.name && formData.age && formData.gender && formData.contact && formData.doctor;
  };

  const handleDischarge = () => {
    onModeChange('discharge');
  };

  const renderAdmissionForm = () => (
    <div className="space-y-6">
      {/* Admission Method Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Choose Admission Method</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant={admissionMethod === 'biometric' ? 'default' : 'outline'}
            onClick={() => setAdmissionMethod('biometric')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <Fingerprint className="h-6 w-6 mb-2" />
            <span>Fingerprint Scan</span>
            <span className="text-xs text-gray-500">Auto-fill details</span>
          </Button>
          <Button
            type="button"
            variant={admissionMethod === 'manual' ? 'default' : 'outline'}
            onClick={() => setAdmissionMethod('manual')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <User className="h-6 w-6 mb-2" />
            <span>Manual Entry</span>
            <span className="text-xs text-gray-500">Enter manually</span>
          </Button>
        </div>
      </div>

      {/* Biometric Scanner */}
      {admissionMethod === 'biometric' && !showBiometricScanner && (
        <div className="text-center py-6">
          <Button
            type="button"
            onClick={() => setShowBiometricScanner(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Fingerprint className="mr-2 h-5 w-5" />
            Start Fingerprint Scan
          </Button>
        </div>
      )}

      {showBiometricScanner && (
        <BiometricScanner
          onSuccess={handleBiometricSuccess}
          onCancel={() => setShowBiometricScanner(false)}
        />
      )}

      {/* Manual Form or Post-Biometric Form */}
      {(admissionMethod === 'manual' || (admissionMethod === 'biometric' && formData.name)) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter age"
                min="0"
                max="150"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter patient address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              value={formData.aadhaar}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disease">Disease/Condition *</Label>
              <Input
                id="disease"
                value={formData.disease}
                onChange={(e) => handleInputChange('disease', e.target.value)}
                placeholder="Enter diagnosis"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Assigned Doctor *</Label>
              <Select value={formData.doctor} onValueChange={(value) => handleInputChange('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                  <SelectItem value="Dr. Anderson">Dr. Anderson</SelectItem>
                  <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid()}>
              <UserCheck className="mr-2 h-4 w-4" />
              Admit Patient
            </Button>
          </div>
        </form>
      )}
    </div>
  );

  const renderPatientView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{bed.patient?.name}</h3>
          <p className="text-gray-600">Bed {bed.number}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Admitted
          </Badge>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Personal Info</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <div className="space-y-2 mt-2">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Name"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Age"
                      />
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  `${bed.patient?.name}, ${bed.patient?.age} years, ${bed.patient?.gender}`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Contact</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <Input
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Contact number"
                  />
                ) : (
                  bed.patient?.contact
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <Textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Address"
                    rows={2}
                  />
                ) : (
                  bed.patient?.address
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Aadhaar</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <Input
                    value={formData.aadhaar}
                    onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                    placeholder="Aadhaar number"
                  />
                ) : (
                  bed.patient?.aadhaar
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Stethoscope className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Medical Info</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <div className="space-y-2 mt-2">
                    <Input
                      value={formData.disease}
                      onChange={(e) => handleInputChange('disease', e.target.value)}
                      placeholder="Disease/Condition"
                    />
                    <Select value={formData.doctor} onValueChange={(value) => handleInputChange('doctor', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                        <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                        <SelectItem value="Dr. Anderson">Dr. Anderson</SelectItem>
                        <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  `${bed.patient?.disease} | Dr. ${bed.patient?.doctor}`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Admission Date</p>
              <p className="text-sm text-gray-600">{bed.patient?.admissionDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
              <p className="text-sm text-gray-600">
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact"
                  />
                ) : (
                  bed.patient?.emergencyContact
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="destructive"
          onClick={handleDischarge}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Discharge Patient
        </Button>
        
        <div className="flex space-x-3">
          {isEditing && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderDischargeConfirmation = () => (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-lg font-semibold text-red-600">Discharge Patient</h3>
        <p className="text-gray-600 mt-2">
          Are you sure you want to discharge <strong>{bed.patient?.name}</strong> from bed <strong>{bed.number}</strong>?
        </p>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          This action will mark the bed as available and remove the patient record from this bed.
        </p>
      </div>

      <div className="flex justify-center space-x-3">
        <Button variant="outline" onClick={() => onModeChange('view')}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDischarge}>
          <Trash2 className="mr-2 h-4 w-4" />
          Confirm Discharge
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'admit' && `Admit Patient - Bed ${bed.number}`}
            {mode === 'view' && `Patient Details - Bed ${bed.number}`}
            {mode === 'discharge' && `Discharge Patient - Bed ${bed.number}`}
          </DialogTitle>
          <DialogDescription>
            {mode === 'admit' && 'Complete the patient admission process by scanning fingerprint or entering details manually.'}
            {mode === 'view' && 'View and manage patient information, including medical details and discharge options.'}
            {mode === 'discharge' && 'Confirm patient discharge and free up the bed for new admissions.'}
          </DialogDescription>
        </DialogHeader>
        
        {mode === 'admit' && renderAdmissionForm()}
        {mode === 'view' && renderPatientView()}
        {mode === 'discharge' && renderDischargeConfirmation()}
      </DialogContent>
    </Dialog>
  );
}