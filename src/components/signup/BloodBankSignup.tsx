import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, Upload, Droplets, Heart } from "lucide-react";

interface BloodBankSignupProps {
  onBack: () => void;
}

export function BloodBankSignup({ onBack }: BloodBankSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    // Basic Info
    bloodBankName: '',
    bloodBankId: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactPersonName: '',
    contactPersonPhone: '',
    bloodBankPhone: '',
    bloodBankAddress: '',
    city: '',
    state: '',
    postalCode: '',
    mapLink: '',
    
    // Registration & Verification
    registrationNumber: '',
    
    // Services & Inventory
    services: [],
    currentStock: {
      'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
      'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
    },
    operatingHours: {
      weekdays: { start: '', end: '' },
      weekends: { start: '', end: '' },
      emergency: true
    },
    emergencyContact: '',
    
    // Insurance & Tie-Ups
    partnerHospitals: [],
    governmentSchemes: []
  });

  const bloodBankServices = [
    'Blood Collection',
    'Plasma Collection',
    'Platelet Donation',
    'Whole Blood Storage',
    'Component Separation',
    'Blood Testing & Screening',
    'Apheresis Services',
    'Rare Blood Type Banking',
    'Mobile Blood Collection',
    'Emergency Blood Supply'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const governmentSchemes = [
    'National Blood Transfusion Services',
    'State Blood Transfusion Council',
    'Voluntary Blood Donation Program',
    'Emergency Blood Supply Scheme',
    'Thalassemia Blood Support Program'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStockChange = (bloodGroup: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      currentStock: {
        ...prev.currentStock,
        [bloodGroup]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Blood Bank signup data:', formData);
    // Handle form submission
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bloodBankName">Blood Bank Name *</Label>
          <Input
            id="bloodBankName"
            value={formData.bloodBankName}
            onChange={(e) => handleInputChange('bloodBankName', e.target.value)}
            placeholder="Enter blood bank name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodBankId">Blood Bank ID *</Label>
          <Input
            id="bloodBankId"
            value={formData.bloodBankId}
            onChange={(e) => handleInputChange('bloodBankId', e.target.value)}
            placeholder="Unique blood bank identifier"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="bloodbank@example.com"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="password">Create Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Create a strong password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactPersonName">Contact Person's Name *</Label>
          <Input
            id="contactPersonName"
            value={formData.contactPersonName}
            onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
            placeholder="Primary contact person"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPersonPhone">Contact Person's Phone *</Label>
          <Input
            id="contactPersonPhone"
            value={formData.contactPersonPhone}
            onChange={(e) => handleInputChange('contactPersonPhone', e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodBankPhone">Blood Bank Phone Number *</Label>
        <Input
          id="bloodBankPhone"
          value={formData.bloodBankPhone}
          onChange={(e) => handleInputChange('bloodBankPhone', e.target.value)}
          placeholder="+91 11 2234 5678"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Blood Bank Address</h4>
        <div className="space-y-2">
          <Label htmlFor="bloodBankAddress">Street Address *</Label>
          <Textarea
            id="bloodBankAddress"
            value={formData.bloodBankAddress}
            onChange={(e) => handleInputChange('bloodBankAddress', e.target.value)}
            placeholder="Complete blood bank address"
            rows={3}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mapLink">Google Maps Link</Label>
        <Input
          id="mapLink"
          value={formData.mapLink}
          onChange={(e) => handleInputChange('mapLink', e.target.value)}
          placeholder="https://maps.google.com/..."
        />
      </div>
    </div>
  );

  const renderRegistrationVerification = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="registrationNumber">Registration Number *</Label>
        <Input
          id="registrationNumber"
          value={formData.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
          placeholder="Blood bank registration/license number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registrationCertificate">Upload Registration Certificate *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Upload registration certificate</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherLicenses">Other Licenses</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Upload additional licenses</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB (multiple files allowed)</p>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <h4 className="font-semibold text-red-900 mb-3">Quality & Safety Standards</h4>
        <p className="text-red-700 text-sm mb-4">
          All blood banks must comply with strict quality and safety standards as per Indian regulations:
        </p>
        <ul className="text-red-700 text-sm space-y-1">
          <li>• NABH or equivalent accreditation</li>
          <li>• WHO/FDA approved testing protocols</li>
          <li>• Cold chain maintenance certification</li>
          <li>• Regular quality audits compliance</li>
          <li>• Staff training and certification</li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">Verification Process</h4>
        <p className="text-blue-700 text-sm mb-4">
          Your blood bank credentials will be verified by our compliance team within 3-5 business days. 
          This includes verification of registration, licenses, and quality standards.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Registration and license verification</li>
          <li>• Quality certification validation</li>
          <li>• Facility inspection (if required)</li>
          <li>• Staff qualification verification</li>
        </ul>
      </div>
    </div>
  );

  const renderServicesInventory = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Services Offered</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {bloodBankServices.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services.includes(service)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('services', [...formData.services, service]);
                  } else {
                    handleInputChange('services', formData.services.filter((s: string) => s !== service));
                  }
                }}
              />
              <Label htmlFor={service}>{service}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Current Blood Stock (Units)</h4>
        <div className="grid md:grid-cols-4 gap-4">
          {bloodGroups.map((group) => (
            <div key={group} className="space-y-2">
              <Label htmlFor={`stock-${group}`} className="flex items-center space-x-2">
                <span className="font-medium text-red-600">{group}</span>
              </Label>
              <Input
                id={`stock-${group}`}
                type="number"
                value={formData.currentStock[group as keyof typeof formData.currentStock]}
                onChange={(e) => handleStockChange(group, parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Enter current available units for each blood group. This will help hospitals locate blood availability in real-time.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Operating Hours</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Weekdays (Monday - Friday)</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="weekday-start">From:</Label>
                <Input
                  id="weekday-start"
                  type="time"
                  value={formData.operatingHours.weekdays.start}
                  onChange={(e) => handleInputChange('operatingHours', {
                    ...formData.operatingHours,
                    weekdays: { ...formData.operatingHours.weekdays, start: e.target.value }
                  })}
                  className="w-32"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="weekday-end">To:</Label>
                <Input
                  id="weekday-end"
                  type="time"
                  value={formData.operatingHours.weekdays.end}
                  onChange={(e) => handleInputChange('operatingHours', {
                    ...formData.operatingHours,
                    weekdays: { ...formData.operatingHours.weekdays, end: e.target.value }
                  })}
                  className="w-32"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Label>Weekends (Saturday - Sunday)</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="weekend-start">From:</Label>
                <Input
                  id="weekend-start"
                  type="time"
                  value={formData.operatingHours.weekends.start}
                  onChange={(e) => handleInputChange('operatingHours', {
                    ...formData.operatingHours,
                    weekends: { ...formData.operatingHours.weekends, start: e.target.value }
                  })}
                  className="w-32"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="weekend-end">To:</Label>
                <Input
                  id="weekend-end"
                  type="time"
                  value={formData.operatingHours.weekends.end}
                  onChange={(e) => handleInputChange('operatingHours', {
                    ...formData.operatingHours,
                    weekends: { ...formData.operatingHours.weekends, end: e.target.value }
                  })}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="emergency-24x7"
            checked={formData.operatingHours.emergency}
            onCheckedChange={(checked) => handleInputChange('operatingHours', {
              ...formData.operatingHours,
              emergency: checked
            })}
          />
          <Label htmlFor="emergency-24x7">24/7 Emergency Blood Supply Available</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyContact">Emergency Contact Number *</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          placeholder="+91 9876543210"
        />
        <p className="text-sm text-gray-600">
          This number will be used for urgent blood requests and emergency coordination.
        </p>
      </div>
    </div>
  );

  const renderPartnershipsSchemes = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Partner Hospitals</h4>
        <div className="space-y-2">
          <Label htmlFor="partnerHospitals">Add Partner Hospitals</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Search and add partner hospitals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aiims-delhi">AIIMS Delhi</SelectItem>
              <SelectItem value="apollo-mumbai">Apollo Hospital Mumbai</SelectItem>
              <SelectItem value="fortis-bangalore">Fortis Hospital Bangalore</SelectItem>
              <SelectItem value="max-gurgaon">Max Hospital Gurgaon</SelectItem>
              <SelectItem value="medanta-gurgaon">Medanta Hospital Gurgaon</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            Partner hospitals will have priority access to your blood inventory and receive real-time stock updates.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Government Schemes Supported</h4>
        <div className="grid md:grid-cols-1 gap-4">
          {governmentSchemes.map((scheme) => (
            <div key={scheme} className="flex items-center space-x-2">
              <Checkbox
                id={`scheme-${scheme}`}
                checked={formData.governmentSchemes.includes(scheme)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('governmentSchemes', [...formData.governmentSchemes, scheme]);
                  } else {
                    handleInputChange('governmentSchemes', formData.governmentSchemes.filter((s: string) => s !== scheme));
                  }
                }}
              />
              <Label htmlFor={`scheme-${scheme}`}>{scheme}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
        <h4 className="font-semibold text-red-900 mb-3">Life-Saving Impact</h4>
        <p className="text-red-700 text-sm mb-4">
          By joining Chikitsa's blood bank network, you'll be part of a life-saving ecosystem:
        </p>
        <ul className="text-red-700 text-sm space-y-1">
          <li>• Instant emergency blood requests from hospitals</li>
          <li>• Real-time donor matching and notification</li>
          <li>• Automated inventory management and alerts</li>
          <li>• Cross-regional blood sharing during shortages</li>
          <li>• Analytics for better demand forecasting</li>
          <li>• Donor engagement and retention programs</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-3">Technology Benefits</h4>
        <p className="text-green-700 text-sm mb-4">
          Advanced features to streamline your blood bank operations:
        </p>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• Automated expiry date tracking and alerts</li>
          <li>• SMS/Push notifications for critical stock levels</li>
          <li>• Integration with hospital management systems</li>
          <li>• Donor database management and history</li>
          <li>• Compliance reporting and documentation</li>
          <li>• Mobile app for field staff and collectors</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Terms and Conditions</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="bloodbank-terms" />
            <Label htmlFor="bloodbank-terms" className="text-sm leading-relaxed">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Blood Bank Partnership Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Quality Standards Agreement</a>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="emergency-support" />
            <Label htmlFor="emergency-support" className="text-sm leading-relaxed">
              I agree to provide emergency blood support as per platform protocols and maintain 24/7 emergency contact availability
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="data-accuracy" />
            <Label htmlFor="data-accuracy" className="text-sm leading-relaxed">
              I agree to maintain accurate real-time inventory data and promptly update stock levels for effective coordination
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="quality-compliance" />
            <Label htmlFor="quality-compliance" className="text-sm leading-relaxed">
              I confirm compliance with all blood safety regulations and quality standards as per Indian medical guidelines
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Registration & Verification';
      case 3: return 'Services & Inventory';
      case 4: return 'Partnerships & Schemes';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderBasicInfo();
      case 2: return renderRegistrationVerification();
      case 3: return renderServicesInventory();
      case 4: return renderPartnershipsSchemes();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Chikitsa
              </span>
            </div>
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Role Selection</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <Droplets className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blood Bank Registration</h1>
                <p className="text-gray-600">Step {currentStep} of {totalSteps}: {getStepTitle()}</p>
              </div>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex items-center space-x-2"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}