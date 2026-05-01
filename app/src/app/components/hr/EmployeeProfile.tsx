import { User, GraduationCap, CreditCard, Briefcase, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Employee } from '../../../mocks/hrMocks';

export function EmployeeProfile({ employee }: { employee: Employee }) {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                            <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                        </div>
                        <p className="text-gray-600">{employee.position} · {employee.department}</p>
                        <div className="flex gap-4 mt-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{employee.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{employee.phone}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{employee.location}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-white border mb-4">
                    <TabsTrigger value="personal"><User className="h-4 w-4 mr-2" />Personal</TabsTrigger>
                    <TabsTrigger value="education"><GraduationCap className="h-4 w-4 mr-2" />Education</TabsTrigger>
                    <TabsTrigger value="bank"><CreditCard className="h-4 w-4 mr-2" />Bank Details</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4 text-gray-900">Personal Details</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div><span className="text-gray-500">Employee ID:</span> {employee.employeeId}</div>
                            <div><span className="text-gray-500">Manager:</span> Michael Chen</div>
                            <div><span className="text-gray-500">Hire Date:</span> Jan 10, 2020</div>
                            <div><span className="text-gray-500">Birthday:</span> Mar 15, 1990</div>
                        </div>
                    </Card>
                </TabsContent>
                {/* ... (Tương tự cho các Tab khác) */}
            </Tabs>
        </div>
    );
}