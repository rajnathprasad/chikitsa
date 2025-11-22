import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowLeft, 
  Heart, 
  User, 
  Hospital, 
  Stethoscope, 
  Droplets,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone
} from "lucide-react";

interface SignInProps {
  onBack: () => void;
  onSignUpRedirect: () => void;
  onCitizenSignIn?: () => void;
  onDoctorSignIn?: () => void;
  onHospitalSignIn?: () => void;
  onBloodBankSignIn?: () => void;
}

export function SignIn({ onBack, onSignUpRedirect, onCitizenSignIn, onDoctorSignIn, onHospitalSignIn, onBloodBankSignIn }: SignInProps) {
  const [userRole, setUserRole] = useState<string>('');
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'biometric' | 'otp'>('credentials');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    abhaNumber: '',
    hospitalId: '',
    doctorId: '',
    bloodBankId: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role: string) => {
    setUserRole(role);
    // Reset to credentials method if biometric was selected and user is not citizen
    if (loginMethod === 'biometric' && role !== 'citizen') {
      setLoginMethod('credentials');
    }
  };

  const handleSignIn = () => {
    console.log('Sign in attempt:', { userRole, loginMethod, formData });
    // Handle sign in logic here
    if (userRole === 'citizen' && onCitizenSignIn) {
      onCitizenSignIn();
    } else if (userRole === 'doctor' && onDoctorSignIn) {
      onDoctorSignIn();
    } else if (userRole === 'hospital' && onHospitalSignIn) {
      onHospitalSignIn();
    } else if (userRole === 'bloodbank' && onBloodBankSignIn) {
      onBloodBankSignIn();
    }
  };

  const handleBiometricAuth = () => {
    // Simulate biometric authentication
    console.log('Biometric authentication initiated');
    // In a real app, this would trigger fingerprint/face recognition
  };

  const handleSendOTP = () => {
    setOtpSent(true);
    console.log('OTP sent to:', formData.phoneNumber);
    // Handle OTP sending logic
  };

  const handleVerifyOTP = () => {
    console.log('Verifying OTP:', otp);
    // Handle OTP verification logic
    if (userRole === 'citizen' && onCitizenSignIn) {
      onCitizenSignIn();
    } else if (userRole === 'doctor' && onDoctorSignIn) {
      onDoctorSignIn();
    } else if (userRole === 'hospital' && onHospitalSignIn) {
      onHospitalSignIn();
    } else if (userRole === 'bloodbank' && onBloodBankSignIn) {
      onBloodBankSignIn();
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'citizen': return User;
      case 'hospital': return Hospital;
      case 'doctor': return Stethoscope;
      case 'bloodbank': return Droplets;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'citizen': return 'text-green-600 bg-green-100';
      case 'hospital': return 'text-blue-600 bg-blue-100';
      case 'doctor': return 'text-purple-600 bg-purple-100';
      case 'bloodbank': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderCredentialsLogin = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter your password"
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Role-specific additional fields */}
      {userRole === 'citizen' && (
        <div className="space-y-2">
          <Label htmlFor="abhaNumber">ABHA Number (Optional)</Label>
          <Input
            id="abhaNumber"
            value={formData.abhaNumber}
            onChange={(e) => handleInputChange('abhaNumber', e.target.value)}
            placeholder="12-3456-7890-1234"
          />
        </div>
      )}

      {userRole === 'hospital' && (
        <div className="space-y-2">
          <Label htmlFor="hospitalId">Hospital ID</Label>
          <Input
            id="hospitalId"
            value={formData.hospitalId}
            onChange={(e) => handleInputChange('hospitalId', e.target.value)}
            placeholder="Enter your hospital ID"
          />
        </div>
      )}

      {userRole === 'doctor' && (
        <div className="space-y-2">
          <Label htmlFor="doctorId">Doctor Registration Number</Label>
          <Input
            id="doctorId"
            value={formData.doctorId}
            onChange={(e) => handleInputChange('doctorId', e.target.value)}
            placeholder="Enter your registration number"
          />
        </div>
      )}

      {userRole === 'bloodbank' && (
        <div className="space-y-2">
          <Label htmlFor="bloodBankId">Blood Bank ID</Label>
          <Input
            id="bloodBankId"
            value={formData.bloodBankId}
            onChange={(e) => handleInputChange('bloodBankId', e.target.value)}
            placeholder="Enter your blood bank ID"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <Button variant="link" className="px-0 text-sm">
          Forgot password?
        </Button>
      </div>
    </div>
  );

  const renderBiometricLogin = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
          <Fingerprint className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Biometric Authentication</h3>
        <p className="text-gray-600 mb-6">
          Use your fingerprint or face recognition to sign in securely
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="biometric-email">Email Address</Label>
          <Input
            id="biometric-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
          />
        </div>

        {userRole === 'citizen' && (
          <div className="space-y-2">
            <Label htmlFor="biometric-abha">ABHA Number (Optional)</Label>
            <Input
              id="biometric-abha"
              value={formData.abhaNumber}
              onChange={(e) => handleInputChange('abhaNumber', e.target.value)}
              placeholder="12-3456-7890-1234"
            />
          </div>
        )}
      </div>

      <Button
        onClick={handleBiometricAuth}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
      >
        <Fingerprint className="mr-2 h-4 w-4" />
        Authenticate with Biometrics
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Make sure your device supports biometric authentication and it's enabled in your browser settings.
        </p>
      </div>
    </div>
  );

  const renderOTPLogin = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          placeholder="+91 9876543210"
          disabled={otpSent}
        />
      </div>

      {!otpSent ? (
        <Button
          onClick={handleSendOTP}
          className="w-full"
          disabled={!formData.phoneNumber}
        >
          <Smartphone className="mr-2 h-4 w-4" />
          Send OTP
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleVerifyOTP}
              className="flex-1"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
              }}
            >
              Resend
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            OTP sent to {formData.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );

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
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your Chikitsa account
            </p>
          </div>

          {/* Sign In Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-4">
              <CardTitle className="text-center">Sign In</CardTitle>
              
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={userRole} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Citizen</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hospital">
                      <div className="flex items-center space-x-2">
                        <Hospital className="h-4 w-4" />
                        <span>Hospital</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="doctor">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="h-4 w-4" />
                        <span>Doctor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bloodbank">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4" />
                        <span>Blood Bank</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Indicator */}
              {userRole && (
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${getRoleColor(userRole)}`}>
                  {(() => {
                    const IconComponent = getRoleIcon(userRole);
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                  <span className="font-medium capitalize">
                    Signing in as {userRole}
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {userRole && (
                <>
                  {/* Login Method Selection */}
                  <div className="space-y-3">
                    <Label>Choose Sign In Method</Label>
                    <div className={`grid gap-2 ${userRole === 'citizen' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <Button
                        variant={loginMethod === 'credentials' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLoginMethod('credentials')}
                        className="flex flex-col items-center p-3 h-auto"
                      >
                        <User className="h-4 w-4 mb-1" />
                        <span className="text-xs">Email</span>
                      </Button>
                      {userRole === 'citizen' && (
                        <Button
                          variant={loginMethod === 'biometric' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLoginMethod('biometric')}
                          className="flex flex-col items-center p-3 h-auto"
                        >
                          <Fingerprint className="h-4 w-4 mb-1" />
                          <span className="text-xs">Biometric</span>
                        </Button>
                      )}
                      <Button
                        variant={loginMethod === 'otp' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLoginMethod('otp')}
                        className="flex flex-col items-center p-3 h-auto"
                      >
                        <Smartphone className="h-4 w-4 mb-1" />
                        <span className="text-xs">OTP</span>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Login Form Based on Method */}
                  {loginMethod === 'credentials' && renderCredentialsLogin()}
                  {loginMethod === 'biometric' && renderBiometricLogin()}
                  {loginMethod === 'otp' && renderOTPLogin()}

                  {/* Sign In Button */}
                  {(loginMethod === 'credentials' || (loginMethod === 'otp' && otpSent)) && (
                    <Button
                      onClick={loginMethod === 'credentials' ? handleSignIn : handleVerifyOTP}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      disabled={
                        (loginMethod === 'credentials' && (!formData.email || !formData.password)) ||
                        (loginMethod === 'otp' && otp.length !== 6)
                      }
                    >
                      Sign In
                    </Button>
                  )}
                </>
              )}

              {/* Sign Up Link */}
              <div className="text-center">
                <Separator className="mb-4" />
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    onClick={onSignUpRedirect}
                    className="px-0 text-blue-600 hover:text-blue-700"
                  >
                    Sign up here
                  </Button>
                </p>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Security & Privacy</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Your data is encrypted and secure</li>
                  <li>• HIPAA compliant medical data handling</li>
                  <li>• Biometric data stays on your device</li>
                  <li>• Two-factor authentication available</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}