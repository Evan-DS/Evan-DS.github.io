import { personalInfo } from "@/lib/portfolio-data";
import { MapPin, Mail, Calendar, Download } from "lucide-react";

export default function AboutSection() {
  const handleDownloadResume = () => {
    window.open(personalInfo.resumeUrl, '_blank');
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <img 
              src={personalInfo.profileImage}
              alt={`${personalInfo.name} - Professional headshot`}
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="animate-slide-up space-y-6">
            <div className="prose prose-lg text-slate-600">
              {personalInfo.bio.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-5 h-5 text-primary" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{personalInfo.experience}</span>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={handleDownloadResume}
                className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
