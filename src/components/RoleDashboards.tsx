import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  User, 
  Hospital, 
  Stethoscope, 
  Droplets, 
  Clock, 
  MapPin, 
  Calendar,
  FileText,
  Bell,
  Activity,
  Shield
} from "lucide-react";

export function RoleDashboards() {
  const roles = [
    {
      id: "citizen",
      title: "Citizens",
      icon: User,
      color: "bg-green-500",
      features: [
        "Fingerprint-based instant registration",
        "Access personal medical records",
        "Book appointments with doctors",
        "Find nearest hospitals with available beds",
        "Receive blood donation alerts",
        "Insurance & government scheme integration"
      ],
      stats: { users: "2M+", satisfaction: "98%" }
    },
    {
      id: "hospital",
      title: "Hospitals",
      icon: Hospital,
      color: "bg-blue-500",
      features: [
        "Instant patient admission via fingerprint",
        "Manage beds, wards, and ICU capacity",
        "Emergency patient transfer system",
        "Auto-apply insurance schemes in billing",
        "Real-time resource management",
        "Shared patient records access"
      ],
      stats: { hospitals: "15K+", efficiency: "40%" }
    },
    {
      id: "doctor",
      title: "Doctors",
      icon: Stethoscope,
      color: "bg-purple-500",
      features: [
        "Maintain professional profile & ratings",
        "Manage appointment schedules",
        "Access patient history with consent",
        "Add consultation notes to records",
        "Telemedicine capabilities",
        "Prescription management"
      ],
      stats: { doctors: "250K+", reviews: "4.9/5" }
    },
    {
      id: "bloodbank",
      title: "Blood Banks",
      icon: Droplets,
      color: "bg-red-500",
      features: [
        "Manage blood inventory by type",
        "Notify nearby donors during emergencies",
        "Real-time stock sharing with hospitals",
        "Reduce blood shortage & wastage",
        "Donation drive management",
        "Quality tracking & compliance"
      ],
      stats: { banks: "5K+", lives: "100K+" }
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Tailored Solutions for Every Healthcare Role
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Comprehensive dashboards and features designed for each stakeholder in the healthcare ecosystem
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card key={role.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${role.color} p-3 rounded-xl`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{role.title}</CardTitle>
                        <CardDescription>Specialized dashboard & tools</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      Dashboard
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-6">
                      {Object.entries(role.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-bold text-lg text-gray-900">{value}</p>
                          <p className="text-sm capitalize text-gray-500">{key}</p>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Preview */}
        <div className="mt-16 rounded-2xl p-8 shadow-lg bg-white border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">
              Seamless Integration & Real-time Coordination
            </h3>
            <p className="text-gray-600">
              All roles work together in perfect harmony through our unified platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="p-4 rounded-xl inline-block bg-gradient-to-r from-green-100 to-blue-100">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
              <p className="text-sm text-gray-600">
                Instant notifications and live data synchronization across all platforms
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 rounded-xl inline-block bg-gradient-to-r from-blue-100 to-purple-100">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Location Intelligence</h4>
              <p className="text-sm text-gray-600">
                Smart routing and resource allocation based on geographical proximity
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 rounded-xl inline-block bg-gradient-to-r from-purple-100 to-red-100">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Security First</h4>
              <p className="text-sm text-gray-600">
                Advanced encryption and biometric authentication for maximum security
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}