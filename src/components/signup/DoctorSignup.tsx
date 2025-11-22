import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, Upload, Stethoscope, Heart } from "lucide-react";

interface DoctorSignupProps {
  onBack: () => void;
}

export function DoctorSignup({ onBack }: DoctorSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    
    // Professional Details
    registrationNumber: '',
    qualifications: '',
    specialization: '',
    subSpecialization: '',
    experience: '',
    languagesSpoken: '',
    
    // Practice & Availability
    hospitalAffiliation: '',
    clinicAddress: '',
    consultationType: '',
    consultationFees: '',
    timeSlots: {
      monday: { start: '', end: '', available: false },
      tuesday: { start: '', end: '', available: false },
      wednesday: { start: '', end: '', available: false },
      thursday: { start: '', end: '', available: false },
      friday: { start: '', end: '', available: false },
      saturday: { start: '', end: '', available: false },
      sunday: { start: '', end: '', available: false }
    },
    emergencyContact: '',
    
    // Insurance & Compliance
    acceptedInsurance: [],
    additionalLicenses: ''
  });

  const specializations = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Gynecology',
    'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology',
    'Surgery', 'Urology', 'Family Medicine', 'Internal Medicine', 'Emergency Medicine'
  ];

  const consultationTypes = ['In-person', 'Online', 'Both'];
  const experienceRanges = ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '16-20 years', '20+ years'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotChange = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: {
        ...prev.timeSlots,
        [day]: {
          ...prev.timeSlots[day as keyof typeof prev.timeSlots],
          [field]: value
        }
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
    console.log('Doctor signup data:', formData);
    // Handle form submission
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
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
          placeholder="Enter your email address"
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
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Click to upload profile picture</p>
          <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
        </div>
      </div>
    </div>
  );

  const renderProfessionalDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="registrationNumber">Medical Registration Number *</Label>
        <Input
          id="registrationNumber"
          value={formData.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
          placeholder="MCI/State Council Registration Number"
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
        <Label htmlFor="qualifications">Qualifications *</Label>
        <Input
          id="qualifications"
          value={formData.qualifications}
          onChange={(e) => handleInputChange('qualifications', e.target.value)}
          placeholder="MBBS, MD, MS, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualificationCertificates">Upload Qualification Certificates *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Upload qualification certificates</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB (multiple files allowed)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization *</Label>
          <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subSpecialization">Sub-specialization</Label>
          <Input
            id="subSpecialization"
            value={formData.subSpecialization}
            onChange={(e) => handleInputChange('subSpecialization', e.target.value)}
            placeholder="e.g., Interventional Cardiology"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience range" />
            </SelectTrigger>
            <SelectContent>
              {experienceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="languagesSpoken">Languages Spoken *</Label>
          <Input
            id="languagesSpoken"
            value={formData.languagesSpoken}
            onChange={(e) => handleInputChange('languagesSpoken', e.target.value)}
            placeholder="English, Hindi, Bengali, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderPracticeAvailability = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="hospitalAffiliation">Hospital/Clinic Affiliation *</Label>
        <Select value={formData.hospitalAffiliation} onValueChange={(value) => handleInputChange('hospitalAffiliation', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Choose registered hospital or add new" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aiims-delhi">AIIMS Delhi</SelectItem>
            <SelectItem value="apollo-mumbai">Apollo Hospital Mumbai</SelectItem>
            <SelectItem value="fortis-bangalore">Fortis Hospital Bangalore</SelectItem>
            <SelectItem value="independent">Independent Practice</SelectItem>
            <SelectItem value="add-new">Add New Hospital/Clinic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.hospitalAffiliation === 'independent' && (
        <div className="space-y-2">
          <Label htmlFor="clinicAddress">Clinic/Practice Address *</Label>
          <Textarea
            id="clinicAddress"
            value={formData.clinicAddress}
            onChange={(e) => handleInputChange('clinicAddress', e.target.value)}
            placeholder="Complete address with pincode"
            rows={3}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="consultationType">Consultation Type *</Label>
          <Select value={formData.consultationType} onValueChange={(value) => handleInputChange('consultationType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select consultation type" />
            </SelectTrigger>
            <SelectContent>
              {consultationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="consultationFees">Consultation Fees (₹) *</Label>
          <Input
            id="consultationFees"
            type="number"
            value={formData.consultationFees}
            onChange={(e) => handleInputChange('consultationFees', e.target.value)}
            placeholder="500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Available Time Slots</h4>
        <div className="space-y-4">
          {Object.keys(formData.timeSlots).map((day) => (
            <div key={day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-20">
                <Checkbox
                  id={`${day}-available`}
                  checked={formData.timeSlots[day as keyof typeof formData.timeSlots].available}
                  onCheckedChange={(checked) => handleTimeSlotChange(day, 'available', checked)}
                />
                <Label htmlFor={`${day}-available`} className="ml-2 capitalize">
                  {day}
                </Label>
              </div>
              {formData.timeSlots[day as keyof typeof formData.timeSlots].available && (
                <>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${day}-start`}>From:</Label>
                    <Input
                      id={`${day}-start`}
                      type="time"
                      value={formData.timeSlots[day as keyof typeof formData.timeSlots].start}
                      onChange={(e) => handleTimeSlotChange(day, 'start', e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${day}-end`}>To:</Label>
                    <Input
                      id={`${day}-end`}
                      type="time"
                      value={formData.timeSlots[day as keyof typeof formData.timeSlots].end}
                      onChange={(e) => handleTimeSlotChange(day, 'end', e.target.value)}
                      className="w-32"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
          placeholder="+91 9876543210"
        />
      </div>
    </div>
  );

  const renderInsuranceCompliance = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Accepted Insurance Providers</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz',
            'New India Assurance', 'Oriental Insurance', 'United India Insurance',
            'National Insurance', 'LIC Health', 'Care Health Insurance'
          ].map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox
                id={provider}
                checked={formData.acceptedInsurance.includes(provider)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange('acceptedInsurance', [...formData.acceptedInsurance, provider]);
                  } else {
                    handleInputChange('acceptedInsurance', formData.acceptedInsurance.filter((p: string) => p !== provider));
                  }
                }}
              />
              <Label htmlFor={provider}>{provider}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalLicenses">Additional Licenses</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Additional Licenses (e.g., Telemedicine License)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Upload additional licenses</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB each</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">Verification Process</h4>
        <p className="text-blue-700 text-sm mb-4">
          Your credentials will be verified by our medical board within 2-3 business days. 
          You'll receive an email confirmation once verification is complete.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Medical registration verification</li>
          <li>• Qualification certificate validation</li>
          <li>• Hospital affiliation confirmation</li>
          <li>• Background check completion</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Terms and Conditions</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="medical-terms" />
            <Label htmlFor="medical-terms" className="text-sm leading-relaxed">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Medical Practitioner Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Code of Conduct</a>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="patient-data" />
            <Label htmlFor="patient-data" className="text-sm leading-relaxed">
              I understand and agree to handle patient data with utmost confidentiality as per HIPAA regulations
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="platform-guidelines" />
            <Label htmlFor="platform-guidelines" className="text-sm leading-relaxed">
              I agree to follow platform guidelines for consultations and maintain professional standards
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Professional Details';
      case 3: return 'Practice & Availability';
      case 4: return 'Insurance & Compliance';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderProfessionalDetails();
      case 3: return renderPracticeAvailability();
      case 4: return renderInsuranceCompliance();
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
              <div className="bg-purple-100 p-3 rounded-xl">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Doctor Registration</h1>
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
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center space-x-2"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center space-x-2"
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