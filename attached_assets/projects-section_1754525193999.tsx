import { projects } from "@/lib/portfolio-data";
import { ExternalLink, Github, Book, Smartphone, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const getProjectIcon = (title: string) => {
    if (title.includes("API")) return <Book className="w-5 h-5" />;
    if (title.includes("Mobile")) return <Smartphone className="w-5 h-5" />;
    return <ExternalLink className="w-5 h-5" />;
  };

  const getProjectLinkText = (title: string) => {
    if (title.includes("API")) return "API Docs";
    if (title.includes("Mobile")) return "App Store";
    return "Live Demo";
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <img 
                src={project.imageUrl}
                alt={`${project.title} project screenshot`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tech === 'React' || tech === 'Vue.js' ? 'bg-blue-100 text-blue-700' :
                        tech === 'Node.js' || tech === 'Express' || tech === 'Express.js' ? 'bg-green-100 text-green-700' :
                        tech === 'MongoDB' ? 'bg-green-100 text-green-800' :
                        tech === 'Firebase' || tech === 'WebSocket' ? 'bg-orange-100 text-orange-700' :
                        tech === 'PostgreSQL' || tech === 'D3.js' ? 'bg-cyan-100 text-cyan-700' :
                        tech === 'Python' || tech === 'FastAPI' ? 'bg-yellow-100 text-yellow-700' :
                        tech === 'TypeScript' ? 'bg-blue-100 text-blue-700' :
                        tech === 'Docker' || tech === 'Redis' ? 'bg-red-100 text-red-700' :
                        tech === 'Stripe' || tech === 'Tailwind' ? 'bg-purple-100 text-purple-700' :
                        tech === 'OpenAI' ? 'bg-green-100 text-green-700' :
                        tech === 'Expo' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary hover:text-blue-700 transition-colors"
                    >
                      {getProjectIcon(project.title)}
                      <span>{getProjectLinkText(project.title)}</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/alexjohnson"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
