import { skills, softSkills } from "@/lib/portfolio-data";
import { Code, Server, Database, Wrench } from "lucide-react";

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code className="text-2xl text-blue-600" />;
      case 'backend': return <Server className="text-2xl text-green-600" />;
      case 'database': return <Database className="text-2xl text-purple-600" />;
      case 'tools': return <Wrench className="text-2xl text-orange-600" />;
      default: return <Code className="text-2xl text-blue-600" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'database': return 'Database & Cloud';
      case 'tools': return 'Tools & Other';
      default: return 'Skills';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'bg-blue-100';
      case 'backend': return 'bg-green-100';
      case 'database': return 'bg-purple-100';
      case 'tools': return 'bg-orange-100';
      default: return 'bg-blue-100';
    }
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div 
            key={dot}
            className={`w-2 h-2 rounded-full ${
              dot <= level ? 'bg-primary' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const categories = ['frontend', 'backend', 'database', 'tools'];

  const softSkillColors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-red-100 text-red-700',
    'bg-indigo-100 text-indigo-700',
    'bg-yellow-100 text-yellow-700',
    'bg-pink-100 text-pink-700'
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use to bring ideas to life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            return (
              <div 
                key={category}
                className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300"
              >
                <div className={`w-16 h-16 ${getCategoryColor(category)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">{getCategoryTitle(category)}</h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="flex justify-between items-center">
                      <span className="text-slate-600">{skill.name}</span>
                      {renderSkillLevel(skill.level)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-secondary text-center mb-8">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <span 
                key={skill.name}
                className={`px-6 py-3 rounded-full font-medium ${
                  softSkillColors[index % softSkillColors.length]
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
