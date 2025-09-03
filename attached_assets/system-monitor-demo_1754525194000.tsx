import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Server, Database, Wifi, HardDrive, Cpu, MemoryStick } from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  unit: string;
  icon: any;
}

interface NetworkNode {
  id: string;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  uptime: number;
}

export default function SystemMonitorDemo() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU Usage", value: 0, status: 'healthy', unit: '%', icon: Cpu },
    { name: "Memory Usage", value: 0, status: 'healthy', unit: '%', icon: MemoryStick },
    { name: "Disk Usage", value: 0, status: 'healthy', unit: '%', icon: HardDrive },
    { name: "Network I/O", value: 0, status: 'healthy', unit: 'MB/s', icon: Wifi },
  ]);
  
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([
    { id: 'db-server', name: 'Database Server', ip: '192.168.1.10', status: 'online', responseTime: 12, uptime: 99.8 },
    { id: 'web-server', name: 'Web Server', ip: '192.168.1.11', status: 'online', responseTime: 8, uptime: 99.9 },
    { id: 'api-server', name: 'API Server', ip: '192.168.1.12', status: 'warning', responseTime: 45, uptime: 98.2 },
    { id: 'file-server', name: 'File Server', ip: '192.168.1.13', status: 'online', responseTime: 15, uptime: 99.5 },
  ]);

  const [alerts, setAlerts] = useState<Array<{id: string, message: string, severity: 'info' | 'warning' | 'error', timestamp: Date}>>([]);

  // Simulate real-time metrics
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const baseValue = Math.random() * 100;
        let newValue: number;
        let status: 'healthy' | 'warning' | 'critical';

        switch (metric.name) {
          case 'CPU Usage':
            newValue = 20 + Math.random() * 60; // 20-80%
            status = newValue > 70 ? 'critical' : newValue > 50 ? 'warning' : 'healthy';
            break;
          case 'Memory Usage':
            newValue = 30 + Math.random() * 50; // 30-80%
            status = newValue > 75 ? 'critical' : newValue > 60 ? 'warning' : 'healthy';
            break;
          case 'Disk Usage':
            newValue = 45 + Math.random() * 30; // 45-75%
            status = newValue > 85 ? 'critical' : newValue > 70 ? 'warning' : 'healthy';
            break;
          case 'Network I/O':
            newValue = Math.random() * 100; // 0-100 MB/s
            status = newValue > 80 ? 'warning' : 'healthy';
            break;
          default:
            newValue = baseValue;
            status = 'healthy';
        }

        // Generate alerts for critical conditions
        if (status === 'critical' && metric.status !== 'critical') {
          setAlerts(prev => [...prev.slice(-4), {
            id: Date.now().toString(),
            message: `${metric.name} is critically high (${newValue.toFixed(1)}${metric.unit})`,
            severity: 'error',
            timestamp: new Date()
          }]);
        }

        return { ...metric, value: newValue, status };
      }));

      // Update network nodes
      setNetworkNodes(prev => prev.map(node => {
        const responseTime = 5 + Math.random() * 50;
        const status = responseTime > 100 ? 'offline' : responseTime > 30 ? 'warning' : 'online';
        return { ...node, responseTime, status };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Enterprise System Monitor</h3>
          <p className="text-gray-600">Real-time infrastructure monitoring and alerting system</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? 'outline' : 'default'}
            className="min-w-32"
          >
            {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isMonitoring ? 'Stop Monitor' : 'Start Monitor'}
          </Button>
          <Button 
            onClick={() => setAlerts([])} 
            variant="outline"
            disabled={alerts.length === 0}
          >
            Clear Alerts ({alerts.length})
          </Button>
        </div>

        {/* System Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card key={metric.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">{metric.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {metric.value.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Network Topology */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2" />
            Network Infrastructure Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkNodes.map((node) => (
              <div key={node.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{node.name}</h4>
                  <Badge className={getStatusColor(node.status)}>
                    {node.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">IP: {node.ip}</p>
                <div className="text-xs space-y-1">
                  <div>Response: {node.responseTime.toFixed(1)}ms</div>
                  <div>Uptime: {node.uptime.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {alerts.length === 0 ? (
              <p className="text-gray-500 text-sm">No active alerts</p>
            ) : (
              alerts.slice().reverse().map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <Badge className={getStatusColor(alert.severity === 'error' ? 'critical' : alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="ml-2 text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Technical Features */}
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Enterprise Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Real-time Monitoring</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Live system metrics collection</li>
                <li>• Network topology visualization</li>
                <li>• Performance trend analysis</li>
                <li>• Multi-server dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Alert Management</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Threshold-based alerting</li>
                <li>• Email/SMS notifications</li>
                <li>• Alert escalation policies</li>
                <li>• Historical alert tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Enterprise Integration</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SNMP protocol support</li>
                <li>• Active Directory integration</li>
                <li>• REST API endpoints</li>
                <li>• Database logging</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}