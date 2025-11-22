import { Button } from "./ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export function Header({ onGetStarted, onSignIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Chikitsa
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-green-600 transition-colors">
              Features
            </a>
            <a href="#solutions" className="text-muted-foreground hover:text-green-600 transition-colors">
              Solutions
            </a>
            <a href="#about" className="text-muted-foreground hover:text-green-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-green-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-green-600"
              onClick={onSignIn}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#solutions" className="text-muted-foreground hover:text-green-600 transition-colors">
                Solutions
              </a>
              <a href="#about" className="text-muted-foreground hover:text-green-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-green-600 transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={onSignIn}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500"
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}