import DatabaseAdminDemo from "../components/database-admin-demo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function DatabaseAdminDemoPage() {
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
            Database Administration Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade SQL Server management platform with advanced connection pooling, 
            performance monitoring, and automated backup systems for mission-critical environments.
          </p>
        </div>

        <DatabaseAdminDemo />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">SQL Server Enterprise Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Database Administration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-instance SQL Server management</li>
                  <li>• Automated backup and recovery procedures</li>
                  <li>• Index optimization and maintenance plans</li>
                  <li>• Performance tuning and query optimization</li>
                  <li>• User access management and security audits</li>
                  <li>• Database migration and synchronization</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Enterprise Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Always On Availability Groups setup</li>
                  <li>• SQL Server Agent job scheduling</li>
                  <li>• Dynamic Management View monitoring</li>
                  <li>• Transaction log management</li>
                  <li>• Deadlock detection and resolution</li>
                  <li>• Compliance reporting and auditing</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Technical Implementation</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Backend Architecture</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• C++ application with SQL Server Native Client</li>
                      <li>• Windows Service for background monitoring</li>
                      <li>• T-SQL stored procedures for operations</li>
                      <li>• PowerShell integration for automation</li>
                      <li>• SSIS packages for data migration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Management Console</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time connection monitoring</li>
                      <li>• Query execution plan analysis</li>
                      <li>• Performance counter dashboards</li>
                      <li>• Alert management and notifications</li>
                      <li>• Report generation and scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Enterprise Impact</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Performance Gains</h4>
                  <p className="text-sm text-green-700">
                    Optimized query performance by 60% through index tuning and execution plan analysis.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">High Availability</h4>
                  <p className="text-sm text-blue-700">
                    Achieved 99.9% uptime with automated failover and backup recovery procedures.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Security Compliance</h4>
                  <p className="text-sm text-purple-700">
                    Implemented comprehensive auditing meeting SOX and HIPAA compliance requirements.
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