// Portfolio Data Configuration
const portfolioData = {
  personalInfo: {
    name: "Evan Dos Santos",
    title: "Software Engineer",
    tagline: "Passionate software engineer with expertise in full-stack development, creating innovative solutions with modern technologies and best practices.",
    email: "evandossantos@email.com",
    social: {
      linkedin: "https://linkedin.com/in/evandossantos",
      github: "https://github.com/evandossantos",
      twitter: "https://twitter.com/evandossantos"
    }
  },

  projects: [
    {
      id: "graphics-renderer",
      title: "3D Graphics Renderer",
      description: "Advanced 3D graphics rendering using OpenGL concepts with vector mathematics and real-time rendering.",
      technologies: ["JavaScript", "Canvas API", "3D Mathematics"],
      image: "fas fa-cube",
      demoType: "graphics",
      githubUrl: "https://github.com/evandossantos/graphics-renderer",
      featured: true
    },
    {
      id: "algorithm-visualizer",
      title: "Algorithm Visualizer",
      description: "Interactive visualization of sorting and pathfinding algorithms with real-time performance metrics.",
      technologies: ["React", "D3.js", "Algorithms"],
      image: "fas fa-chart-line",
      demoType: "algorithm",
      githubUrl: "https://github.com/evandossantos/algorithm-visualizer",
      featured: true
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      image: "fas fa-shopping-cart",
      demoType: "ecommerce",
      githubUrl: "https://github.com/evandossantos/ecommerce-platform",
      featured: true
    }
  ],

  skills: {
    frontend: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "CSS/Sass", level: 88 }
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "Express.js", level: 87 },
      { name: "REST APIs", level: 90 }
    ],
    database: [
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "Git", level: 92 },
      { name: "Docker", level: 75 }
    ]
  },

  about: {
    highlights: [
      {
        icon: "fas fa-code",
        title: "Clean Code",
        description: "Writing maintainable, well-documented code"
      },
      {
        icon: "fas fa-lightbulb",
        title: "Problem Solving",
        description: "Innovative solutions to complex challenges"
      },
      {
        icon: "fas fa-users",
        title: "Collaboration",
        description: "Effective teamwork and communication"
      }
    ]
  }
};

// EmailJS Configuration
const emailJSConfig = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your actual EmailJS public key
  serviceId: "YOUR_SERVICE_ID", // Replace with your actual service ID
  templateId: "YOUR_TEMPLATE_ID" // Replace with your actual template ID
};

// Export for use in other scripts
window.portfolioData = portfolioData;
window.emailJSConfig = emailJSConfig;
