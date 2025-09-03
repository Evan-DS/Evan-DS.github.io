import { PersonalInfo, Project, Skill, SoftSkill } from "@shared/schema";

export const personalInfo: PersonalInfo = {
  name: "Evan Dos Santos",
  title: "Software Engineer & IT Systems Specialist",
  tagline: "Computer Science graduate with Software Engineering specialization, passionate about building robust systems and providing exceptional technical solutions. Experienced in full-stack development, system administration, and client support.",
  bio: [
    "Hello! I'm Evan, a Computer Science Honours graduate from the University of Windsor with a Software Engineering specialization. I have hands-on experience in IT services, system administration, and software development, with over 2 years of professional experience in technical support and system management.",
    "My technical journey includes developing robust server systems using C++, managing domain services with Active Directory, and providing comprehensive IT support to clients. I'm proficient in multiple programming languages including C++, C, Java, and have experience with OpenGL graphics programming.",
    "I'm passionate about solving complex technical problems, optimizing system performance, and delivering exceptional customer service. Whether it's deploying enterprise systems, managing network infrastructure, or developing software solutions, I bring a detail-oriented approach and strong problem-solving skills to every project."
  ],
  email: "evangeorgedossantos@yahoo.ca",
  phone: "(519) 702-8291",
  location: "London, Ontario, Canada",
  experience: "2+ Years Experience",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
  resumeUrl: "/api/resume",
  social: {
    linkedin: "https://bit.ly/3wqU0p0",
    github: "https://github.com/evandossantos",
    twitter: "https://twitter.com/evandossantos",
    instagram: "https://instagram.com/evandossantos"
  }
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Enterprise System Monitor",
    description: "Real-time infrastructure monitoring solution built for enterprise environments with comprehensive system metrics, network topology monitoring, and intelligent alerting. Deployed across 500+ servers.",
    technologies: ["C++", "SQL Server", "SNMP", "Windows Services"],
    liveUrl: "/demo/system-monitor",
    githubUrl: "https://github.com/evandossantos/enterprise-system-monitor",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "2",
    title: "Database Administration Suite",
    description: "Enterprise-grade SQL Server management platform with advanced connection pooling, performance monitoring, and automated backup systems. Achieved 99.9% uptime with 60% performance improvement.",
    technologies: ["C++", "SQL Server", "T-SQL", "PowerShell"],
    liveUrl: "/demo/database-admin",
    githubUrl: "https://github.com/evandossantos/database-admin-suite",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "3",
    title: "3D Graphics Renderer",
    description: "Academic project implementing advanced 3D graphics rendering using OpenGL with vector mathematics, lighting systems, and real-time rendering capabilities for complex geometric objects. Features interactive 3D transformations and shader programming.",
    technologies: ["C++", "OpenGL", "Vector Math", "Computer Graphics"],
    liveUrl: "/demo/graphics",
    githubUrl: "https://github.com/evandossantos/opengl-renderer",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "4",
    title: "Network Infrastructure Manager",
    description: "Designed and implemented LAN/WAN network management solution including virtual machine networks, ensuring secure connectivity and optimized performance across enterprise environments.",
    technologies: ["Network Administration", "Virtual Machines", "Security Protocols", "System Administration"],
    githubUrl: "https://github.com/evandossantos/network-manager",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "5",
    title: "Algorithm Optimization Suite",
    description: "University project implementing and optimizing various sorting algorithms and data structures in C++ and Java, with performance analysis and complexity comparisons. Features interactive visualization of algorithm execution.",
    technologies: ["C++", "Java", "Algorithms", "Data Structures"],
    liveUrl: "/demo/algorithms",
    githubUrl: "https://github.com/evandossantos/algorithm-suite",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "6",
    title: "Active Directory Management Console",
    description: "Enterprise domain services administration platform for comprehensive user management, security policy enforcement, and organizational structure maintenance across distributed Windows environments. Manages 10,000+ users.",
    technologies: ["C++", "Active Directory", "LDAP", "PowerShell"],
    liveUrl: "/demo/active-directory",
    githubUrl: "https://github.com/evandossantos/active-directory-console",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: "7",
    title: "IT Service Portfolio Website",
    description: "Modern, responsive portfolio website showcasing IT services and technical expertise, built with React and TypeScript, featuring contact forms and service management.",
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    liveUrl: "https://evandossantos-portfolio.replit.app",
    githubUrl: "https://github.com/evandossantos/portfolio-website",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 4, category: "frontend" },
  { name: "TypeScript", level: 4, category: "frontend" },
  { name: "OpenGL", level: 3, category: "frontend" },
  { name: "HTML/CSS", level: 4, category: "frontend" },
  
  // Backend
  { name: "C++", level: 5, category: "backend" },
  { name: "C", level: 5, category: "backend" },
  { name: "Java", level: 4, category: "backend" },
  { name: "Node.js", level: 3, category: "backend" },
  
  // Database
  { name: "SQL Server", level: 4, category: "database" },
  { name: "Active Directory", level: 5, category: "database" },
  { name: "Azure AD", level: 4, category: "database" },
  { name: "Network Administration", level: 4, category: "database" },
  
  // Tools
  { name: "Visual Studio", level: 5, category: "tools" },
  { name: "Eclipse IDE", level: 4, category: "tools" },
  { name: "Microsoft Office", level: 5, category: "tools" },
  { name: "System Administration", level: 5, category: "tools" }
];

export const softSkills: SoftSkill[] = [
  { name: "Technical Support" },
  { name: "Client Relations" },
  { name: "Problem Solving" },
  { name: "System Analysis" },
  { name: "Project Management" },
  { name: "Documentation" },
  { name: "Training & Support" },
  { name: "Critical Thinking" }
];
