export interface Employee {
    id: string;
    name: string;
    employeeId: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    hireDate: string;
    status: 'active' | 'inactive';
    manager: string;
    location: string;
    nationality: string;
    maritalStatus: string;
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    education: {
        degree: string;
        institution: string;
        year: string;
        field: string;
    }[];
    bankDetails: {
        accountName: string;
        bankName: string;
        accountNumber: string;
        routingNumber: string;
    };
    workHistory: {
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
}

export interface OrgNode {
    id: string;
    name: string;
    position: string;
    department: string;
    children?: OrgNode[];
    memberCount?: number;
}

export const sampleEmployee: Employee = {
    id: 'emp-001',
    name: 'Sarah Johnson',
    employeeId: 'EMP-2024-001',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 1990',
    hireDate: 'January 10, 2020',
    status: 'active',
    manager: 'Michael Chen',
    location: 'San Francisco, CA',
    nationality: 'United States',
    maritalStatus: 'Single',
    emergencyContact: {
        name: 'Robert Johnson',
        relationship: 'Father',
        phone: '+1 (555) 987-6543',
    },
    education: [
        {
            degree: 'Master of Science',
            institution: 'Stanford University',
            year: '2014',
            field: 'Computer Science',
        },
        {
            degree: 'Bachelor of Science',
            institution: 'UC Berkeley',
            year: '2012',
            field: 'Computer Engineering',
        },
    ],
    bankDetails: {
        accountName: 'Sarah Johnson',
        bankName: 'Chase Bank',
        accountNumber: '****1234',
        routingNumber: '****5678',
    },
    workHistory: [
        {
            company: 'Tech Innovations Inc.',
            position: 'Software Engineer',
            startDate: 'Jun 2018',
            endDate: 'Dec 2019',
            description: 'Developed scalable web applications using React and Node.js',
        },
        {
            company: 'Digital Solutions LLC',
            position: 'Junior Developer',
            startDate: 'Jan 2015',
            endDate: 'May 2018',
            description: 'Built responsive websites and maintained client databases',
        },
    ],
};

export const orgChartData: OrgNode = {
    id: 'ceo',
    name: 'John Smith',
    position: 'Chief Executive Officer',
    department: 'Executive',
    children: [
        {
            id: 'cto',
            name: 'Michael Chen',
            position: 'Chief Technology Officer',
            department: 'Engineering',
            memberCount: 12,
            children: [
                {
                    id: 'eng-lead',
                    name: 'Sarah Johnson',
                    position: 'Engineering Manager',
                    department: 'Engineering',
                    memberCount: 8,
                },
                {
                    id: 'qa-lead',
                    name: 'David Kim',
                    position: 'QA Lead',
                    department: 'Quality Assurance',
                    memberCount: 4,
                },
            ],
        },
        {
            id: 'cmo',
            name: 'Maria Garcia',
            position: 'Chief Marketing Officer',
            department: 'Marketing',
            memberCount: 8,
            children: [
                {
                    id: 'marketing-mgr',
                    name: 'Emily White',
                    position: 'Marketing Manager',
                    department: 'Marketing',
                    memberCount: 5,
                },
                {
                    id: 'content-lead',
                    name: 'James Brown',
                    position: 'Content Lead',
                    department: 'Content',
                    memberCount: 3,
                },
            ],
        },
        {
            id: 'cfo',
            name: 'Robert Davis',
            position: 'Chief Financial Officer',
            department: 'Finance',
            memberCount: 6,
            children: [
                {
                    id: 'accounting',
                    name: 'Lisa Anderson',
                    position: 'Accounting Manager',
                    department: 'Accounting',
                    memberCount: 4,
                },
            ],
        },
        {
            id: 'chro',
            name: 'Jessica Park',
            position: 'Chief HR Officer',
            department: 'Human Resources',
            memberCount: 5,
            children: [
                {
                    id: 'hr-ops',
                    name: 'Alex Thompson',
                    position: 'HR Operations Lead',
                    department: 'HR Operations',
                    memberCount: 3,
                },
            ],
        },
    ],
};