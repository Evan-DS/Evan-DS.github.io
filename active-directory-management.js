// Active Directory Management Console Project Details

export default {
    title: "Active Directory Management Console",
    subtitle: "Enterprise domain services administration platform for comprehensive user management, security policy enforcement, and organizational structure maintenance across 10,000+ users.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    description: "A powerful enterprise-grade Active Directory management platform designed for large-scale Windows domain environments. This console provides comprehensive tools for user lifecycle management, group policy administration, security compliance, and organizational structure maintenance across complex enterprise hierarchies.",
    demoUrl: null,
    githubUrl: "https://github.com/alexjohnson/active-directory-management",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "PowerShell", icon: "fas fa-terminal" },
        { name: "LDAP", icon: "fas fa-sitemap" },
        { name: "Windows SDK", icon: "fab fa-windows" },
        { name: "React", icon: "fab fa-react" },
        { name: "WMI", icon: "fas fa-cogs" },
        { name: "ADSI", icon: "fas fa-network-wired" },
        { name: "Kerberos", icon: "fas fa-key" }
    ],
    
    features: [
        {
            icon: "fas fa-users",
            title: "User Lifecycle Management",
            description: "Comprehensive user account management including automated provisioning, deprovisioning, and role-based access control."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Security Policy Enforcement",
            description: "Advanced Group Policy management with automated compliance checking and security policy deployment across the domain."
        },
        {
            icon: "fas fa-sitemap",
            title: "Organizational Unit Management",
            description: "Intuitive OU structure management with drag-and-drop organization and automated delegation of administrative rights."
        },
        {
            icon: "fas fa-search",
            title: "Advanced Directory Search",
            description: "Powerful LDAP-based search capabilities with complex query builder and bulk operation support."
        },
        {
            icon: "fas fa-chart-bar",
            title: "Compliance Reporting",
            description: "Automated generation of compliance reports for SOX, HIPAA, and other regulatory requirements with audit trail tracking."
        },
        {
            icon: "fas fa-sync-alt",
            title: "Directory Synchronization",
            description: "Multi-forest synchronization with conflict resolution and automated failover for disaster recovery scenarios."
        }
    ],
    
    architecture: [
        {
            title: "Directory Services Layer",
            description: "Native Windows API integration for efficient Active Directory operations and management.",
            points: [
                "ADSI (Active Directory Service Interfaces) integration",
                "LDAP protocol implementation with SSL/TLS encryption",
                "Kerberos authentication and delegation handling",
                "Windows Management Instrumentation (WMI) integration",
                "Native Windows SDK API utilization for system operations"
            ]
        },
        {
            title: "Automation Framework",
            description: "PowerShell-based automation engine for bulk operations and scheduled maintenance tasks.",
            points: [
                "PowerShell DSC (Desired State Configuration) integration",
                "Automated user provisioning workflows",
                "Group Policy deployment and rollback automation",
                "Scheduled maintenance and cleanup operations",
                "Integration with HR systems for automated onboarding"
            ]
        },
        {
            title: "Management Interface",
            description: "Modern React-based administrative interface with role-based access and comprehensive functionality.",
            points: [
                "Responsive design for desktop and tablet devices",
                "Real-time directory change notifications",
                "Interactive organizational chart visualization",
                "Bulk operation wizards with progress tracking",
                "Comprehensive audit logging and change tracking"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "10,000+",
            label: "Users Managed"
        },
        {
            metric: "99.99%",
            label: "Service Availability"
        },
        {
            metric: "75%",
            label: "Admin Time Saved"
        },
        {
            metric: "100%",
            label: "Compliance Rate"
        }
    ]
};