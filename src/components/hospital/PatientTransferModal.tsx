import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { MapPin, Clock, BedDouble, Activity, Stethoscope } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PatientTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: {
    id: string;
    name: string;
    age: number;
    gender: string;
    disease: string;
    requiredResources: string[];
  };
}

interface TargetHospital {
  id: string;
  name: string;
  distance: number;
  eta: string;
  freeBeds: number;
  icuBeds: number;
  ventilators: number;
  acceptanceStatus: 'pending' | 'accepted' | 'declined';
  rating: number;
}

export function PatientTransferModal({ isOpen, onClose, patient }: PatientTransferModalProps) {
  const [searchParams, setSearchParams] = useState({
    maxDistance: 10,
    requiredResources: '',
    urgency: 'high'
  });
  
  const [searchResults, setSearchResults] = useState<TargetHospital[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [transferNotes, setTransferNotes] = useState('');

  // Mock search function
  const searchHospitals = async () => {
    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults: TargetHospital[] = [
      {
        id: 'hosp-001',
        name: 'Fortis Hospital',
        distance: 3.2,
        eta: '15 mins',
        freeBeds: 8,
        icuBeds: 2,
        ventilators: 3,
        acceptanceStatus: 'pending',
        rating: 4.8
      },
      {
        id: 'hosp-002', 
        name: 'Lilavati Hospital',
        distance: 5.7,
        eta: '22 mins',
        freeBeds: 12,
        icuBeds: 4,
        ventilators: 6,
        acceptanceStatus: 'pending',
        rating: 4.6
      },
      {
        id: 'hosp-003',
        name: 'Kokilaben Hospital',
        distance: 8.1,
        eta: '35 mins',
        freeBeds: 5,
        icuBeds: 1,
        ventilators: 2,
        acceptanceStatus: 'pending',
        rating: 4.7
      }
    ];
    
    setSearchResults(mockResults);
    setIsSearching(false);
    setHasSearched(true);
  };

  const sendTransferRequest = (hospitalId: string) => {
    // Update the hospital status to show request sent
    setSearchResults(prev => 
      prev.map(hospital => 
        hospital.id === hospitalId 
          ? { ...hospital, acceptanceStatus: 'pending' as const }
          : hospital
      )
    );
    
    const hospital = searchResults.find(h => h.id === hospitalId);
    toast.success(`Transfer request sent to ${hospital?.name}`);
  };

  const handleClose = () => {
    setSearchResults([]);
    setHasSearched(false);
    setTransferNotes('');
    setSearchParams({ maxDistance: 10, requiredResources: '', urgency: 'high' });
    onClose();
  };

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Patient Transfer Request</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Patient Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">Patient Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="font-medium">{patient.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age / Gender</p>
                  <p className="font-medium">{patient.age} years, {patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="font-medium">{patient.disease}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Required Resources</p>
                <div className="flex flex-wrap gap-2">
                  {patient.requiredResources.map((resource, index) => (
                    <Badge key={index} variant="outline">{resource}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Parameters */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">Search Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="maxDistance">Maximum Distance (km)</Label>
                  <Input
                    id="maxDistance"
                    type="number"
                    value={searchParams.maxDistance}
                    onChange={(e) => setSearchParams(prev => ({ 
                      ...prev, 
                      maxDistance: parseInt(e.target.value) || 0 
                    }))}
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <Label htmlFor="requiredResources">Required Resources</Label>
                  <Select 
                    value={searchParams.requiredResources}
                    onValueChange={(value) => setSearchParams(prev => ({ 
                      ...prev, 
                      requiredResources: value 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select required resources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icu">ICU Bed</SelectItem>
                      <SelectItem value="ventilator">Ventilator</SelectItem>
                      <SelectItem value="general">General Bed</SelectItem>
                      <SelectItem value="cardiac">Cardiac Unit</SelectItem>
                      <SelectItem value="neuro">Neuro Unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select 
                    value={searchParams.urgency}
                    onValueChange={(value) => setSearchParams(prev => ({ 
                      ...prev, 
                      urgency: value 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={searchHospitals} 
                  disabled={isSearching}
                  className="w-full md:w-auto"
                >
                  {isSearching ? 'Searching...' : 'Search Available Hospitals'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {hasSearched && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3">
                  Available Hospitals ({searchResults.length} found)
                </h3>
                
                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No hospitals found matching your criteria</p>
                    <p className="text-sm">Try expanding the search radius or modifying requirements</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((hospital) => (
                      <Card key={hospital.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{hospital.name}</h4>
                                <Badge variant="outline">
                                  ⭐ {hospital.rating}
                                </Badge>
                                <Badge 
                                  className={
                                    hospital.acceptanceStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                                    hospital.acceptanceStatus === 'declined' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }
                                >
                                  {hospital.acceptanceStatus}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.distance} km</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.eta}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BedDouble className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.freeBeds} beds</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Activity className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.icuBeds} ICU</span>
                                </div>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Stethoscope className="h-4 w-4" />
                                  <span>{hospital.ventilators} ventilators available</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Button
                                onClick={() => sendTransferRequest(hospital.id)}
                                disabled={hospital.acceptanceStatus !== 'pending'}
                                size="sm"
                              >
                                {hospital.acceptanceStatus === 'pending' ? 'Request Transfer' : 'Request Sent'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Transfer Notes */}
          {searchResults.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <Label htmlFor="transferNotes">Additional Transfer Notes</Label>
                <Textarea
                  id="transferNotes"
                  placeholder="Add any additional medical notes or special instructions for the receiving hospital..."
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {searchResults.some(h => h.acceptanceStatus === 'pending') && (
              <Button onClick={handleClose}>
                Complete Transfer Process
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}