import { useState, useMemo } from 'react';
import { Search, Mail, MessageCircle, MapPin, Phone, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Employee {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  avatar: string;
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Product Manager',
    department: 'Product',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    skills: ['Product Strategy', 'Figma', 'Roadmapping', 'UX'],
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Lead Software Engineer',
    department: 'Engineering',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Chief Financial Officer',
    department: 'Finance',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    skills: ['Accounting', 'Financial Planning', 'Budget Management', 'Excel'],
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 4,
    name: 'David Martinez',
    title: 'UX Designer',
    department: 'Design',
    email: 'david.martinez@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    id: 5,
    name: 'Jessica Wang',
    title: 'HR Director',
    department: 'Human Resources',
    email: 'jessica.wang@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA',
    skills: ['Talent Acquisition', 'Employee Relations', 'Performance Management'],
    avatar: 'https://i.pravatar.cc/150?img=20'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    title: 'DevOps Engineer',
    department: 'Engineering',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    avatar: 'https://i.pravatar.cc/150?img=14'
  },
  {
    id: 7,
    name: 'Amanda Foster',
    title: 'Marketing Manager',
    department: 'Marketing',
    email: 'amanda.foster@company.com',
    phone: '+1 (555) 890-1234',
    location: 'Los Angeles, CA',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Social Media'],
    avatar: 'https://i.pravatar.cc/150?img=27'
  },
  {
    id: 8,
    name: 'James Wilson',
    title: 'Sales Director',
    department: 'Sales',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 901-2345',
    location: 'Boston, MA',
    skills: ['Enterprise Sales', 'Negotiations', 'CRM', 'Account Management'],
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
  {
    id: 9,
    name: 'Olivia Brown',
    title: 'Senior Accountant',
    department: 'Finance',
    email: 'olivia.brown@company.com',
    phone: '+1 (555) 012-3456',
    location: 'Chicago, IL',
    skills: ['Accounting', 'QuickBooks', 'Tax Compliance', 'Financial Reporting'],
    avatar: 'https://i.pravatar.cc/150?img=24'
  },
  {
    id: 10,
    name: 'Daniel Kim',
    title: 'Product Designer',
    department: 'Design',
    email: 'daniel.kim@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    skills: ['Figma', 'UI Design', 'Animation', 'Design Systems'],
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: 11,
    name: 'Sophia Patel',
    title: 'Data Analyst',
    department: 'Analytics',
    email: 'sophia.patel@company.com',
    phone: '+1 (555) 234-5670',
    location: 'New York, NY',
    skills: ['SQL', 'Python', 'Tableau', 'Data Visualization', 'Statistics'],
    avatar: 'https://i.pravatar.cc/150?img=45'
  },
  {
    id: 12,
    name: 'Christopher Lee',
    title: 'Backend Engineer',
    department: 'Engineering',
    email: 'christopher.lee@company.com',
    phone: '+1 (555) 345-6701',
    location: 'Seattle, WA',
    skills: ['Java', 'Python', 'PostgreSQL', 'Microservices', 'API Design'],
    avatar: 'https://i.pravatar.cc/150?img=52'
  },
  {
    id: 13,
    name: 'Isabella Garcia',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    email: 'isabella.garcia@company.com',
    phone: '+1 (555) 456-7012',
    location: 'Miami, FL',
    skills: ['Customer Relations', 'Account Management', 'Salesforce', 'Training'],
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 14,
    name: 'Matthew Thompson',
    title: 'Security Engineer',
    department: 'Engineering',
    email: 'matthew.thompson@company.com',
    phone: '+1 (555) 567-8012',
    location: 'Austin, TX',
    skills: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Compliance'],
    avatar: 'https://i.pravatar.cc/150?img=56'
  },
  {
    id: 15,
    name: 'Ava Martinez',
    title: 'Content Writer',
    department: 'Marketing',
    email: 'ava.martinez@company.com',
    phone: '+1 (555) 678-9023',
    location: 'Portland, OR',
    skills: ['Copywriting', 'Content Marketing', 'SEO', 'Storytelling'],
    avatar: 'https://i.pravatar.cc/150?img=48'
  },
  {
    id: 16,
    name: 'Ethan Anderson',
    title: 'QA Engineer',
    department: 'Engineering',
    email: 'ethan.anderson@company.com',
    phone: '+1 (555) 789-0134',
    location: 'Denver, CO',
    skills: ['Test Automation', 'Selenium', 'JIRA', 'Agile'],
    avatar: 'https://i.pravatar.cc/150?img=60'
  }
];

const departments = ['All Departments', 'Engineering', 'Design', 'Product', 'Finance', 'Marketing', 'Sales', 'Human Resources', 'Analytics', 'Customer Success'];

export function CompanyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 'All Departments' ||
        employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, selectedDepartment]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Company Directory</h1>
        <p className="text-muted-foreground">
          Find colleagues by name, department, or specific skills
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, title, or skills (e.g., 'Figma', 'Accounting', 'React')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Department</label>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedDepartment === dept
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <span>
              {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
            </span>
            {(searchQuery || selectedDepartment !== 'All Departments') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('All Departments');
                }}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Employee Photo */}
                <div className="flex flex-col items-center text-center mb-4">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-20 h-20 rounded-full mb-3 border-2 border-border"
                  />
                  <h3 className="mb-1">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{employee.title}</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    {employee.department}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{employee.phone}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {employee.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-muted-foreground text-xs">
                        +{employee.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => window.open(`mailto:${employee.email}`)}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="mb-2">No employees found</h3>
              <p className="text-sm">
                Try adjusting your search or filters to find who you're looking for
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
