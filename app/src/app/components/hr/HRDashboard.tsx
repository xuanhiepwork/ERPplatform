import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, Building2, Shield, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Import Presenters
import { EmployeeProfile } from './EmployeeProfile';
import { OrgChart } from './OrgChart';

// Import Mocks & Services
import { sampleEmployee, orgChartData } from '../../../mocks/hrMocks';

export function HRDashboard() {
    const [activeTab, setActiveTab] = useState('profile');

    // React Query giả định (sau này nối API thật)
    const { data: employee } = useQuery({
        queryKey: ['hr-profile'],
        queryFn: () => Promise.resolve(sampleEmployee)
    });

    const { data: orgData } = useQuery({
        queryKey: ['hr-orgchart'],
        queryFn: () => Promise.resolve(orgChartData)
    });

    return (
        <div className="h-full flex flex-col space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-600" /> Core HR Management
                </h1>
                <p className="text-gray-500">Secure employee data and organization administration</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="bg-gray-100 p-1">
                    <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />E-Profile</TabsTrigger>
                    <TabsTrigger value="orgchart"><Building2 className="h-4 w-4 mr-2" />Org Chart</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="profile">
                        {employee && <EmployeeProfile employee={employee} />}
                    </TabsContent>

                    <TabsContent value="orgchart">
                        {orgData && <OrgChart data={orgData} />}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}