import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Target, 
  Eye, 
  Users, 
  TrendingUp, 
  Award, 
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const stats = [
    { value: "2M+", label: "Active Users", icon: Users },
    { value: "15K+", label: "Partner Hospitals", icon: TrendingUp },
    { value: "250K+", label: "Registered Doctors", icon: Award },
    { value: "28", label: "States Covered", icon: Globe }
  ];

  const achievements = [
    "Reduced average hospital admission time by 75%",
    "Enabled 100K+ emergency medical interventions",
    "Streamlined insurance processing for 1.5M+ patients",
    "Saved 500K+ hours of administrative work annually",
    "Connected 5K+ blood banks across India",
    "Facilitated 50K+ successful blood donations"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Transforming Healthcare Delivery
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Chikitsa is India's most comprehensive healthcare ecosystem, connecting every stakeholder 
            in the healthcare journey through cutting-edge technology and seamless integration.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-500 p-3 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To democratize healthcare access across India by creating a unified digital ecosystem 
                that eliminates barriers, reduces wait times, and ensures every citizen receives 
                timely, quality medical care regardless of their location or economic status.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Making healthcare accessible for all</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To become the backbone of India's healthcare infrastructure, enabling a future where 
                medical emergencies are handled swiftly, resources are optimally distributed, and 
                every healthcare interaction is seamless, secure, and patient-centered.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Building tomorrow's healthcare today</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-xl w-fit mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Story & Achievements */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Our Impact Story
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since our launch, Chikitsa has revolutionized healthcare delivery across India. 
              From reducing emergency response times to streamlining complex insurance processes, 
              we've made healthcare more accessible, efficient, and patient-friendly.
            </p>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Join Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya2luZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3OTI3NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Healthcare technology team working together"
              className="rounded-2xl shadow-2xl"
            />
            
            {/* Floating achievement cards */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}