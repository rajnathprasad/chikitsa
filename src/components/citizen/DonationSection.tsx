import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { 
  Heart,
  Droplets,
  Calendar,
  MapPin,
  Award,
  Clock,
  Plus,
  CheckCircle
} from "lucide-react";

interface CitizenData {
  id: string;
  name: string;
  bloodGroup: string;
  [key: string]: any;
}

interface Donation {
  id: string;
  date: string;
  location: string;
  bloodBank: string;
  units: number;
  status: 'completed' | 'scheduled' | 'cancelled';
  certificate?: string;
}

interface DonationSectionProps {
  citizenData: CitizenData;
}

export function DonationSection({ citizenData }: DonationSectionProps) {
  const [isDonor, setIsDonor] = useState(true);
  
  const [donationHistory] = useState<Donation[]>([
    {
      id: 'don-001',
      date: '2024-01-15',
      location: 'Apollo Hospital',
      bloodBank: 'Apollo Blood Bank',
      units: 450,
      status: 'completed',
      certificate: 'CERT-001'
    },
    {
      id: 'don-002',
      date: '2023-10-20',
      location: 'Red Cross Center',
      bloodBank: 'Red Cross Blood Bank',
      units: 450,
      status: 'completed',
      certificate: 'CERT-002'
    },
    {
      id: 'don-003',
      date: '2024-02-10',
      location: 'Fortis Hospital',
      bloodBank: 'Fortis Blood Bank',
      units: 450,
      status: 'scheduled'
    }
  ]);

  const [achievements] = useState([
    { title: 'First Time Donor', description: 'Completed first blood donation', earned: true },
    { title: 'Regular Donor', description: 'Donated 3 times', earned: true },
    { title: 'Life Saver', description: 'Donated 5 times', earned: false },
    { title: 'Hero Donor', description: 'Donated 10 times', earned: false }
  ]);

  const totalDonations = donationHistory.filter(d => d.status === 'completed').length;
  const totalUnits = donationHistory.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.units, 0);
  const nextEligibleDate = '2024-04-15'; // 3 months after last donation

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blood Donation</h1>
          <p className="text-gray-600">Track your donations and save lives</p>
        </div>
        {isDonor ? (
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Donation
          </Button>
        ) : (
          <Button 
            onClick={() => setIsDonor(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Heart className="h-4 w-4 mr-2" />
            Register as Donor
          </Button>
        )}
      </div>

      {!isDonor ? (
        <Card>
          <CardContent className="text-center py-12">
            <Droplets className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Become a Blood Donor</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Join thousands of heroes who save lives through blood donation. 
              Your donation can help save up to 3 lives.
            </p>
            <Button 
              onClick={() => setIsDonor(true)}
              className="bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Heart className="h-5 w-5 mr-2" />
              Register as Donor
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Donor Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Droplets className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-900">{totalDonations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Units Donated</p>
                    <p className="text-2xl font-bold text-gray-900">{totalUnits}ml</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                    <p className="text-2xl font-bold text-gray-900">{totalDonations * 3}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {achievements.filter(a => a.earned).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donor Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Donor Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-red-500 text-white text-xl">
                    {citizenData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{citizenData.name}</h3>
                    <p className="text-gray-600">Registered Blood Donor</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Blood Group</p>
                      <Badge className="bg-red-100 text-red-800 mt-1">
                        {citizenData.bloodGroup}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Donor Since</p>
                      <p className="text-sm text-gray-600">January 2023</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Next Eligible</p>
                      <p className="text-sm text-gray-600">{nextEligibleDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Status</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">
                        Active Donor
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation History & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Droplets className={`h-5 w-5 ${
                          donation.status === 'completed' ? 'text-red-600' :
                          donation.status === 'scheduled' ? 'text-blue-600' :
                          'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{donation.location}</p>
                        <p className="text-xs text-gray-500">{donation.date} • {donation.units}ml</p>
                      </div>
                      <Badge variant={
                        donation.status === 'completed' ? 'secondary' :
                        donation.status === 'scheduled' ? 'default' : 'outline'
                      }>
                        {donation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex-shrink-0">
                        <Award className={`h-5 w-5 ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}