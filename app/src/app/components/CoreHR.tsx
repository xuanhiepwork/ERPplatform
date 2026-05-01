import { useState } from 'react';
import {
  User, FileText, Building2, Shield, GraduationCap, Briefcase, CreditCard, Phone, Mail,
  MapPin, Calendar, AlertTriangle, Clock, CheckCircle2, XCircle, Download, Edit,
  MoreVertical, ChevronRight, ChevronDown, Users, Search, Filter, AlertCircle, Plus,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from './ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

interface Employee {

}

interface Contract {
  id: string;
  employeeName: string;
  employeeId: string;
  contractType: string;
  startDate: string;
  endDate: string;
  department: string;
  status: 'active' | 'expiring' | 'expired';
  daysUntilExpiry: number;
}

interface OrgNode {
  id: string;
  name: string;
  position: string;
  department: string;
  children?: OrgNode[];
  memberCount?: number;
}

const sampleEmployee: Employee = {

};

const contracts: Contract[] = [
  {
    id: 'ct-001',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP-2024-001',
    contractType: 'Full-Time Permanent',
    startDate: 'Jan 10, 2020',
    endDate: 'Dec 31, 2026',
    department: 'Engineering',
    status: 'active',
    daysUntilExpiry: 245,
  },
  {
    id: 'ct-002',
    employeeName: 'Michael Chen',
    employeeId: 'EMP-2024-002',
    contractType: 'Full-Time Permanent',
    startDate: 'Mar 15, 2019',
    endDate: 'May 20, 2026',
    department: 'Engineering',
    status: 'expiring',
    daysUntilExpiry: 35,
  },
  {
    id: 'ct-003',
    employeeName: 'Emily Rodriguez',
    employeeId: 'EMP-2024-003',
    contractType: 'Fixed-Term Contract',
    startDate: 'Jun 01, 2024',
    endDate: 'Jun 15, 2026',
    department: 'Design',
    status: 'expiring',
    daysUntilExpiry: 60,
  },
  {
    id: 'ct-004',
    employeeName: 'David Kim',
    employeeId: 'EMP-2024-004',
    contractType: 'Full-Time Permanent',
    startDate: 'Sep 10, 2021',
    endDate: 'Jul 10, 2026',
    department: 'Engineering',
    status: 'expiring',
    daysUntilExpiry: 85,
  },
  {
    id: 'ct-005',
    employeeName: 'Jessica Park',
    employeeId: 'EMP-2024-005',
    contractType: 'Part-Time Contract',
    startDate: 'Feb 01, 2023',
    endDate: 'Feb 01, 2027',
    department: 'Data Science',
    status: 'active',
    daysUntilExpiry: 290,
  },
  {
    id: 'ct-006',
    employeeName: 'Alex Thompson',
    employeeId: 'EMP-2024-006',
    contractType: 'Consultant Agreement',
    startDate: 'Apr 15, 2025',
    endDate: 'May 15, 2026',
    department: 'Operations',
    status: 'expiring',
    daysUntilExpiry: 29,
  },
  {
    id: 'ct-007',
    employeeName: 'Maria Garcia',
    employeeId: 'EMP-2024-007',
    contractType: 'Full-Time Permanent',
    startDate: 'Aug 20, 2020',
    endDate: 'Aug 20, 2027',
    department: 'Marketing',
    status: 'active',
    daysUntilExpiry: 491,
  },
];

const orgChart: OrgNode = {

};

function EProfileView({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                {employee.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold text-gray-900">{employee.name}</h2>
                <Badge
                  className={cn(
                    employee.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {employee.status === 'active' ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {employee.status}
                </Badge>
              </div>
              <p className="text-lg text-gray-600 mb-2">{employee.position}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {employee.employeeId}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {employee.department}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Hired: {employee.hireDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap className="h-4 w-4 mr-2" />
            Education
          </TabsTrigger>
          <TabsTrigger value="bank">
            <CreditCard className="h-4 w-4 mr-2" />
            Bank Details
          </TabsTrigger>
          <TabsTrigger value="history">
            <Briefcase className="h-4 w-4 mr-2" />
            Work History
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{employee.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{employee.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{employee.location}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-gray-900 mt-1">{employee.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Nationality</label>
                <p className="text-gray-900 mt-1">{employee.nationality}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Marital Status</label>
                <p className="text-gray-900 mt-1">{employee.maritalStatus}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Manager</label>
                <p className="text-gray-900 mt-1">{employee.manager}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Name</label>
                <p className="text-gray-900 mt-1">{employee.emergencyContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Relationship</label>
                <p className="text-gray-900 mt-1">{employee.emergencyContact.relationship}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900 mt-1">{employee.emergencyContact.phone}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <div className="space-y-4">
            {employee.education.map((edu, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{edu.degree}</h4>
                      <p className="text-gray-600 mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Field: {edu.field}</span>
                        <span>•</span>
                        <span>Graduated: {edu.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bank Details Tab */}
        <TabsContent value="bank">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-gray-500">
                This information is encrypted and securely stored
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Account Name</label>
                <p className="text-gray-900 mt-1">{employee.bankDetails.accountName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Bank Name</label>
                <p className="text-gray-900 mt-1">{employee.bankDetails.bankName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Account Number</label>
                <p className="text-gray-900 mt-1 font-mono">{employee.bankDetails.accountNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Routing Number</label>
                <p className="text-gray-900 mt-1 font-mono">{employee.bankDetails.routingNumber}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Work History Tab */}
        <TabsContent value="history">
          <div className="space-y-4">
            {employee.workHistory.map((work, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{work.position}</h4>
                        <p className="text-gray-600">{work.company}</p>
                      </div>
                      <Badge variant="outline">
                        {work.startDate} - {work.endDate}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{work.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContractManagement({ contracts }: { contracts: Contract[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const expiringContracts = contracts
    .filter((c) => c.status === 'expiring')
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  const getExpiryBadge = (days: number) => {
    if (days <= 30) return { color: 'bg-red-100 text-red-700', label: '30 days' };
    if (days <= 60) return { color: 'bg-orange-100 text-orange-700', label: '60 days' };
    if (days <= 90) return { color: 'bg-yellow-100 text-yellow-700', label: '90 days' };
    return { color: 'bg-gray-100 text-gray-700', label: 'Active' };
  };

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Contract Management</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor employee labor contracts
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by employee name or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Contracts Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Contract Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => {
                const badge = getExpiryBadge(contract.daysUntilExpiry);
                return (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{contract.employeeName}</p>
                        <p className="text-sm text-gray-500">{contract.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{contract.contractType}</TableCell>
                    <TableCell>{contract.department}</TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>
                      <Badge className={badge.color}>
                        {contract.status === 'expiring' && (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {contract.status === 'expiring'
                          ? `Expires in ${contract.daysUntilExpiry}d`
                          : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Contract
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Renew Contract
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Alert Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Card className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Expiring Contracts</h3>
            </div>
            <p className="text-sm text-gray-500">
              {expiringContracts.length} contracts require attention
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {expiringContracts.map((contract) => {
              const badge = getExpiryBadge(contract.daysUntilExpiry);
              return (
                <Card
                  key={contract.id}
                  className={cn(
                    'p-4 border-l-4 transition-all hover:shadow-md cursor-pointer',
                    contract.daysUntilExpiry <= 30
                      ? 'border-l-red-500 bg-red-50'
                      : contract.daysUntilExpiry <= 60
                        ? 'border-l-orange-500 bg-orange-50'
                        : 'border-l-yellow-500 bg-yellow-50'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {contract.employeeName}
                      </h4>
                      <p className="text-xs text-gray-500">{contract.employeeId}</p>
                    </div>
                    <Badge className={cn('ml-2', badge.color)} variant="outline">
                      {contract.daysUntilExpiry}d
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3" />
                      <span>{contract.contractType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Expires: {contract.endDate}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-3"
                    variant="outline"
                  >
                    Take Action
                  </Button>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

interface OrgNodeProps {
  node: OrgNode;
  level: number;
}

function OrgNodeComponent({ node, level }: OrgNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <Card
        className={cn(
          'p-4 min-w-[240px] cursor-pointer hover:shadow-lg transition-all border-2',
          level === 0
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600'
            : level === 1
              ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300'
              : 'bg-white border-gray-200'
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={cn(
                level === 0
                  ? 'bg-blue-500 text-white'
                  : level === 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-blue-100 text-blue-600'
              )}
            >
              {node.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                'font-semibold truncate',
                level === 0 ? 'text-white' : 'text-gray-900'
              )}
            >
              {node.name}
            </h4>
            <p
              className={cn(
                'text-sm truncate',
                level === 0 ? 'text-blue-100' : 'text-gray-600'
              )}
            >
              {node.position}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  level === 0
                    ? 'border-white/30 text-white'
                    : 'border-gray-300 text-gray-600'
                )}
              >
                <Building2 className="h-3 w-3 mr-1" />
                {node.department}
              </Badge>
              {node.memberCount && (
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs',
                    level === 0
                      ? 'border-white/30 text-white'
                      : 'border-gray-300 text-gray-600'
                  )}
                >
                  <Users className="h-3 w-3 mr-1" />
                  {node.memberCount}
                </Badge>
              )}
            </div>
          </div>
          {hasChildren && (
            <div>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2" />
          </div>
          <div className="flex gap-8 mt-8">
            {node.children!.map((child, index) => (
              <div key={child.id} className="relative">
                {/* Horizontal line */}
                {index < node.children!.length && (
                  <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2" />
                )}
                <OrgNodeComponent node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgChart({ data }: { data: OrgNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Organization Chart</h2>
          <p className="text-sm text-gray-500 mt-1">
            Company hierarchy and department structure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Employee
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Chart
          </Button>
        </div>
      </div>

      <Card className="p-8 overflow-auto">
        <div className="inline-flex justify-center min-w-full">
          <OrgNodeComponent node={data} level={0} />
        </div>
      </Card>
    </div>
  );
}

export function CoreHR() {
  const [activeSection, setActiveSection] = useState<'profile' | 'contracts' | 'orgchart'>(
    'profile'
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Core HR Management</h1>
              <p className="text-sm text-gray-500">
                Secure employee data and contract administration
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={(v: any) => setActiveSection(v)}>
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              E-Profile
            </TabsTrigger>
            <TabsTrigger value="contracts">
              <FileText className="h-4 w-4 mr-2" />
              Contract Management
            </TabsTrigger>
            <TabsTrigger value="orgchart">
              <Building2 className="h-4 w-4 mr-2" />
              Organization Chart
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeSection === 'profile' && <EProfileView employee={sampleEmployee} />}
        {activeSection === 'contracts' && <ContractManagement contracts={contracts} />}
        {activeSection === 'orgchart' && <OrgChart data={orgChart} />}
      </div>
    </div>
  );
}
