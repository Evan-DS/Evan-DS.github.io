import { personalInfo } from "@/lib/portfolio-data";
import { FaLinkedinIn, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{personalInfo.name}</h3>
            <p className="text-slate-300">{personalInfo.title}</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
            <a 
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
          
          <div className="border-t border-slate-600 pt-8">
            <p className="text-slate-400">
              © 2024 {personalInfo.name}. All rights reserved. Built with passion and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
