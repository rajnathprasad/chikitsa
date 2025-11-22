import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, Upload, User, Heart } from "lucide-react";

interface CitizenSignupProps {
  onBack: () => void;
}

export function CitizenSignup({ onBack }: CitizenSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
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
    bloodGroup: '',
    maritalStatus: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    
    // Identity & Address
    aadharNumber: '',
    panNumber: '',
    abhaNumber: '',
    ayushmanCardNumber: '',
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPostalCode: '',
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPostalCode: '',
    sameAsCurrent: false,
    
    // Health & Medical
    chronicConditions: '',
    allergies: '',
    currentMedications: '',
    organDonor: '',
    
    // Insurance
    healthInsuranceProvider: '',
    insurancePolicyNumber: '',
    lifeInsurance: '',
    lifeInsuranceProvider: '',
    lifeInsurancePolicyNumber: '',
    
    // Other
    occupation: '',
    incomeGroup: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const incomeGroups = ['Below 1 Lakh', '1-3 Lakhs', '3-5 Lakhs', '5-10 Lakhs', '10+ Lakhs'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    console.log('Citizen signup data:', formData);
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
              {genders.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
          <Label htmlFor="bloodGroup">Blood Group *</Label>
          <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maritalStatus">Marital Status</Label>
        <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            {maritalStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
          <Input
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContactNumber">Emergency Contact Number *</Label>
          <Input
            id="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>
      </div>
    </div>
  );

  const renderIdentityAddress = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Card Number *</Label>
          <Input
            id="aadharNumber"
            value={formData.aadharNumber}
            onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
            placeholder="1234 5678 9012"
            maxLength={12}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Card Number</Label>
          <Input
            id="panNumber"
            value={formData.panNumber}
            onChange={(e) => handleInputChange('panNumber', e.target.value)}
            placeholder="ABCDE1234F"
            maxLength={10}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="abhaNumber">ABHA Number *</Label>
          <Input
            id="abhaNumber"
            value={formData.abhaNumber}
            onChange={(e) => handleInputChange('abhaNumber', e.target.value)}
            placeholder="12-3456-7890-1234"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ayushmanCardNumber">Ayushman Card Number</Label>
          <Input
            id="ayushmanCardNumber"
            value={formData.ayushmanCardNumber}
            onChange={(e) => handleInputChange('ayushmanCardNumber', e.target.value)}
            placeholder="Card number if applicable"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Current Address</h4>
        <div className="space-y-2">
          <Label htmlFor="currentAddress">Street Address *</Label>
          <Textarea
            id="currentAddress"
            value={formData.currentAddress}
            onChange={(e) => handleInputChange('currentAddress', e.target.value)}
            placeholder="House number, building, street, area"
            rows={2}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentCity">City *</Label>
            <Input
              id="currentCity"
              value={formData.currentCity}
              onChange={(e) => handleInputChange('currentCity', e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentState">State *</Label>
            <Input
              id="currentState"
              value={formData.currentState}
              onChange={(e) => handleInputChange('currentState', e.target.value)}
              placeholder="State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentPostalCode">Postal Code *</Label>
            <Input
              id="currentPostalCode"
              value={formData.currentPostalCode}
              onChange={(e) => handleInputChange('currentPostalCode', e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sameAsCurrent"
          checked={formData.sameAsCurrent}
          onCheckedChange={(checked) => handleInputChange('sameAsCurrent', checked)}
        />
        <Label htmlFor="sameAsCurrent">Permanent address is same as current address</Label>
      </div>

      {!formData.sameAsCurrent && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Permanent Address</h4>
          <div className="space-y-2">
            <Label htmlFor="permanentAddress">Street Address *</Label>
            <Textarea
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
              placeholder="House number, building, street, area"
              rows={2}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="permanentCity">City *</Label>
              <Input
                id="permanentCity"
                value={formData.permanentCity}
                onChange={(e) => handleInputChange('permanentCity', e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanentState">State *</Label>
              <Input
                id="permanentState"
                value={formData.permanentState}
                onChange={(e) => handleInputChange('permanentState', e.target.value)}
                placeholder="State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanentPostalCode">Postal Code *</Label>
              <Input
                id="permanentPostalCode"
                value={formData.permanentPostalCode}
                onChange={(e) => handleInputChange('permanentPostalCode', e.target.value)}
                placeholder="123456"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderHealthMedical = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Medical Records</h4>
        <div className="space-y-2">
          <Label htmlFor="medicalRecords">Previous Medical Records & Reports</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Click to upload medical records</p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="chronicConditions">Chronic Conditions</Label>
        <Textarea
          id="chronicConditions"
          value={formData.chronicConditions}
          onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
          placeholder="Diabetes, Hypertension, Heart Disease, etc. (if any)"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea
          id="allergies"
          value={formData.allergies}
          onChange={(e) => handleInputChange('allergies', e.target.value)}
          placeholder="Food allergies, drug allergies, environmental allergies, etc."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={(e) => handleInputChange('currentMedications', e.target.value)}
          placeholder="List any medications you are currently taking"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organDonor">Organ Donor</Label>
        <Select value={formData.organDonor} onValueChange={(value) => handleInputChange('organDonor', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Are you an organ donor?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="considering">Considering</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderInsurance = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Health Insurance</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="healthInsuranceProvider">Insurance Provider Name</Label>
            <Input
              id="healthInsuranceProvider"
              value={formData.healthInsuranceProvider}
              onChange={(e) => handleInputChange('healthInsuranceProvider', e.target.value)}
              placeholder="e.g., Star Health, HDFC ERGO"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
            <Input
              id="insurancePolicyNumber"
              value={formData.insurancePolicyNumber}
              onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
              placeholder="Policy number"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="insuranceCard">Upload Insurance Card/Document</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Click to upload insurance documents</p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Life Insurance</h4>
        <div className="space-y-2">
          <Label htmlFor="lifeInsurance">Do you have Life Insurance?</Label>
          <Select value={formData.lifeInsurance} onValueChange={(value) => handleInputChange('lifeInsurance', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.lifeInsurance === 'yes' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lifeInsuranceProvider">Provider Name</Label>
              <Input
                id="lifeInsuranceProvider"
                value={formData.lifeInsuranceProvider}
                onChange={(e) => handleInputChange('lifeInsuranceProvider', e.target.value)}
                placeholder="e.g., LIC, HDFC Life"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifeInsurancePolicyNumber">Policy Number</Label>
              <Input
                id="lifeInsurancePolicyNumber"
                value={formData.lifeInsurancePolicyNumber}
                onChange={(e) => handleInputChange('lifeInsurancePolicyNumber', e.target.value)}
                placeholder="Policy number"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOtherInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation *</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            placeholder="Your profession/occupation"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="incomeGroup">Income Group *</Label>
          <Select value={formData.incomeGroup} onValueChange={(value) => handleInputChange('incomeGroup', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              {incomeGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-3">Government Scheme Eligibility</h4>
        <p className="text-green-700 text-sm mb-4">
          Based on your income group and other information, you may be eligible for various 
          government healthcare schemes like Ayushman Bharat, state-specific schemes, and subsidies.
        </p>
        <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
          Check Eligibility
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Terms and Conditions</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="healthData" />
            <Label htmlFor="healthData" className="text-sm leading-relaxed">
              I consent to the collection, storage, and processing of my health data as per HIPAA and Indian data protection laws
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="communications" />
            <Label htmlFor="communications" className="text-sm leading-relaxed">
              I agree to receive important communications about my healthcare and platform updates
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Identity & Address';
      case 3: return 'Health & Medical';
      case 4: return 'Insurance Details';
      case 5: return 'Additional Information';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderIdentityAddress();
      case 3: return renderHealthMedical();
      case 4: return renderInsurance();
      case 5: return renderOtherInfo();
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
              <div className="bg-green-100 p-3 rounded-xl">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Citizen Registration</h1>
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
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center space-x-2"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center space-x-2"
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