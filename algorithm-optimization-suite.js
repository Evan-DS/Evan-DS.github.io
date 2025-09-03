// Algorithm Optimization Suite Project Details

export default {
    title: "Algorithm Optimization Suite",
    subtitle: "Interactive algorithm visualization and performance analysis tool with real-time complexity comparisons and educational demonstrations for computer science concepts.",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=400&fit=crop",
    description: "A comprehensive educational platform for algorithm visualization and performance analysis. This suite provides interactive demonstrations of classic algorithms, real-time complexity analysis, and optimization techniques to help students and professionals understand algorithmic concepts through visual learning.",
    demoUrl: "https://algorithms.alexjohnson.dev",
    githubUrl: "https://github.com/alexjohnson/algorithm-optimization-suite",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "Java", icon: "fab fa-java" },
        { name: "React", icon: "fab fa-react" },
        { name: "D3.js", icon: "fas fa-chart-bar" },
        { name: "TypeScript", icon: "fab fa-js-square" },
        { name: "Web Workers", icon: "fas fa-cogs" },
        { name: "Canvas API", icon: "fas fa-paint-brush" },
        { name: "WebAssembly", icon: "fas fa-microchip" }
    ],
    
    features: [
        {
            icon: "fas fa-eye",
            title: "Algorithm Visualization",
            description: "Interactive step-by-step visualization of sorting, searching, graph, and dynamic programming algorithms."
        },
        {
            icon: "fas fa-stopwatch",
            title: "Performance Analysis",
            description: "Real-time performance measurement with time and space complexity analysis across different input sizes."
        },
        {
            icon: "fas fa-chart-line",
            title: "Complexity Comparison",
            description: "Side-by-side comparison of algorithm performance with graphical representation of Big O complexity."
        },
        {
            icon: "fas fa-sliders-h",
            title: "Interactive Controls",
            description: "Adjustable parameters for input size, execution speed, and algorithm variants to explore different scenarios."
        },
        {
            icon: "fas fa-graduation-cap",
            title: "Educational Content",
            description: "Comprehensive explanations, pseudocode, and detailed complexity analysis for each algorithm implementation."
        },
        {
            icon: "fas fa-download",
            title: "Code Generation",
            description: "Generate optimized code implementations in multiple programming languages based on visualized algorithms."
        }
    ],
    
    architecture: [
        {
            title: "Algorithm Engine",
            description: "High-performance C++ and Java implementations of classic algorithms with instrumentation for analysis.",
            points: [
                "Template-based generic algorithm implementations",
                "Performance instrumentation with cycle-accurate timing",
                "Memory usage tracking and allocation profiling",
                "Multi-threaded execution for parallel algorithms",
                "WebAssembly compilation for browser execution"
            ]
        },
        {
            title: "Visualization Framework",
            description: "React and D3.js based visualization system for interactive algorithm demonstration.",
            points: [
                "Canvas-based rendering for smooth animations",
                "D3.js integration for complex data visualizations",
                "Web Workers for non-blocking algorithm execution",
                "Responsive design for mobile and desktop devices",
                "Accessibility features for screen readers"
            ]
        },
        {
            title: "Educational Platform",
            description: "Comprehensive learning management system with progress tracking and interactive tutorials.",
            points: [
                "Progressive difficulty levels with guided tutorials",
                "Interactive coding challenges and assessments",
                "Performance benchmarking and leaderboards",
                "Code sharing and collaboration features",
                "Integration with popular LMS platforms"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "50+",
            label: "Algorithms Implemented"
        },
        {
            metric: "10K+",
            label: "Students Taught"
        },
        {
            metric: "99.9%",
            label: "Accuracy Rate"
        },
        {
            metric: "15 Languages",
            label: "Code Generation"
        }
    ]
};