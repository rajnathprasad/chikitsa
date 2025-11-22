import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { RoleDashboards } from "./components/RoleDashboards";
import { FeaturesSection } from "./components/FeaturesSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { RoleSelection } from "./components/RoleSelection";
import { CitizenSignup } from "./components/signup/CitizenSignup";
import { DoctorSignup } from "./components/signup/DoctorSignup";
import { HospitalSignup } from "./components/signup/HospitalSignup";
import { BloodBankSignup } from "./components/signup/BloodBankSignup";
import { SignIn } from "./components/SignIn";
import { HospitalDashboard } from "./components/HospitalDashboard";
import { CitizenDashboard } from "./components/CitizenDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { BloodBankDashboard } from "./components/BloodBankDashboard";

export type UserRole = 'citizen' | 'doctor' | 'hospital' | 'bloodbank';
export type AppView = 'home' | 'signin' | 'role-selection' | 'citizen-signup' | 'doctor-signup' | 'hospital-signup' | 'bloodbank-signup' | 'citizen-dashboard' | 'doctor-dashboard' | 'hospital-dashboard' | 'bloodbank-dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  const navigateToRoleSelection = () => {
    setCurrentView('role-selection');
  };

  const navigateToSignup = (role: UserRole) => {
    setCurrentView(`${role}-signup` as AppView);
  };

  const navigateToSignIn = () => {
    setCurrentView('signin');
  };

  const navigateHome = () => {
    setCurrentView('home');
  };

  const navigateToHospitalDashboard = () => {
    setCurrentView('hospital-dashboard');
  };

  const navigateToCitizenDashboard = () => {
    setCurrentView('citizen-dashboard');
  };

  const navigateToDoctorDashboard = () => {
    setCurrentView('doctor-dashboard');
  };

  const navigateToBloodBankDashboard = () => {
    setCurrentView('bloodbank-dashboard');
  };

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onGetStarted={navigateToRoleSelection} 
          onSignIn={navigateToSignIn}
        />
        <main>
          <HeroSection 
            onGetStarted={navigateToRoleSelection} 
          />
          <FeaturesSection />
          <RoleDashboards />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentView === 'signin') {
    return <SignIn 
      onBack={navigateHome} 
      onSignUpRedirect={navigateToRoleSelection} 
      onCitizenSignIn={navigateToCitizenDashboard}
      onDoctorSignIn={navigateToDoctorDashboard}
      onHospitalSignIn={navigateToHospitalDashboard}
      onBloodBankSignIn={navigateToBloodBankDashboard}
    />;
  }

  if (currentView === 'role-selection') {
    return (
      <RoleSelection 
        onRoleSelect={navigateToSignup} 
        onBack={navigateHome}
      />
    );
  }

  if (currentView === 'citizen-signup') {
    return <CitizenSignup 
      onBack={() => setCurrentView('role-selection')} 
    />;
  }

  if (currentView === 'doctor-signup') {
    return <DoctorSignup 
      onBack={() => setCurrentView('role-selection')} 
    />;
  }

  if (currentView === 'hospital-signup') {
    return <HospitalSignup 
      onBack={() => setCurrentView('role-selection')} 
    />;
  }

  if (currentView === 'bloodbank-signup') {
    return <BloodBankSignup 
      onBack={() => setCurrentView('role-selection')} 
    />;
  }

  if (currentView === 'citizen-dashboard') {
    return <CitizenDashboard 
      onSignOut={navigateHome} 
    />;
  }

  if (currentView === 'doctor-dashboard') {
    return <DoctorDashboard 
      onSignOut={navigateHome} 
      onSwitchToCitizen={navigateToCitizenDashboard} 
    />;
  }

  if (currentView === 'hospital-dashboard') {
    return <HospitalDashboard 
      onSignOut={navigateHome} 
    />;
  }

  if (currentView === 'bloodbank-dashboard') {
    return <BloodBankDashboard 
      onSignOut={navigateHome} 
    />;
  }

  return null;
}