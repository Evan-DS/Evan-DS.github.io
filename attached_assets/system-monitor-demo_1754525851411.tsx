import SystemMonitorDemo from "../components/system-monitor-demo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function SystemMonitorDemoPage() {
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
            Enterprise System Monitor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time infrastructure monitoring solution built for enterprise environments. 
            Features comprehensive system metrics, network topology monitoring, and intelligent alerting.
          </p>
        </div>

        <SystemMonitorDemo />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Enterprise System Architecture</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Core Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-threaded data collection agents</li>
                  <li>• Real-time WebSocket communication</li>
                  <li>• Time-series database integration</li>
                  <li>• RESTful API for external systems</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Horizontal scaling architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Monitoring Capabilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Windows/Linux server monitoring</li>
                  <li>• Active Directory health checks</li>
                  <li>• Network device SNMP polling</li>
                  <li>• Application performance monitoring</li>
                  <li>• Database connection monitoring</li>
                  <li>• Custom script execution</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Technical Implementation</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Backend Technologies</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• C++ for high-performance data collection</li>
                      <li>• Windows Management Instrumentation (WMI)</li>
                      <li>• SNMP protocol implementation</li>
                      <li>• SQL Server for metrics storage</li>
                      <li>• Windows Services architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Frontend Dashboard</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time data visualization</li>
                      <li>• Interactive network topology</li>
                      <li>• Responsive design for mobile access</li>
                      <li>• Export capabilities (PDF/Excel)</li>
                      <li>• Custom dashboard configuration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Enterprise Value</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Cost Reduction</h4>
                  <p className="text-sm text-green-700">
                    Reduced system downtime by 40% through proactive monitoring and automated alerting.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Operational Efficiency</h4>
                  <p className="text-sm text-blue-700">
                    Centralized monitoring reduced IT response time from hours to minutes.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Scalability</h4>
                  <p className="text-sm text-purple-700">
                    Successfully deployed across 500+ servers in distributed environment.
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