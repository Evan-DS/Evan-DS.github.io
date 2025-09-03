// Database Administration Suite Project Details

export default {
    title: "Database Administration Suite",
    subtitle: "Comprehensive SQL Server management platform with connection pooling, performance monitoring, and automated backup systems achieving 99.9% uptime.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
    description: "A powerful database administration platform designed for enterprise SQL Server environments. This suite provides comprehensive tools for database management, performance optimization, automated maintenance, and disaster recovery planning across multiple server instances.",
    demoUrl: null,
    githubUrl: "https://github.com/alexjohnson/database-admin-suite",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "SQL Server", icon: "fas fa-database" },
        { name: "PowerShell", icon: "fas fa-terminal" },
        { name: "React", icon: "fab fa-react" },
        { name: "TypeScript", icon: "fab fa-js-square" },
        { name: "Windows SDK", icon: "fab fa-windows" },
        { name: "ODBC", icon: "fas fa-plug" },
        { name: "WMI", icon: "fas fa-cogs" }
    ],
    
    features: [
        {
            icon: "fas fa-database",
            title: "Multi-Server Management",
            description: "Centralized management interface for multiple SQL Server instances with unified monitoring and control capabilities."
        },
        {
            icon: "fas fa-tachometer-alt",
            title: "Performance Monitoring",
            description: "Real-time performance metrics tracking with query optimization recommendations and resource utilization analysis."
        },
        {
            icon: "fas fa-save",
            title: "Automated Backup Systems",
            description: "Intelligent backup scheduling with compression, encryption, and automated verification of backup integrity."
        },
        {
            icon: "fas fa-users-cog",
            title: "User & Security Management",
            description: "Comprehensive user management with role-based permissions, security auditing, and compliance reporting."
        },
        {
            icon: "fas fa-chart-bar",
            title: "Capacity Planning",
            description: "Advanced analytics for storage growth prediction, performance bottleneck identification, and resource planning."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Disaster Recovery",
            description: "Automated disaster recovery planning with failover testing and recovery time objective monitoring."
        }
    ],
    
    architecture: [
        {
            title: "Core Database Engine",
            description: "High-performance C++ backend providing efficient database operations and connection management.",
            points: [
                "ODBC-based connection pooling for optimal performance",
                "Multi-threaded query execution with resource management",
                "Native SQL Server integration using Windows APIs",
                "Advanced transaction handling and rollback capabilities",
                "Memory-mapped file operations for large dataset processing"
            ]
        },
        {
            title: "Automation Framework",
            description: "PowerShell-based automation engine for scheduled tasks and administrative operations.",
            points: [
                "Scheduled backup and maintenance task execution",
                "Automated performance tuning and index optimization",
                "Email and SMS notification system integration",
                "Custom script execution with error handling",
                "Integration with Windows Task Scheduler"
            ]
        },
        {
            title: "Web Administration Interface",
            description: "Modern React-based dashboard for database administration and monitoring.",
            points: [
                "TypeScript implementation for type safety",
                "Real-time dashboard with live performance metrics",
                "Interactive query analyzer and execution planner",
                "Visual database schema designer and editor",
                "Responsive design for mobile device compatibility"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "99.9%",
            label: "Database Uptime"
        },
        {
            metric: "50%",
            label: "Backup Time Reduction"
        },
        {
            metric: "100TB+",
            label: "Data Managed"
        },
        {
            metric: "24/7",
            label: "Automated Monitoring"
        }
    ]
};