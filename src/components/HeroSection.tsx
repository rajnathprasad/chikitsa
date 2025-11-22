import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Shield, Zap, Users, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { YoutubeModal } from "./YoutubeModal";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700">
                <Shield className="h-4 w-4 mr-2" />
                Secure & ABHA Integrated
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                Unified Healthcare
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                  Ecosystem
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Seamlessly connecting citizens, hospitals, doctors, and blood banks through 
                fingerprint authentication, real-time coordination, and intelligent resource management.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Unified Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700">Secure & Private</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3"
                onClick={onGetStarted}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 border-gray-300"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                ABHA Integrated
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Ayushman Bharat Compatible
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                HIPAA Compliant
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzkyNzIzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern Healthcare Technology"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 p-4 rounded-xl shadow-lg bg-white border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Secure Login</p>
                  <p className="text-sm text-gray-500">Fingerprint Auth</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 p-4 rounded-xl shadow-lg bg-white border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500K+ Users</p>
                  <p className="text-sm text-gray-500">Trusted Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      <YoutubeModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="yFztV-7ZLMQ"
        title="Chikitsa Platform Demo"
      />
    </section>
  );
}