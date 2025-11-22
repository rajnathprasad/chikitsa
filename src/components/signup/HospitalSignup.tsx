import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, Upload, Hospital, Heart } from "lucide-react";

interface HospitalSignupProps {
  onBack: () => void;
}

export function HospitalSignup({ onBack }: HospitalSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    // Basic Info
    hospitalName: '',
    hospitalId: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactPersonName: '',
    contactPersonPhone: '',
    hospitalPhone: '',
    hospitalAddress: '',
    city: '',
    state: '',
    postalCode: '',
    mapLink: '',
    
    // Registration & Verification
    registrationNumber: '',
    hospitalType: '',
    
    // Facilities & Resources
    beds: {
      emergency: 0,
      opd: 0,
      surgical: 0,
      medical: 0,
      maternity: 0,
      pediatric: 0,
      icu: 0,
      ventilators: 0
    },
    facilities: [],
    operatingHours: {
      weekdays: { start: '', end: '' },
      weekends: { start: '', end: '' },
      emergency: true
    },
    
    // Insurance & Tie-Ups
    acceptedInsurance: [],
    governmentSchemes: []
  });

  const hospitalTypes = ['Government', 'Private', 'Trust/NGO', 'Corporate', 'Charitable'];
  const medicalFacilities = [
    'X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'Dialysis', 'Blood Bank Unit',
    'Pharmacy', 'Ambulance Service', 'Laboratory', 'ECG', 'Echo', 'Endoscopy',
    'Operation Theater', 'Cardiac Catheterization', 'Nuclear Medicine', 'Physiotherapy'
  ];

  const insuranceProviders = [
    'Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz',
    'New India Assurance', 'Oriental Insurance', 'United India Insurance',
    'National Insurance', 'LIC Health', 'Care Health Insurance'
  ];

  const governmentSchemes = [
    'Ayushman Bharat', 'ESI', 'CGHS', 'State Health Insurance',
    'Ex-Servicemen Contributory Health Scheme', 'Railway Medical'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBedChange = (bedType: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      beds: {
        ...prev.beds,
        [bedType]: value
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
    console.log('Hospital signup data:', formData);
    // Handle form submission
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hospitalName">Hospital Name *</Label>
          <Input
            id="hospitalName"
            value={formData.hospitalName}
            onChange={(e) => handleInputChange('hospitalName', e.target.value)}
            placeholder="Enter hospital name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospitalId">Hospital ID *</Label>
          <Input
            id="hospitalId"
            value={formData.hospitalId}
            onChange={(e) => handleInputChange('hospitalId', e.target.value)}
            placeholder="Unique hospital identifier"
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
          placeholder="hospital@example.com"
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
        <Label htmlFor="hospitalPhone">Hospital Phone Number *</Label>
        <Input
          id="hospitalPhone"
          value={formData.hospitalPhone}
          onChange={(e) => handleInputChange('hospitalPhone', e.target.value)}
          placeholder="+91 11 2234 5678"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Hospital Address</h4>
        <div className="space-y-2">
          <Label htmlFor="hospitalAddress">Street Address *</Label>
          <Textarea
            id="hospitalAddress"
            value={formData.hospitalAddress}
            onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
            placeholder="Complete hospital address"
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
          placeholder="Hospital registration/license number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalType">Hospital Type *</Label>
        <Select value={formData.hospitalType} onValueChange={(value) => handleInputChange('hospitalType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select hospital type" />
          </SelectTrigger>
          <SelectContent>
            {hospitalTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="establishmentCertificate">Clinical Establishment Certificate *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Upload establishment certificate</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherLicenses">Other Licenses (ISO, NABH, JCI, etc.)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Upload additional licenses</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB (multiple files allowed)</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">Verification Process</h4>
        <p className="text-blue-700 text-sm mb-4">
          Your hospital credentials will be verified by our compliance team within 3-5 business days. 
          This includes verification of registration, licenses, and facilities.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Hospital registration verification</li>
          <li>• License and certificate validation</li>
          <li>• Facility inspection (if required)</li>
          <li>• Compliance check completion</li>
        </ul>
      </div>
    </div>
  );

  const renderFacilitiesResources = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Bed Availability</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyBeds">Emergency Ward Beds</Label>
            <Input
              id="emergencyBeds"
              type="number"
              value={formData.beds.emergency}
              onChange={(e) => handleBedChange('emergency', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opdBeds">OPD Ward Beds</Label>
            <Input
              id="opdBeds"
              type="number"
              value={formData.beds.opd}
              onChange={(e) => handleBedChange('opd', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surgicalBeds">Surgical Ward Beds</Label>
            <Input
              id="surgicalBeds"
              type="number"
              value={formData.beds.surgical}
              onChange={(e) => handleBedChange('surgical', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicalBeds">Medical Ward Beds</Label>
            <Input
              id="medicalBeds"
              type="number"
              value={formData.beds.medical}
              onChange={(e) => handleBedChange('medical', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maternityBeds">Maternity Ward Beds</Label>
            <Input
              id="maternityBeds"
              type="number"
              value={formData.beds.maternity}
              onChange={(e) => handleBedChange('maternity', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pediatricBeds">Pediatric Ward Beds</Label>
            <Input
              id="pediatricBeds"
              type="number"
              value={formData.beds.pediatric}
              onChange={(e) => handleBedChange('pediatric', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icuBeds">ICU Beds</Label>
            <Input
              id="icuBeds"
              type="number"
              value={formData.beds.icu}
              onChange={(e) => handleBedChange('icu', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ventilators">Ventilators Available</Label>
            <Input
              id="ventilators"
              type="number"
              value={formData.beds.ventilators}
              onChange={(e) => handleBedChange('ventilators', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Medical Facilities</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {medicalFacilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={facility}
                checked={formData.facilities.includes(facility)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('facilities', [...formData.facilities, facility]);
                  } else {
                    handleInputChange('facilities', formData.facilities.filter((f: string) => f !== facility));
                  }
                }}
              />
              <Label htmlFor={facility}>{facility}</Label>
            </div>
          ))}
        </div>
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
          <Label htmlFor="emergency-24x7">24/7 Emergency Services Available</Label>
        </div>
      </div>
    </div>
  );

  const renderInsuranceTieUps = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Accepted Insurance Providers</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {insuranceProviders.map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox
                id={`insurance-${provider}`}
                checked={formData.acceptedInsurance.includes(provider)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('acceptedInsurance', [...formData.acceptedInsurance, provider]);
                  } else {
                    handleInputChange('acceptedInsurance', formData.acceptedInsurance.filter((p: string) => p !== provider));
                  }
                }}
              />
              <Label htmlFor={`insurance-${provider}`}>{provider}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Government Schemes Supported</h4>
        <div className="grid md:grid-cols-2 gap-4">
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

      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-3">Integration Benefits</h4>
        <p className="text-green-700 text-sm mb-4">
          By joining Chikitsa, your hospital will benefit from:
        </p>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• Automated insurance claim processing</li>
          <li>• Real-time bed availability updates</li>
          <li>• Emergency patient transfer coordination</li>
          <li>• Digital patient records management</li>
          <li>• Government scheme integration</li>
          <li>• Performance analytics and reporting</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Terms and Conditions</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="hospital-terms" />
            <Label htmlFor="hospital-terms" className="text-sm leading-relaxed">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Hospital Partnership Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Service Level Agreements</a>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="data-sharing" />
            <Label htmlFor="data-sharing" className="text-sm leading-relaxed">
              I agree to share anonymized medical data for research and public health initiatives as per guidelines
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="platform-standards" />
            <Label htmlFor="platform-standards" className="text-sm leading-relaxed">
              I agree to maintain platform standards and provide accurate real-time updates of bed availability and resources
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
      case 3: return 'Facilities & Resources';
      case 4: return 'Insurance & Tie-Ups';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderBasicInfo();
      case 2: return renderRegistrationVerification();
      case 3: return renderFacilitiesResources();
      case 4: return renderInsuranceTieUps();
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
              <div className="bg-blue-100 p-3 rounded-xl">
                <Hospital className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hospital Registration</h1>
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2"
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