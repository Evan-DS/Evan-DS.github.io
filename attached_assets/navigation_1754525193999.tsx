import { useState } from "react";
import { personalInfo } from "@/lib/portfolio-data";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300" 
      id="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-primary">
            {personalInfo.name}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-600 hover:text-primary transition-colors nav-link">Home</a>
            <a href="#about" className="text-slate-600 hover:text-primary transition-colors nav-link">About</a>
            <a href="#projects" className="text-slate-600 hover:text-primary transition-colors nav-link">Projects</a>
            <a href="#skills" className="text-slate-600 hover:text-primary transition-colors nav-link">Skills</a>
            <a href="#contact" className="text-slate-600 hover:text-primary transition-colors nav-link">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 hover:text-primary" 
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white border-t border-slate-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-4 space-y-4">
          <a href="#home" className="block text-slate-600 hover:text-primary transition-colors nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#about" className="block text-slate-600 hover:text-primary transition-colors nav-link" onClick={closeMobileMenu}>About</a>
          <a href="#projects" className="block text-slate-600 hover:text-primary transition-colors nav-link" onClick={closeMobileMenu}>Projects</a>
          <a href="#skills" className="block text-slate-600 hover:text-primary transition-colors nav-link" onClick={closeMobileMenu}>Skills</a>
          <a href="#contact" className="block text-slate-600 hover:text-primary transition-colors nav-link" onClick={closeMobileMenu}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
