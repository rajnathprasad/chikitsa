import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Droplets,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Clock
} from "lucide-react";

interface BloodBank {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  hours: string;
  bloodStock: {
    [key: string]: {
      available: number;
      total: number;
      status: 'good' | 'low' | 'critical';
    };
  };
}

export function BloodBanks() {
  const [bloodBanks] = useState<BloodBank[]>([
    {
      id: 'bb-001',
      name: 'Apollo Blood Bank',
      address: '123 Health Street, Mumbai',
      distance: 2.5,
      phone: '+91 22 1234 5678',
      hours: '24/7',
      bloodStock: {
        'A+': { available: 25, total: 50, status: 'good' },
        'A-': { available: 8, total: 20, status: 'low' },
        'B+': { available: 30, total: 45, status: 'good' },
        'B-': { available: 3, total: 15, status: 'critical' },
        'AB+': { available: 12, total: 25, status: 'good' },
        'AB-': { available: 2, total: 10, status: 'critical' },
        'O+': { available: 40, total: 60, status: 'good' },
        'O-': { available: 5, total: 20, status: 'low' }
      }
    },
    {
      id: 'bb-002',
      name: 'Red Cross Blood Bank',
      address: '456 Medical Lane, Mumbai',
      distance: 3.8,
      phone: '+91 22 2345 6789',
      hours: '6:00 AM - 10:00 PM',
      bloodStock: {
        'A+': { available: 15, total: 40, status: 'low' },
        'A-': { available: 12, total: 25, status: 'good' },
        'B+': { available: 20, total: 35, status: 'good' },
        'B-': { available: 6, total: 15, status: 'low' },
        'AB+': { available: 8, total: 20, status: 'low' },
        'AB-': { available: 4, total: 12, status: 'low' },
        'O+': { available: 35, total: 50, status: 'good' },
        'O-': { available: 8, total: 18, status: 'low' }
      }
    }
  ]);

  const getStockColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'low':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStockBadgeColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blood Banks</h1>
          <p className="text-gray-600">Find blood banks and check availability</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Droplets className="h-4 w-4 mr-2" />
          Emergency Request
        </Button>
      </div>

      {/* Critical Shortage Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Critical Blood Shortage Alert</p>
              <p className="text-red-700 text-sm">B-, AB-, and O- blood types are in critical shortage. Consider donating if eligible.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blood Banks List */}
      <div className="space-y-6">
        {bloodBanks.map((bloodBank) => (
          <Card key={bloodBank.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{bloodBank.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{bloodBank.address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Navigation className="h-4 w-4" />
                      <span>{bloodBank.distance} km away</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Hours: {bloodBank.hours}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{bloodBank.phone}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Blood Stock Availability</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(bloodBank.bloodStock).map(([bloodType, stock]) => (
                      <div key={bloodType} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{bloodType}</span>
                          <Badge className={getStockBadgeColor(stock.status)}>
                            {stock.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress 
                            value={(stock.available / stock.total) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between text-sm">
                            <span className={getStockColor(stock.status)}>
                              {stock.available} units
                            </span>
                            <span className="text-gray-500">
                              /{stock.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Available for walk-in donations</span>
                  </div>
                  <Button variant="outline">
                    <Droplets className="h-4 w-4 mr-2" />
                    Donate Blood
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}