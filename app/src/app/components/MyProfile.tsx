import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { PasswordPromptModal } from './PasswordPromptModal';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Save,
  Lock,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { cn } from './ui/utils';

export function MyProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState('');

  // Profile data
  const employeeData = {
    name: 'Jane Anderson',
    jobTitle: 'Senior Product Manager',
    department: 'Product Development',
    employeeId: 'EMP-2847',
    email: 'jane.anderson@company.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2022',
  };

  // Attendance data for calendar
  const attendanceData = {
    '2026-04-01': { status: 'present', clockIn: '09:02 AM', clockOut: '05:45 PM' },
    '2026-04-02': { status: 'present', clockIn: '08:58 AM', clockOut: '05:30 PM' },
    '2026-04-03': { status: 'present', clockIn: '09:15 AM', clockOut: '06:00 PM' },
    '2026-04-04': { status: 'present', clockIn: '09:00 AM', clockOut: '05:35 PM' },
    '2026-04-07': { status: 'present', clockIn: '09:05 AM', clockOut: '05:40 PM' },
    '2026-04-08': { status: 'present', clockIn: '08:55 AM', clockOut: '05:50 PM' },
    '2026-04-09': { status: 'present', clockIn: '09:10 AM', clockOut: '-- --' },
    '2026-04-05': { status: 'weekend' },
    '2026-04-06': { status: 'weekend' },
    '2026-03-28': { status: 'leave' },
    '2026-03-29': { status: 'leave' },
  };

  // Payslips data
  const payslips = [
    { month: 'March 2026', amount: '$8,500.00', date: '2026-03-31', status: 'Processed' },
    { month: 'February 2026', amount: '$8,500.00', date: '2026-02-28', status: 'Processed' },
    { month: 'January 2026', amount: '$8,500.00', date: '2026-01-31', status: 'Processed' },
    { month: 'December 2025', amount: '$9,200.00', date: '2025-12-31', status: 'Processed' },
    { month: 'November 2025', amount: '$8,500.00', date: '2025-11-30', status: 'Processed' },
    { month: 'October 2025', amount: '$8,500.00', date: '2025-10-31', status: 'Processed' },
  ];

  const getAttendanceForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData[dateStr as keyof typeof attendanceData];
  };

  const getRecentAttendance = () => {
    return Object.entries(attendanceData)
      .filter(([_, data]) => data.status === 'present')
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 10)
      .map(([date, data]) => ({ date, ...data }));
  };

  const handleViewPayslip = (month: string) => {
    setSelectedPayslip(month);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    // In a real app, this would open the PDF or show detailed payslip
    alert(`Viewing payslip for ${selectedPayslip}`);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>

            {/* Employee Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="mb-0">{employeeData.name}</h1>
                <Badge variant="outline" className="w-fit mx-auto md:mx-0">
                  {employeeData.employeeId}
                </Badge>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg">{employeeData.jobTitle}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{employeeData.department}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{employeeData.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{employeeData.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex md:flex-col gap-4 md:gap-2 text-center">
              <div className="px-4 py-2 bg-blue-50 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">4.2</p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
              <div className="px-4 py-2 bg-green-50 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">95%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={employeeData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue={employeeData.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      defaultValue="Robert Anderson"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    defaultValue="1234 Market Street, Apt 567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue="94102" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
              <CardDescription>
                Your salary payment information (encrypted and secure)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      defaultValue="Wells Fargo Bank"
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Input
                      id="accountType"
                      defaultValue="Checking"
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      type="password"
                      defaultValue="1234567890"
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routing">Routing Number</Label>
                    <Input
                      id="routing"
                      type="password"
                      defaultValue="987654321"
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                  <Lock className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800">
                    Bank details are encrypted and only visible to authorized personnel
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Attendance History Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
                <CardDescription>View your attendance record</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    present: (date) => getAttendanceForDate(date)?.status === 'present',
                    leave: (date) => getAttendanceForDate(date)?.status === 'leave',
                    weekend: (date) => getAttendanceForDate(date)?.status === 'weekend',
                  }}
                  modifiersClassNames={{
                    present: 'bg-green-100 text-green-900 hover:bg-green-200',
                    leave: 'bg-orange-100 text-orange-900 hover:bg-orange-200',
                    weekend: 'bg-gray-100 text-gray-500',
                  }}
                />

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium mb-2">Legend:</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span>Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400" />
                      <span>Weekend</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clock In/Out Log</CardTitle>
                <CardDescription>Recent attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getRecentAttendance().map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              In: {record.clockIn}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Out: {record.clockOut}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Present
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payslips Tab */}
        <TabsContent value="payslips" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Payslips</CardTitle>
                  <CardDescription>
                    Your salary statements are encrypted and password-protected
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure Access</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Period</TableHead>
                      <TableHead className="font-semibold">Net Salary</TableHead>
                      <TableHead className="font-semibold">Date Processed</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payslips.map((payslip, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{payslip.month}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {payslip.amount}
                        </TableCell>
                        <TableCell>
                          {new Date(payslip.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {payslip.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleViewPayslip(payslip.month)}
                            >
                              <Lock className="h-3.5 w-3.5" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleViewPayslip(payslip.month)}
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">
                      Secure Payslip Access
                    </p>
                    <p className="text-blue-800">
                      All payslips are encrypted and require password authentication. 
                      Click "View" to access your payslip details. Keep your password secure 
                      and do not share it with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Password Prompt Modal */}
      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
        documentName={selectedPayslip}
      />
    </div>
  );
}
