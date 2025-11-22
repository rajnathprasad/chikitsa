import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  MapPin,
  Phone,
  Clock,
  Star,
  BedDouble,
  Navigation,
  Search,
  Filter
} from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviews: number;
  availableBeds: number;
  totalBeds: number;
  phone: string;
  emergency: boolean;
  facilities: string[];
  image: string;
}

export function NearbyHospitals() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [hospitals] = useState<Hospital[]>([
    {
      id: 'hosp-001',
      name: 'Apollo Hospital',
      address: '123 Health Street, Mumbai',
      distance: 2.5,
      rating: 4.5,
      reviews: 250,
      availableBeds: 45,
      totalBeds: 250,
      phone: '+91 22 1234 5678',
      emergency: true,
      facilities: ['ICU', 'Emergency', 'Surgery', 'Cardiology'],
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400'
    },
    {
      id: 'hosp-002',
      name: 'Fortis Hospital',
      address: '456 Medical Lane, Mumbai',
      distance: 3.2,
      rating: 4.3,
      reviews: 180,
      availableBeds: 22,
      totalBeds: 180,
      phone: '+91 22 2345 6789',
      emergency: true,
      facilities: ['ICU', 'Pediatrics', 'Maternity', 'Orthopedics'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nearby Hospitals</h1>
          <p className="text-gray-600">Find hospitals and medical facilities near you</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hospitals by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Map View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-400">Google Maps API integration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                      <p className="text-gray-600">{hospital.address}</p>
                    </div>
                    <div className="flex space-x-2">
                      {hospital.emergency && (
                        <Badge className="bg-red-100 text-red-800">24/7 Emergency</Badge>
                      )}
                      <Badge variant="secondary">
                        {hospital.distance} km away
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{hospital.rating} ({hospital.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BedDouble className="h-4 w-4 text-blue-600" />
                      <span>{hospital.availableBeds}/{hospital.totalBeds} beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{hospital.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-green-600" />
                      <Button variant="link" className="p-0 h-auto">Get Directions</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {hospital.facilities.slice(0, 3).map((facility) => (
                        <Badge key={facility} variant="outline">{facility}</Badge>
                      ))}
                      {hospital.facilities.length > 3 && (
                        <Badge variant="outline">+{hospital.facilities.length - 3} more</Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}