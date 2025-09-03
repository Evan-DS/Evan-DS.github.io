import { useEffect } from "react";
import Navigation from "../components/navigation";
import HeroSection from "../components/hero-section";
import AboutSection from "../components/about-section";
import ProjectsSection from "../components/projects-section";
import SkillsSection from "../components/skills-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.classList.contains('nav-link')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId || '');
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('bg-white/95', 'backdrop-blur-md');
        navbar?.classList.remove('bg-white/90');
      } else {
        navbar?.classList.add('bg-white/90');
        navbar?.classList.remove('bg-white/95', 'backdrop-blur-md');
      }

      // Active navigation highlighting
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
          current = section.getAttribute('id') || '';
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('text-primary');
        link.classList.add('text-slate-600');
        
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.remove('text-slate-600');
          link.classList.add('text-primary');
        }
      });
    };

    document.addEventListener('click', handleNavClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleNavClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen font-inter">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
