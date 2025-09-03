import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Shield, 
  Building, 
  Search,
  UserPlus,
  Settings,
  Lock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Computer,
  FolderTree
} from "lucide-react";

interface ADUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  department: string;
  lastLogin: Date;
  status: 'active' | 'disabled' | 'locked';
  groups: string[];
}

interface ADGroup {
  id: string;
  name: string;
  type: 'Security' | 'Distribution';
  memberCount: number;
  description: string;
}

interface OrganizationalUnit {
  id: string;
  name: string;
  path: string;
  userCount: number;
  computerCount: number;
}

export default function ADManagementDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'users' | 'groups' | 'ous' | 'computers'>('users');
  const [isLoading, setIsLoading] = useState(false);

  const [users] = useState<ADUser[]>([
    {
      id: '1',
      username: 'john.smith',
      displayName: 'John Smith',
      email: 'john.smith@company.com',
      department: 'IT Services',
      lastLogin: new Date(2024, 0, 5, 9, 30),
      status: 'active',
      groups: ['IT-Support', 'Domain Users', 'IT-Administrators']
    },
    {
      id: '2',
      username: 'sarah.johnson',
      displayName: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Human Resources',
      lastLogin: new Date(2024, 0, 5, 8, 45),
      status: 'active',
      groups: ['HR-Staff', 'Domain Users']
    },
    {
      id: '3',
      username: 'mike.wilson',
      displayName: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      department: 'Engineering',
      lastLogin: new Date(2024, 0, 4, 16, 20),
      status: 'locked',
      groups: ['Engineers', 'Domain Users', 'VPN-Access']
    },
    {
      id: '4',
      username: 'lisa.davis',
      displayName: 'Lisa Davis',
      email: 'lisa.davis@company.com',
      department: 'Finance',
      lastLogin: new Date(2023, 11, 28, 14, 10),
      status: 'disabled',
      groups: ['Finance-Team', 'Domain Users']
    }
  ]);

  const [groups] = useState<ADGroup[]>([
    { id: '1', name: 'IT-Administrators', type: 'Security', memberCount: 5, description: 'Full IT administrative access' },
    { id: '2', name: 'Domain Users', type: 'Security', memberCount: 247, description: 'All domain users' },
    { id: '3', name: 'IT-Support', type: 'Security', memberCount: 12, description: 'IT support staff' },
    { id: '4', name: 'HR-Staff', type: 'Security', memberCount: 8, description: 'Human Resources team' },
    { id: '5', name: 'Engineers', type: 'Security', memberCount: 45, description: 'Engineering department' },
    { id: '6', name: 'VPN-Access', type: 'Security', memberCount: 78, description: 'Remote access permissions' }
  ]);

  const [organizationalUnits] = useState<OrganizationalUnit[]>([
    { id: '1', name: 'Corporate', path: 'OU=Corporate,DC=company,DC=com', userCount: 150, computerCount: 200 },
    { id: '2', name: 'IT Department', path: 'OU=IT,OU=Corporate,DC=company,DC=com', userCount: 25, computerCount: 45 },
    { id: '3', name: 'Engineering', path: 'OU=Engineering,OU=Corporate,DC=company,DC=com', userCount: 45, computerCount: 80 },
    { id: '4', name: 'Sales', path: 'OU=Sales,OU=Corporate,DC=company,DC=com', userCount: 32, computerCount: 40 },
    { id: '5', name: 'Human Resources', path: 'OU=HR,OU=Corporate,DC=company,DC=com', userCount: 8, computerCount: 12 }
  ]);

  const [domainStats] = useState({
    totalUsers: 247,
    activeUsers: 198,
    lockedUsers: 12,
    disabledUsers: 37,
    totalComputers: 377,
    totalGroups: 156,
    domainControllers: 3,
    forestFunctionalLevel: 'Windows Server 2019'
  });

  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'disabled':
        return 'text-gray-600 bg-gray-100';
      case 'locked':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBulkAction = (action: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate bulk action completion
    }, 2000);
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Active Directory Management Console</h3>
          <p className="text-gray-600">Enterprise domain services administration and user management</p>
        </div>

        {/* Domain Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Card className="p-3 text-center">
            <Users className="w-5 h-5 mx-auto text-blue-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.totalUsers}</div>
            <div className="text-xs text-gray-500">Total Users</div>
          </Card>
          <Card className="p-3 text-center">
            <CheckCircle className="w-5 h-5 mx-auto text-green-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.activeUsers}</div>
            <div className="text-xs text-gray-500">Active</div>
          </Card>
          <Card className="p-3 text-center">
            <Lock className="w-5 h-5 mx-auto text-red-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.lockedUsers}</div>
            <div className="text-xs text-gray-500">Locked</div>
          </Card>
          <Card className="p-3 text-center">
            <AlertTriangle className="w-5 h-5 mx-auto text-gray-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.disabledUsers}</div>
            <div className="text-xs text-gray-500">Disabled</div>
          </Card>
          <Card className="p-3 text-center">
            <Computer className="w-5 h-5 mx-auto text-purple-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.totalComputers}</div>
            <div className="text-xs text-gray-500">Computers</div>
          </Card>
          <Card className="p-3 text-center">
            <Shield className="w-5 h-5 mx-auto text-orange-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.totalGroups}</div>
            <div className="text-xs text-gray-500">Groups</div>
          </Card>
          <Card className="p-3 text-center">
            <Building className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
            <div className="text-lg font-bold">{domainStats.domainControllers}</div>
            <div className="text-xs text-gray-500">DCs</div>
          </Card>
          <Card className="p-3 text-center">
            <Settings className="w-5 h-5 mx-auto text-cyan-600 mb-1" />
            <div className="text-sm font-bold">2019</div>
            <div className="text-xs text-gray-500">Forest Level</div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'users', label: 'Users', icon: Users },
            { key: 'groups', label: 'Groups', icon: Shield },
            { key: 'ous', label: 'Organizational Units', icon: FolderTree },
            { key: 'computers', label: 'Computers', icon: Computer }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedTab === key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTab(key as any)}
              className="flex-1"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={`Search ${selectedTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => handleBulkAction('export')} disabled={isLoading}>
              Export
            </Button>
            <Button size="sm" onClick={() => handleBulkAction('sync')} disabled={isLoading}>
              {isLoading ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
              Sync AD
            </Button>
            <Button size="sm" onClick={() => handleBulkAction('add')}>
              <UserPlus className="w-4 h-4 mr-1" />
              Add {selectedTab.slice(0, -1)}
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {selectedTab === 'users' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Accounts</h3>
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{user.displayName}</div>
                      <div className="text-sm text-gray-600">{user.username} • {user.email}</div>
                      <div className="text-xs text-gray-500">
                        {user.department} • Last login: {user.lastLogin.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {user.groups.length} groups
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedTab === 'groups' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security & Distribution Groups</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((group) => (
                <div key={group.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{group.name}</h4>
                    <Badge variant="outline">{group.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  <div className="text-xs text-gray-500">
                    Members: {group.memberCount}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedTab === 'ous' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Organizational Units</h3>
            <div className="space-y-3">
              {organizationalUnits.map((ou) => (
                <div key={ou.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <FolderTree className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{ou.name}</div>
                      <div className="text-sm text-gray-600 font-mono">{ou.path}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{ou.userCount} users</div>
                    <div className="text-xs text-gray-500">{ou.computerCount} computers</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedTab === 'computers' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Domain Computers</h3>
            <div className="text-center py-8 text-gray-500">
              <Computer className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Computer management interface would display domain-joined machines,</p>
              <p>their status, last heartbeat, and configuration details.</p>
            </div>
          </Card>
        )}

        {/* Technical Features */}
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Enterprise AD Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">User Management</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Bulk user provisioning/deprovisioning</li>
                <li>• Password policy enforcement</li>
                <li>• Account lockout management</li>
                <li>• Group membership automation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security & Compliance</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Privileged access management</li>
                <li>• Audit trail and reporting</li>
                <li>• GPO management and deployment</li>
                <li>• Fine-grained password policies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Infrastructure</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Multi-domain forest support</li>
                <li>• Site and subnet management</li>
                <li>• LDAP query optimization</li>
                <li>• Disaster recovery automation</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}