import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  User, 
  Hospital, 
  Stethoscope, 
  Droplets, 
  ArrowLeft,
  ArrowRight,
  Heart
} from "lucide-react";
import { UserRole } from "../App";

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  onBack: () => void;
}

export function RoleSelection({ onRoleSelect, onBack }: RoleSelectionProps) {
  const roles = [
    {
      id: 'citizen' as UserRole,
      title: 'Citizen',
      description: 'Access your medical records, book appointments, and manage your health journey',
      icon: User,
      color: 'bg-green-500',
      features: [
        'Instant fingerprint registration',
        'Personal medical records access',
        'Doctor appointment booking',
        'Insurance integration'
      ]
    },
    {
      id: 'hospital' as UserRole,
      title: 'Hospital',
      description: 'Manage patients, resources, and coordinate with the healthcare ecosystem',
      icon: Hospital,
      color: 'bg-blue-500',
      features: [
        'Patient management system',
        'Bed & resource tracking',
        'Emergency coordination',
        'Insurance processing'
      ]
    },
    {
      id: 'doctor' as UserRole,
      title: 'Doctor',
      description: 'Manage your practice, appointments, and access patient information securely',
      icon: Stethoscope,
      color: 'bg-purple-500',
      features: [
        'Professional profile management',
        'Appointment scheduling',
        'Patient history access',
        'Telemedicine support'
      ]
    },
    {
      id: 'bloodbank' as UserRole,
      title: 'Blood Bank',
      description: 'Manage blood inventory, coordinate donations, and save lives',
      icon: Droplets,
      color: 'bg-red-500',
      features: [
        'Blood inventory management',
        'Donor notification system',
        'Emergency alerts',
        'Hospital coordination'
      ]
    }
  ];

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
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your role in the Chikitsa ecosystem to get started with 
              personalized features and dashboard tailored to your needs.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card 
                  key={role.id} 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
                  onClick={() => onRoleSelect(role.id)}
                >
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`${role.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{role.title}</CardTitle>
                        <CardDescription className="text-lg mt-1">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-gray-100">
                      <Button 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        variant="outline"
                      >
                        Get Started as {role.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Not sure which role suits you best? Contact our support team for guidance 
                or learn more about each role's capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Contact Support
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}