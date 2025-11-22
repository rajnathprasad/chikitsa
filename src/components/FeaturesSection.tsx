import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Fingerprint, 
  Database, 
  MapPin, 
  Clock, 
  Shield, 
  Smartphone,
  Activity,
  Bell,
  Users,
  FileText,
  Zap,
  Heart
} from "lucide-react";

export function FeaturesSection() {
  const coreFeatures = [
    {
      icon: Fingerprint,
      title: "Biometric Authentication",
      description: "Secure fingerprint-based login integrated with ABHA and Aadhaar for instant patient identification and access.",
      color: "bg-green-500"
    },
    {
      icon: Database,
      title: "Unified Medical Records",
      description: "Centralized patient records accessible across all hospitals with proper consent and security protocols.",
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "Smart Hospital Finder",
      description: "Real-time bed availability and resource tracking with GPS-based nearest hospital recommendations.",
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Instant Registration",
      description: "Eliminate long queues with fingerprint-based instant admission and automated insurance processing.",
      color: "bg-orange-500"
    },
    {
      icon: Bell,
      title: "Emergency Alerts",
      description: "Critical blood shortage notifications and emergency patient transfer coordination in real-time.",
      color: "bg-red-500"
    },
    {
      icon: Activity,
      title: "Resource Management",
      description: "Live tracking of beds, ICU capacity, medical equipment, and blood bank inventory across the network.",
      color: "bg-indigo-500"
    }
  ];

  const technicalFeatures = [
    {
      icon: Shield,
      title: "HIPAA Compliant Security",
      description: "Enterprise-grade encryption and privacy protection"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Access",
      description: "Mobile-first design with offline capabilities"
    },
    {
      icon: Users,
      title: "Multi-Role Dashboards",
      description: "Customized interfaces for each user type"
    },
    {
      icon: FileText,
      title: "Government Integration",
      description: "Seamless Ayushman Bharat and insurance processing"
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Instant data updates across all connected systems"
    },
    {
      icon: Heart,
      title: "Life-Saving Coordination",
      description: "Emergency response and critical care optimization"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Revolutionary Healthcare Features
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Advanced technology solutions designed to transform healthcare delivery and accessibility across India
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className={`${feature.color} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Features */}
        <div className="rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
              Built for Scale & Security
            </h3>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              Enterprise-grade infrastructure ensuring reliability, security, and seamless integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <div className="p-3 rounded-lg flex-shrink-0 bg-gradient-to-r from-green-100 to-blue-100">
                    <IconComponent className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Showcase */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">
            Seamless Integration Ecosystem
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
              <span className="font-medium text-gray-700">ABHA</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
              <span className="font-medium text-gray-700">Ayushman Bharat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
              <span className="font-medium text-gray-700">UIDAI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
              <span className="font-medium text-gray-700">Google Maps</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg"></div>
              <span className="font-medium text-gray-700">Insurance APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}