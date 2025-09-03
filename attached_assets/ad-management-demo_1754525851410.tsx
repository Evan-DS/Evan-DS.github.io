import ADManagementDemo from "../components/ad-management-demo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function ADManagementDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Active Directory Management Console
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise domain services administration platform for comprehensive user management, 
            security policy enforcement, and organizational structure maintenance across distributed Windows environments.
          </p>
        </div>

        <ADManagementDemo />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Active Directory Enterprise Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Domain Administration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-forest domain controller management</li>
                  <li>• Global catalog server optimization</li>
                  <li>• FSMO role management and transfer</li>
                  <li>• Site and subnet topology design</li>
                  <li>• Replication monitoring and troubleshooting</li>
                  <li>• Schema modifications and extensions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Security & Compliance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Group Policy Object (GPO) management</li>
                  <li>• Fine-grained password policies</li>
                  <li>• Privileged Access Management (PAM)</li>
                  <li>• Certificate Services integration</li>
                  <li>• Security auditing and compliance reporting</li>
                  <li>• Trust relationship configuration</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Technical Implementation</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Core Technologies</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• C++ with Windows SDK integration</li>
                      <li>• LDAP/ADSI programming interfaces</li>
                      <li>• PowerShell automation scripts</li>
                      <li>• WMI for system information queries</li>
                      <li>• Windows Management Framework</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Management Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time directory synchronization</li>
                      <li>• Bulk user provisioning workflows</li>
                      <li>• Automated group membership management</li>
                      <li>• Custom attribute management</li>
                      <li>• Integration with HR systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Enterprise Impact</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Operational Efficiency</h4>
                  <p className="text-sm text-green-700">
                    Reduced user provisioning time by 80% through automated workflows and bulk operations.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Security Posture</h4>
                  <p className="text-sm text-blue-700">
                    Enhanced security compliance with automated policy enforcement and privilege management.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Scale Management</h4>
                  <p className="text-sm text-purple-700">
                    Successfully managed 10,000+ user accounts across multiple domains and geographic locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}