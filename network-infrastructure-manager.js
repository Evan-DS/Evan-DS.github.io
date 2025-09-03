// Network Infrastructure Manager Project Details

export default {
    title: "Network Infrastructure Manager",
    subtitle: "Comprehensive network management solution for enterprise LAN/WAN environments with automated configuration, monitoring, and troubleshooting capabilities.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    description: "An enterprise-grade network management platform designed to simplify the administration of complex network infrastructures. This solution provides automated discovery, configuration management, performance monitoring, and intelligent troubleshooting for routers, switches, firewalls, and other network devices.",
    demoUrl: null,
    githubUrl: "https://github.com/alexjohnson/network-infrastructure-manager",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "Python", icon: "fab fa-python" },
        { name: "SNMP", icon: "fas fa-network-wired" },
        { name: "React", icon: "fab fa-react" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Cisco APIs", icon: "fas fa-plug" },
        { name: "NETCONF", icon: "fas fa-cogs" },
        { name: "Wireshark", icon: "fas fa-search" }
    ],
    
    features: [
        {
            icon: "fas fa-search",
            title: "Network Discovery",
            description: "Automated network topology discovery using SNMP, CDP, and LLDP protocols to map device relationships and connections."
        },
        {
            icon: "fas fa-cogs",
            title: "Configuration Management",
            description: "Centralized configuration management with version control, bulk updates, and rollback capabilities for network devices."
        },
        {
            icon: "fas fa-chart-line",
            title: "Performance Monitoring",
            description: "Real-time monitoring of bandwidth utilization, latency, packet loss, and device health across the entire network."
        },
        {
            icon: "fas fa-tools",
            title: "Automated Troubleshooting",
            description: "Intelligent diagnostic tools with automated root cause analysis and suggested remediation actions."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Security Compliance",
            description: "Continuous security monitoring with compliance checking against industry standards and automated vulnerability scanning."
        },
        {
            icon: "fas fa-mobile-alt",
            title: "Mobile Management",
            description: "Responsive web interface and mobile app for on-the-go network monitoring and emergency response."
        }
    ],
    
    architecture: [
        {
            title: "Network Communication Layer",
            description: "High-performance C++ backend for efficient communication with network devices using various protocols.",
            points: [
                "SNMP v1/v2c/v3 implementation with bulk operations",
                "NETCONF and RESTCONF protocol support",
                "SSH and Telnet connectivity for legacy devices",
                "Cisco DNA Center and Meraki API integration",
                "Custom protocol handlers for vendor-specific features"
            ]
        },
        {
            title: "Data Processing Engine",
            description: "Python-based analytics engine for processing network data and generating insights.",
            points: [
                "Machine learning algorithms for anomaly detection",
                "Time-series analysis for trend identification",
                "Network path calculation and optimization",
                "Automated report generation and alerting",
                "Integration with external monitoring systems"
            ]
        },
        {
            title: "User Interface Layer",
            description: "Modern React-based dashboard providing comprehensive network visualization and management tools.",
            points: [
                "Interactive network topology visualization",
                "Real-time device status and performance dashboards",
                "Configuration diff viewer and version control",
                "Drag-and-drop network design interface",
                "Role-based access control and user management"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "1000+",
            label: "Devices Managed"
        },
        {
            metric: "95%",
            label: "Faster Troubleshooting"
        },
        {
            metric: "99.8%",
            label: "Network Uptime"
        },
        {
            metric: "80%",
            label: "Config Time Savings"
        }
    ]
};