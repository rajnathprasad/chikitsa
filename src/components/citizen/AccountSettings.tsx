import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  User,
  Camera,
  Save,
  Upload,
  Shield,
  FileText,
  CreditCard,
  Phone,
  Mail,
  MapPin,
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

interface AccountSettingsProps {
  citizenData: CitizenData;
}

export function AccountSettings({ citizenData }: AccountSettingsProps) {
  const [formData, setFormData] = useState(citizenData);
  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    // Handle save logic
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical Info</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profilePhoto || ''} />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl">
                      {formData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Photo</h3>
                  <p className="text-sm text-gray-500">Upload a new profile photo</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="abhaId">ABHA ID</Label>
                  <Input
                    id="abhaId"
                    value={formData.abhaId}
                    onChange={(e) => handleInputChange('abhaId', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Medical History</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
                    <Textarea placeholder="List any known allergies..." rows={3} />
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Current Medications</h4>
                    <Textarea placeholder="List current medications..." rows={3} />
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Medical Conditions</h4>
                    <Textarea placeholder="List any chronic conditions..." rows={3} />
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Family History</h4>
                    <Textarea placeholder="Relevant family medical history..." rows={3} />
                  </Card>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Medical Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insurancePolicyNo">Policy Number</Label>
                  <Input
                    id="insurancePolicyNo"
                    value={formData.insurancePolicyNo}
                    onChange={(e) => handleInputChange('insurancePolicyNo', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Additional Insurance Details</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policyStartDate">Policy Start Date</Label>
                    <Input id="policyStartDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyEndDate">Policy End Date</Label>
                    <Input id="policyEndDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverageAmount">Coverage Amount</Label>
                    <Input id="coverageAmount" placeholder="₹ 5,00,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premiumAmount">Premium Amount</Label>
                    <Input id="premiumAmount" placeholder="₹ 15,000" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Insurance Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Aadhaar Card</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload your Aadhaar card for verification</p>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Aadhaar
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-gray-900">Insurance Policy</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload insurance policy documents</p>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Policy
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Medical Reports</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload recent medical reports and prescriptions</p>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Reports
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="h-5 w-5 text-orange-600" />
                    <h4 className="font-medium text-gray-900">ID Proof</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload additional ID verification documents</p>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload ID
                  </Button>
                </Card>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">aadhaar_card.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">insurance_policy.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}