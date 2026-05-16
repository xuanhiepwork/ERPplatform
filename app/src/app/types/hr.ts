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
