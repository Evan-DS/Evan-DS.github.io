// Enterprise System Monitor Project Details

export default {
    title: "Enterprise System Monitor",
    subtitle: "Real-time infrastructure monitoring platform with advanced alerting and analytics capabilities for enterprise environments managing 500+ servers.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description: "A comprehensive enterprise-grade monitoring solution built for large-scale infrastructure management. This system provides real-time monitoring, intelligent alerting, and detailed analytics for server farms, network devices, and critical applications across distributed environments.",
    demoUrl: null,
    githubUrl: "https://github.com/alexjohnson/enterprise-system-monitor",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "React", icon: "fab fa-react" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "PostgreSQL", icon: "fas fa-database" },
        { name: "Redis", icon: "fas fa-memory" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "WebSocket", icon: "fas fa-plug" },
        { name: "SNMP", icon: "fas fa-network-wired" }
    ],
    
    features: [
        {
            icon: "fas fa-chart-line",
            title: "Real-time Monitoring",
            description: "Continuous monitoring of server metrics, network devices, and applications with sub-second data collection intervals."
        },
        {
            icon: "fas fa-bell",
            title: "Intelligent Alerting",
            description: "Smart alerting system with configurable thresholds, escalation policies, and integration with popular notification services."
        },
        {
            icon: "fas fa-tachometer-alt",
            title: "Performance Analytics",
            description: "Advanced analytics dashboard with historical trending, predictive analysis, and capacity planning insights."
        },
        {
            icon: "fas fa-network-wired",
            title: "Network Topology Mapping",
            description: "Automatic discovery and visualization of network infrastructure with real-time status indicators."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Security Monitoring",
            description: "Integrated security monitoring with anomaly detection and compliance reporting capabilities."
        },
        {
            icon: "fas fa-cloud",
            title: "Multi-Cloud Support",
            description: "Unified monitoring across on-premises, AWS, Azure, and Google Cloud Platform environments."
        }
    ],
    
    architecture: [
        {
            title: "Data Collection Layer",
            description: "High-performance C++ agents deployed across the infrastructure for efficient data collection with minimal system impact.",
            points: [
                "Multi-threaded data collection with connection pooling",
                "Windows Management Instrumentation (WMI) integration",
                "SNMP protocol implementation for network devices",
                "Custom plugin architecture for application-specific metrics",
                "Efficient binary protocol for data transmission"
            ]
        },
        {
            title: "Processing & Storage",
            description: "Scalable backend infrastructure for processing, aggregating, and storing massive amounts of monitoring data.",
            points: [
                "Time-series database optimization for metric storage",
                "Real-time data processing with Apache Kafka",
                "Redis caching layer for frequently accessed data",
                "Automated data retention and archival policies",
                "Horizontal scaling with load balancing"
            ]
        },
        {
            title: "User Interface",
            description: "Modern web application providing intuitive dashboards and comprehensive system management capabilities.",
            points: [
                "React-based responsive dashboard with real-time updates",
                "WebSocket connections for live data streaming",
                "Interactive network topology visualization",
                "Customizable alerting and notification preferences",
                "Role-based access control and user management"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "500+",
            label: "Servers Monitored"
        },
        {
            metric: "99.9%",
            label: "System Uptime"
        },
        {
            metric: "40%",
            label: "Downtime Reduction"
        },
        {
            metric: "<1s",
            label: "Alert Response Time"
        }
    ]
};