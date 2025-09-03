import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Play, 
  Users, 
  Lock, 
  Activity, 
  HardDrive,
  Zap,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

interface DatabaseConnection {
  id: string;
  name: string;
  host: string;
  status: 'connected' | 'disconnected' | 'error';
  responseTime: number;
  activeConnections: number;
  maxConnections: number;
}

interface QueryResult {
  id: string;
  query: string;
  executionTime: number;
  rowsAffected: number;
  status: 'success' | 'error';
  timestamp: Date;
}

export default function DatabaseAdminDemo() {
  const [selectedDb, setSelectedDb] = useState<string>('prod-db');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC LIMIT 10;');
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryResults, setQueryResults] = useState<QueryResult[]>([]);
  
  const [databases] = useState<DatabaseConnection[]>([
    { 
      id: 'prod-db', 
      name: 'Production DB', 
      host: 'prod-sql01.company.com', 
      status: 'connected', 
      responseTime: 12, 
      activeConnections: 45, 
      maxConnections: 100 
    },
    { 
      id: 'staging-db', 
      name: 'Staging DB', 
      host: 'stage-sql01.company.com', 
      status: 'connected', 
      responseTime: 8, 
      activeConnections: 12, 
      maxConnections: 50 
    },
    { 
      id: 'dev-db', 
      name: 'Development DB', 
      host: 'dev-sql01.company.com', 
      status: 'connected', 
      responseTime: 15, 
      activeConnections: 8, 
      maxConnections: 25 
    },
    { 
      id: 'backup-db', 
      name: 'Backup Server', 
      host: 'backup-sql01.company.com', 
      status: 'error', 
      responseTime: 0, 
      activeConnections: 0, 
      maxConnections: 100 
    }
  ]);

  const [systemMetrics] = useState({
    totalDatabases: 12,
    totalUsers: 1248,
    totalTables: 186,
    dataSize: '2.4 TB',
    backupStatus: 'Completed',
    lastBackup: '2 hours ago'
  });

  const sampleQueries = [
    'SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC LIMIT 10;',
    'SELECT COUNT(*) as total_orders, SUM(amount) as revenue FROM orders WHERE date >= DATEADD(month, -1, GETDATE());',
    'UPDATE users SET last_login = GETDATE() WHERE user_id = 12345;',
    'CREATE INDEX idx_user_email ON users(email) WHERE active = 1;',
    'EXEC sp_who2 -- Show current database connections',
    'SELECT name, size_mb = size * 8.0 / 1024 FROM sys.database_files;'
  ];

  const executeQuery = async () => {
    if (!sqlQuery.trim()) return;

    setIsExecuting(true);
    
    // Simulate query execution
    setTimeout(() => {
      const executionTime = Math.random() * 500 + 50; // 50-550ms
      const rowsAffected = Math.floor(Math.random() * 100) + 1;
      const isError = Math.random() < 0.1; // 10% chance of error

      const result: QueryResult = {
        id: Date.now().toString(),
        query: sqlQuery,
        executionTime,
        rowsAffected: isError ? 0 : rowsAffected,
        status: isError ? 'error' : 'success',
        timestamp: new Date()
      };

      setQueryResults(prev => [result, ...prev.slice(0, 9)]);
      setIsExecuting(false);
    }, Math.random() * 2000 + 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'disconnected':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedDatabase = databases.find(db => db.id === selectedDb);
  const connectionUsage = selectedDatabase ? (selectedDatabase.activeConnections / selectedDatabase.maxConnections) * 100 : 0;

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Enterprise Database Administration</h3>
          <p className="text-gray-600">SQL Server management with connection pooling and performance monitoring</p>
        </div>

        {/* Database Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4 text-center">
            <Database className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{systemMetrics.totalDatabases}</div>
            <div className="text-xs text-gray-500">Databases</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Users</div>
          </Card>
          <Card className="p-4 text-center">
            <Activity className="w-6 h-6 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold">{systemMetrics.totalTables}</div>
            <div className="text-xs text-gray-500">Tables</div>
          </Card>
          <Card className="p-4 text-center">
            <HardDrive className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold">{systemMetrics.dataSize}</div>
            <div className="text-xs text-gray-500">Data Size</div>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-2" />
            <div className="text-sm font-bold">{systemMetrics.backupStatus}</div>
            <div className="text-xs text-gray-500">Backup</div>
          </Card>
          <Card className="p-4 text-center">
            <RefreshCw className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <div className="text-sm font-bold">{systemMetrics.lastBackup}</div>
            <div className="text-xs text-gray-500">Last Sync</div>
          </Card>
        </div>

        {/* Database Connections */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Connections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {databases.map((db) => (
              <div 
                key={db.id} 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedDb === db.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDb(db.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{db.name}</h4>
                  <Badge className={getStatusColor(db.status)}>
                    {db.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{db.host}</p>
                {db.status === 'connected' && (
                  <div className="space-y-1">
                    <div className="text-xs">Response: {db.responseTime}ms</div>
                    <div className="text-xs">
                      Connections: {db.activeConnections}/{db.maxConnections}
                    </div>
                    <Progress 
                      value={(db.activeConnections / db.maxConnections) * 100} 
                      className="h-1" 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* SQL Query Interface */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            SQL Query Console - {selectedDatabase?.name}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SQL Query:</label>
              <Textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="Enter your SQL query here..."
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={executeQuery}
                disabled={isExecuting || !sqlQuery.trim()}
                className="min-w-32"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Execute Query
                  </>
                )}
              </Button>
              
              <div className="flex flex-wrap gap-1">
                {sampleQueries.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSqlQuery(query)}
                    disabled={isExecuting}
                  >
                    Sample {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Query Results */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Query Execution History</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {queryResults.length === 0 ? (
              <p className="text-gray-500 text-sm">No queries executed yet. Try running a SQL query above.</p>
            ) : (
              queryResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status === 'success' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {result.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <code className="text-sm bg-gray-100 p-2 rounded block mb-2">
                    {result.query.length > 80 
                      ? `${result.query.substring(0, 80)}...` 
                      : result.query
                    }
                  </code>
                  
                  <div className="text-xs text-gray-600 space-x-4">
                    <span>Execution Time: {result.executionTime.toFixed(1)}ms</span>
                    {result.status === 'success' && (
                      <span>Rows Affected: {result.rowsAffected}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Technical Features */}
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Enterprise Database Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Connection Management</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Connection pooling optimization</li>
                <li>• Multi-database support</li>
                <li>• Failover and load balancing</li>
                <li>• Connection timeout handling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security & Compliance</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SQL injection prevention</li>
                <li>• Query execution logging</li>
                <li>• User access control</li>
                <li>• Encrypted connections (SSL/TLS)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Performance Monitoring</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Real-time query performance</li>
                <li>• Index usage analysis</li>
                <li>• Backup and recovery automation</li>
                <li>• Resource utilization tracking</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}