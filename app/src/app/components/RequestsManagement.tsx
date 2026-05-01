import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Download,
  Filter,
} from 'lucide-react';
import { cn } from './ui/utils';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
type RequestType = 'Leave' | 'Overtime' | 'Expense' | 'Business Trip';

interface Request {
  id: string;
  type: RequestType;
  dateSubmitted: string;
  status: RequestStatus;
  employeeName: string;
  details: string;
  amount?: string;
}

export function RequestsManagement() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Mock data with realistic information
  const allRequests: Request[] = [
    {
      id: 'REQ-1047',
      type: 'Leave',
      dateSubmitted: '2026-04-08',
      status: 'Pending',
      employeeName: 'Sarah Chen',
      details: 'Annual Leave - Apr 15-19 (5 days)',
    },
    {
      id: 'REQ-1046',
      type: 'Expense',
      dateSubmitted: '2026-04-07',
      status: 'Approved',
      employeeName: 'Michael Torres',
      details: 'Client Dinner Expenses',
      amount: '$284.50',
    },
    {
      id: 'REQ-1045',
      type: 'Business Trip',
      dateSubmitted: '2026-04-06',
      status: 'Pending',
      employeeName: 'Emily Johnson',
      details: 'Conference - Seattle, WA',
      amount: '$1,450.00',
    },
    {
      id: 'REQ-1044',
      type: 'Overtime',
      dateSubmitted: '2026-04-05',
      status: 'Approved',
      employeeName: 'David Martinez',
      details: 'Weekend Project Work - 8 hours',
    },
    {
      id: 'REQ-1043',
      type: 'Leave',
      dateSubmitted: '2026-04-04',
      status: 'Rejected',
      employeeName: 'Jessica Lee',
      details: 'Sick Leave - Apr 10-11 (2 days)',
    },
    {
      id: 'REQ-1042',
      type: 'Expense',
      dateSubmitted: '2026-04-03',
      status: 'Approved',
      employeeName: 'Robert Kim',
      details: 'Office Supplies',
      amount: '$127.80',
    },
    {
      id: 'REQ-1041',
      type: 'Overtime',
      dateSubmitted: '2026-04-02',
      status: 'Pending',
      employeeName: 'Amanda Wilson',
      details: 'Late Night Support - 4 hours',
    },
    {
      id: 'REQ-1040',
      type: 'Leave',
      dateSubmitted: '2026-04-01',
      status: 'Approved',
      employeeName: 'Christopher Brown',
      details: 'Personal Leave - Apr 12 (1 day)',
    },
    {
      id: 'REQ-1039',
      type: 'Business Trip',
      dateSubmitted: '2026-03-31',
      status: 'Approved',
      employeeName: 'Lisa Anderson',
      details: 'Client Meeting - Boston, MA',
      amount: '$890.00',
    },
    {
      id: 'REQ-1038',
      type: 'Expense',
      dateSubmitted: '2026-03-30',
      status: 'Pending',
      employeeName: 'James Taylor',
      details: 'Team Building Event',
      amount: '$456.25',
    },
  ];

  // Calculate statistics
  const totalRequests = allRequests.length;
  const pendingCount = allRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = allRequests.filter(r => r.status === 'Approved').length;
  const rejectedCount = allRequests.filter(r => r.status === 'Rejected').length;

  // Filter requests
  const filteredRequests = allRequests.filter(request => {
    if (filterType !== 'all' && request.type !== filterType) return false;
    if (filterStatus !== 'all' && request.status !== filterStatus) return false;
    if (dateFrom && request.dateSubmitted < dateFrom) return false;
    if (dateTo && request.dateSubmitted > dateTo) return false;
    return true;
  });

  const getStatusBadge = (status: RequestStatus) => {
    const variants = {
      Pending: 'bg-orange-100 text-orange-700 border-orange-200',
      Approved: 'bg-green-100 text-green-700 border-green-200',
      Rejected: 'bg-red-100 text-red-700 border-red-200',
    };

    const icons = {
      Pending: <Clock className="h-3 w-3" />,
      Approved: <CheckCircle2 className="h-3 w-3" />,
      Rejected: <XCircle className="h-3 w-3" />,
    };

    return (
      <Badge variant="outline" className={cn('gap-1.5', variants[status])}>
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const getTypeIcon = (type: RequestType) => {
    switch (type) {
      case 'Leave':
        return '🏖️';
      case 'Overtime':
        return '⏰';
      case 'Expense':
        return '💰';
      case 'Business Trip':
        return '✈️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">E-Requests Management</h1>
          <p className="text-muted-foreground">
            Manage and track all employee requests in one place
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                <h3>{totalRequests}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <h3>{pendingCount}</h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <h3>{approvedCount}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                <h3>{rejectedCount}</h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtering Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-base">Filters</h3>
            </div>

            <div className="space-y-4">
              {/* Request Type Filter */}
              <div className="space-y-2">
                <Label>Request Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Leave">Leave</SelectItem>
                    <SelectItem value="Overtime">Overtime</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Business Trip">Business Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label>Date From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Date To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setFilterType('all');
                  setFilterStatus('all');
                  setDateFrom('');
                  setDateTo('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base">Requests List</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing {filteredRequests.length} of {totalRequests} requests
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Request ID</TableHead>
                      <TableHead className="font-semibold">Request Type</TableHead>
                      <TableHead className="font-semibold">Employee</TableHead>
                      <TableHead className="font-semibold">Details</TableHead>
                      <TableHead className="font-semibold">Date Submitted</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No requests found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getTypeIcon(request.type)}</span>
                              <span>{request.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{request.employeeName}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{request.details}</p>
                              {request.amount && (
                                <p className="text-sm font-medium text-blue-600 mt-1">
                                  {request.amount}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(request.dateSubmitted).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
