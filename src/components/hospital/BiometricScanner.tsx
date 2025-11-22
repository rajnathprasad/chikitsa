import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  Fingerprint, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  User
} from "lucide-react";

interface BiometricScannerProps {
  onSuccess: (patientData: any) => void;
  onCancel: () => void;
}

export function BiometricScanner({ onSuccess, onCancel }: BiometricScannerProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'success' | 'failed' | 'idle'>('idle');
  const [patientFound, setPatientFound] = useState<any>(null);

  // Mock patient database
  const mockPatients = [
    {
      id: 'patient-001',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      contact: '+91 98765 43210',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      aadhaar: '1234 5678 9012 3456',
      emergencyContact: '+91 98765 43211',
      fingerprintId: 'fp-001'
    },
    {
      id: 'patient-002',
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      contact: '+91 98765 43212',
      address: '456 Park Avenue, Delhi, Delhi 110001',
      aadhaar: '2345 6789 0123 4567',
      emergencyContact: '+91 98765 43213',
      fingerprintId: 'fp-002'
    },
    {
      id: 'patient-003',
      name: 'Ahmed Ali',
      age: 28,
      gender: 'Male',
      contact: '+91 98765 43214',
      address: '789 Garden Road, Bangalore, Karnataka 560001',
      aadhaar: '3456 7890 1234 5678',
      emergencyContact: '+91 98765 43215',
      fingerprintId: 'fp-003'
    }
  ];

  const startScan = () => {
    setScanStatus('scanning');
    setScanProgress(0);
    setPatientFound(null);

    // Simulate fingerprint scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate random success/failure (80% success rate)
          const isSuccess = Math.random() > 0.2;
          
          if (isSuccess) {
            // Randomly select a patient from mock database
            const randomPatient = mockPatients[Math.floor(Math.random() * mockPatients.length)];
            setPatientFound(randomPatient);
            setScanStatus('success');
          } else {
            setScanStatus('failed');
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSuccess = () => {
    if (patientFound) {
      onSuccess(patientFound);
    }
  };

  const resetScan = () => {
    setScanStatus('idle');
    setScanProgress(0);
    setPatientFound(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-32 h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6 relative">
          <Fingerprint className={`h-16 w-16 transition-all duration-300 ${
            scanStatus === 'scanning' ? 'text-blue-600 animate-pulse' :
            scanStatus === 'success' ? 'text-green-600' :
            scanStatus === 'failed' ? 'text-red-600' :
            'text-gray-600'
          }`} />
          
          {scanStatus === 'success' && (
            <div className="absolute -top-2 -right-2">
              <CheckCircle className="h-8 w-8 text-green-600 bg-white rounded-full" />
            </div>
          )}
          
          {scanStatus === 'failed' && (
            <div className="absolute -top-2 -right-2">
              <XCircle className="h-8 w-8 text-red-600 bg-white rounded-full" />
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">
          {scanStatus === 'idle' && 'Ready to Scan'}
          {scanStatus === 'scanning' && 'Scanning Fingerprint...'}
          {scanStatus === 'success' && 'Patient Found!'}
          {scanStatus === 'failed' && 'Scan Failed'}
        </h3>

        <p className="text-gray-600 mb-4">
          {scanStatus === 'idle' && 'Place your finger on the scanner to begin'}
          {scanStatus === 'scanning' && 'Please keep your finger steady on the scanner'}
          {scanStatus === 'success' && 'Patient information retrieved successfully'}
          {scanStatus === 'failed' && 'Fingerprint not recognized. Please try again.'}
        </p>

        {scanStatus === 'scanning' && (
          <div className="space-y-2">
            <Progress value={scanProgress} className="w-full" />
            <p className="text-sm text-gray-500">{scanProgress}% complete</p>
          </div>
        )}
      </div>

      {/* Patient Information Display */}
      {scanStatus === 'success' && patientFound && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <User className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Patient Information</h4>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{patientFound.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Age:</span>
              <span className="ml-2 text-gray-900">{patientFound.age} years</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Gender:</span>
              <span className="ml-2 text-gray-900">{patientFound.gender}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Contact:</span>
              <span className="ml-2 text-gray-900">{patientFound.contact}</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="ml-2 text-gray-900">{patientFound.address}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-3">
        {scanStatus === 'idle' && (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={startScan}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Fingerprint className="mr-2 h-4 w-4" />
              Start Scan
            </Button>
          </>
        )}

        {scanStatus === 'scanning' && (
          <Button variant="outline" onClick={onCancel}>
            Cancel Scan
          </Button>
        )}

        {scanStatus === 'success' && (
          <>
            <Button variant="outline" onClick={resetScan}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Scan Again
            </Button>
            <Button onClick={handleSuccess} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Use This Patient
            </Button>
          </>
        )}

        {scanStatus === 'failed' && (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={resetScan}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Scanner Instructions</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Ensure your finger is clean and dry</li>
          <li>• Place finger firmly on the scanner surface</li>
          <li>• Keep finger steady during the scan</li>
          <li>• If scan fails, try using a different finger</li>
        </ul>
      </div>
    </div>
  );
}