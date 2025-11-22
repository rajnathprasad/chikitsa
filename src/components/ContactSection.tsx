import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HeadphonesIcon,
  Send,
  Building
} from "lucide-react";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Emergency Helpline",
      details: ["1800-CHIK-911", "Available 24/7"],
      color: "bg-red-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@chikitsa.in", "Response within 2 hours"],
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["AIIMS Campus, New Delhi", "India - 110029"],
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Weekend: Emergency support"],
      color: "bg-purple-500"
    }
  ];

  const departments = [
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "Platform issues, integration help, API support",
      email: "tech@chikitsa.in"
    },
    {
      icon: Building,
      title: "Hospital Partnerships",
      description: "Hospital onboarding, partnership inquiries",
      email: "partners@chikitsa.in"
    },
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "General questions, feedback, suggestions",
      email: "info@chikitsa.in"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about Chikitsa? Need support or want to partner with us? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h3>
            
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${info.color} p-3 rounded-xl flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Department Contacts */}
            <div className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Department Contacts</h4>
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const IconComponent = dept.icon;
                  return (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{dept.title}</h5>
                          <p className="text-sm text-gray-600 mb-1">{dept.description}</p>
                          <a 
                            href={`mailto:${dept.email}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Organization</label>
                    <Input placeholder="Hospital/Clinic/Organization name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input placeholder="What is this regarding?" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry or how we can help you..."
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      Terms of Service
                    </a>
                  </label>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-12 bg-white border-green-200 hover:bg-green-50"
              >
                <Phone className="mr-2 h-5 w-5 text-green-600" />
                Schedule a Demo
              </Button>
              <Button 
                variant="outline" 
                className="h-12 bg-white border-blue-200 hover:bg-blue-50"
              >
                <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}