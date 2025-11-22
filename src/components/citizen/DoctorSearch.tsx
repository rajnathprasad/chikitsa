import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Building,
  DollarSign,
  SortAsc,
  User,
  Stethoscope
} from "lucide-react";


interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  hospital: string;
  location: string;
  distance: number;
  rating: number;
  reviews: number;
  consultationFee: number;
  availability: 'available' | 'busy' | 'offline';
  profilePhoto: string;
  qualifications: string[];
  nextAvailable: string;
  languages: string[];
}

export function DoctorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [feeRange, setFeeRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Mock doctors data
  const [doctors] = useState<Doctor[]>([
    {
      id: 'doc-001',
      name: 'Dr. Rajesh Sharma',
      specialization: 'Cardiology',
      experience: 15,
      hospital: 'Apollo Hospital',
      location: 'Mumbai',
      distance: 2.5,
      rating: 4.8,
      reviews: 125,
      consultationFee: 800,
      availability: 'available',
      profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
      nextAvailable: '2024-01-22 10:00 AM',
      languages: ['English', 'Hindi', 'Marathi']
    },
    {
      id: 'doc-002',
      name: 'Dr. Priya Patel',
      specialization: 'Pediatrics',
      experience: 12,
      hospital: 'Fortis Hospital',
      location: 'Mumbai',
      distance: 3.2,
      rating: 4.7,
      reviews: 98,
      consultationFee: 600,
      availability: 'available',
      profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      qualifications: ['MBBS', 'MD Pediatrics'],
      nextAvailable: '2024-01-22 2:00 PM',
      languages: ['English', 'Hindi', 'Gujarati']
    },
    {
      id: 'doc-003',
      name: 'Dr. Ahmed Khan',
      specialization: 'Orthopedics',
      experience: 20,
      hospital: 'Lilavati Hospital',
      location: 'Mumbai',
      distance: 4.1,
      rating: 4.9,
      reviews: 156,
      consultationFee: 1200,
      availability: 'busy',
      profilePhoto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
      qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship in Joint Replacement'],
      nextAvailable: '2024-01-23 11:00 AM',
      languages: ['English', 'Hindi', 'Urdu']
    },
    {
      id: 'doc-004',
      name: 'Dr. Sunita Reddy',
      specialization: 'Dermatology',
      experience: 8,
      hospital: 'Max Hospital',
      location: 'Mumbai',
      distance: 1.8,
      rating: 4.6,
      reviews: 87,
      consultationFee: 700,
      availability: 'available',
      profilePhoto: 'https://images.unsplash.com/photo-1594824804732-5f70a178c48d?w=400',
      qualifications: ['MBBS', 'MD Dermatology'],
      nextAvailable: '2024-01-22 4:00 PM',
      languages: ['English', 'Hindi', 'Telugu']
    }
  ]);

  const specializations = [
    'Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Neurology',
    'Gynecology', 'Psychiatry', 'Ophthalmology', 'ENT', 'General Medicine'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;
    const matchesAvailability = selectedAvailability === 'all' || doctor.availability === selectedAvailability;
    const matchesFee = doctor.consultationFee >= feeRange[0] && doctor.consultationFee <= feeRange[1];
    
    return matchesSearch && matchesSpecialization && matchesAvailability && matchesFee;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      case 'fee':
        return a.consultationFee - b.consultationFee;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by doctor name, specialization, or hospital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Specialization</label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue placeholder="All availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All availability</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="fee">Consultation Fee</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Fee Range: ₹{feeRange[0]} - ₹{feeRange[1]}
                  </label>
                  <Slider
                    value={feeRange}
                    onValueChange={setFeeRange}
                    max={2000}
                    step={100}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredDoctors.length} Doctors Found
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <SortAsc className="h-4 w-4" />
          <span>Sorted by {sortBy}</span>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.profilePhoto} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                      <Badge className={getAvailabilityColor(doctor.availability)}>
                        {doctor.availability}
                      </Badge>
                    </div>
                    <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{doctor.distance} km away</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">₹{doctor.consultationFee}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Next: {doctor.nextAvailable}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(doctor.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" disabled={doctor.availability === 'offline'}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}