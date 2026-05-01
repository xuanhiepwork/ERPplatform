import { useState } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  Users,
  Headphones,
  FileSpreadsheet,
  BookOpen,
  Shield,
  Briefcase,
  Globe,
  Clock,
  Star,
  TrendingUp,
  Home
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Article {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  views: number;
}

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children?: Category[];
  articles?: Article[];
}

const knowledgeBaseData: Category[] = [
  {
    id: 'hr-policies',
    name: 'HR Policies',
    icon: <Users className="h-4 w-4" />,
    children: [
      {
        id: 'leave-policy',
        name: 'Leave Policy',
        articles: [
          {
            id: 'annual-leave',
            title: 'Annual Leave Guidelines',
            content: `# Annual Leave Guidelines\n\n## Overview\nAll full-time employees are entitled to 20 days of paid annual leave per calendar year. Part-time employees receive a pro-rated amount based on their working hours.\n\n## Accrual\n- Leave accrues monthly at a rate of 1.67 days per month\n- Unused leave can be carried over up to a maximum of 5 days\n- Leave must be requested at least 2 weeks in advance for planned absences\n\n## Approval Process\n1. Submit leave request through the ESS portal\n2. Manager reviews and approves/denies within 48 hours\n3. HR is automatically notified of approved leave\n4. Calendar is updated to reflect your time off\n\n## Important Notes\n- Leave cannot be taken during the first 3 months of employment\n- Blackout periods may apply during critical business periods\n- Unused leave over 5 days will be paid out at year-end`,
            lastUpdated: 'Mar 15, 2026',
            views: 1243
          },
          {
            id: 'sick-leave',
            title: 'Sick Leave Policy',
            content: `# Sick Leave Policy\n\n## Entitlement\nEmployees receive 10 days of paid sick leave per year. Sick leave does not roll over to the following year.\n\n## Notification Requirements\n- Notify your manager as soon as possible on the first day of absence\n- Medical certificate required for absences exceeding 3 consecutive days\n- Submit sick leave request in ESS portal within 24 hours of return\n\n## Extended Illness\nFor illnesses extending beyond 10 days, employees may apply for short-term disability benefits through HR.`,
            lastUpdated: 'Feb 28, 2026',
            views: 856
          }
        ]
      },
      {
        id: 'benefits',
        name: 'Benefits & Compensation',
        articles: [
          {
            id: 'health-insurance',
            title: 'Health Insurance Coverage',
            content: `# Health Insurance Coverage\n\n## Plan Options\nWe offer three health insurance plans:\n\n### Gold Plan\n- Premium: $200/month (company pays 80%)\n- Deductible: $500\n- Out-of-pocket max: $3,000\n- Coverage: Medical, dental, vision\n\n### Silver Plan\n- Premium: $150/month (company pays 70%)\n- Deductible: $1,000\n- Out-of-pocket max: $5,000\n- Coverage: Medical, dental\n\n### Bronze Plan\n- Premium: $100/month (company pays 60%)\n- Deductible: $2,000\n- Out-of-pocket max: $7,000\n- Coverage: Medical only\n\n## Enrollment\nEnrollment periods occur during onboarding and annually in November.`,
            lastUpdated: 'Jan 10, 2026',
            views: 2104
          }
        ]
      }
    ]
  },
  {
    id: 'it-support',
    name: 'IT Support',
    icon: <Headphones className="h-4 w-4" />,
    children: [
      {
        id: 'software-access',
        name: 'Software & Access',
        articles: [
          {
            id: 'vpn-setup',
            title: 'VPN Setup Guide',
            content: `# VPN Setup Guide\n\n## Prerequisites\n- Corporate laptop with admin access\n- Employee ID and password\n- Two-factor authentication enabled\n\n## Installation Steps\n\n### Windows\n1. Download Cisco AnyConnect from the IT portal\n2. Run the installer with administrator privileges\n3. Enter VPN server address: vpn.company.com\n4. Log in with your corporate credentials\n5. Complete 2FA authentication\n\n### macOS\n1. Download Cisco AnyConnect from the IT portal\n2. Open the DMG file and drag to Applications\n3. Launch AnyConnect and enter server: vpn.company.com\n4. Authenticate with credentials and 2FA\n\n## Troubleshooting\n- Ensure your internet connection is stable\n- Verify 2FA app is working\n- Contact IT helpdesk at ext. 5555 for assistance`,
            lastUpdated: 'Apr 1, 2026',
            views: 3421
          }
        ]
      },
      {
        id: 'hardware',
        name: 'Hardware Support',
        articles: [
          {
            id: 'laptop-request',
            title: 'Requesting New Hardware',
            content: `# Requesting New Hardware\n\n## Eligibility\n- New employees automatically receive standard equipment\n- Equipment refresh occurs every 3 years\n- Special requests require manager approval\n\n## Standard Equipment\n- Laptop: Dell Latitude 7420 or MacBook Pro 14"\n- Monitor: 27" Dell UltraSharp (optional)\n- Accessories: Keyboard, mouse, headset\n\n## Request Process\n1. Submit ticket through IT Service Portal\n2. Select "Hardware Request" category\n3. Provide business justification\n4. Await manager and IT approval\n5. Equipment delivered within 5-7 business days`,
            lastUpdated: 'Mar 20, 2026',
            views: 645
          }
        ]
      }
    ]
  },
  {
    id: 'templates-forms',
    name: 'Templates & Forms',
    icon: <FileSpreadsheet className="h-4 w-4" />,
    children: [
      {
        id: 'hr-forms',
        name: 'HR Forms',
        articles: [
          {
            id: 'expense-form',
            title: 'Expense Report Template',
            content: `# Expense Report Template\n\n## Download\n[Download Expense Report Template.xlsx](#)\n\n## Instructions\n1. Fill out all required fields including date, description, amount\n2. Attach receipts for all expenses over $25\n3. Obtain manager signature\n4. Submit to finance@company.com\n\n## Reimbursement Timeline\nApproved expenses are reimbursed within 2 pay cycles.\n\n## Eligible Expenses\n- Travel (flights, hotels, car rentals)\n- Meals (with clients or during business travel)\n- Office supplies\n- Professional development\n- Client entertainment (pre-approved)`,
            lastUpdated: 'Feb 15, 2026',
            views: 1876
          }
        ]
      }
    ]
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    icon: <Home className="h-4 w-4" />,
    children: [
      {
        id: 'new-hire',
        name: 'New Hire Guide',
        articles: [
          {
            id: 'first-week',
            title: 'Your First Week',
            content: `# Your First Week\n\nWelcome to the team! Here's what to expect in your first week.\n\n## Day 1\n- 9:00 AM: Arrive and check in at reception\n- 9:30 AM: HR orientation and paperwork\n- 11:00 AM: IT setup (laptop, credentials, software)\n- 1:00 PM: Team lunch\n- 2:00 PM: Tour of office\n- 3:00 PM: Meet your manager and team\n\n## Day 2-3\n- Complete required training modules\n- Set up your workspace\n- Schedule 1:1s with team members\n- Review onboarding checklist\n\n## Day 4-5\n- Begin assigned onboarding project\n- Attend team meetings\n- Ask questions and get acclimated\n\n## Onboarding Checklist\n- [ ] Complete I-9 and tax forms\n- [ ] Enroll in benefits\n- [ ] Set up direct deposit\n- [ ] Complete security training\n- [ ] Read employee handbook\n- [ ] Schedule 30-day check-in with HR`,
            lastUpdated: 'Jan 5, 2026',
            views: 4532
          }
        ]
      }
    ]
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    icon: <Shield className="h-4 w-4" />,
    children: [
      {
        id: 'security-policies',
        name: 'Security Policies',
        articles: [
          {
            id: 'password-policy',
            title: 'Password Requirements',
            content: `# Password Requirements\n\n## Password Strength\nAll passwords must meet the following criteria:\n- Minimum 12 characters\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character (!@#$%^&*)\n\n## Password Management\n- Passwords must be changed every 90 days\n- Cannot reuse last 5 passwords\n- Use approved password manager (LastPass or 1Password)\n- Never share passwords via email or chat\n\n## Two-Factor Authentication\nRequired for all employees accessing:\n- Email\n- VPN\n- Cloud applications\n- Internal systems`,
            lastUpdated: 'Mar 1, 2026',
            views: 2341
          }
        ]
      }
    ]
  }
];

const popularCategories = [
  {
    id: 'onboarding',
    name: 'Onboarding',
    icon: <Home className="h-12 w-12" />,
    description: 'New hire guides and first-week resources',
    articles: 12,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'it-support',
    name: 'IT Support',
    icon: <Headphones className="h-12 w-12" />,
    description: 'Technical help, software access, and hardware',
    articles: 28,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'templates-forms',
    name: 'Templates & Forms',
    icon: <FileSpreadsheet className="h-12 w-12" />,
    description: 'Downloadable templates and required forms',
    articles: 35,
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 'hr-policies',
    name: 'HR Policies',
    icon: <Users className="h-12 w-12" />,
    description: 'Leave, benefits, and workplace policies',
    articles: 24,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    icon: <Shield className="h-12 w-12" />,
    description: 'Security protocols and compliance guidelines',
    articles: 16,
    color: 'bg-red-50 text-red-600'
  },
  {
    id: 'professional-dev',
    name: 'Professional Development',
    icon: <TrendingUp className="h-12 w-12" />,
    description: 'Training programs and career growth',
    articles: 19,
    color: 'bg-indigo-50 text-indigo-600'
  }
];

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['hr-policies']);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategoryTree = (categories: Category[], level: number = 0) => {
    return categories.map((category) => {
      const isExpanded = expandedCategories.includes(category.id);
      const hasChildren = category.children && category.children.length > 0;
      const hasArticles = category.articles && category.articles.length > 0;

      return (
        <div key={category.id}>
          <button
            onClick={() => hasChildren && toggleCategory(category.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded transition-colors ${
              level > 0 ? 'ml-4' : ''
            }`}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )
            ) : (
              <div className="w-4" />
            )}
            {category.icon}
            <span className="flex-1 text-left">{category.name}</span>
          </button>

          {isExpanded && hasChildren && (
            <div className="mt-1">
              {renderCategoryTree(category.children, level + 1)}
            </div>
          )}

          {isExpanded && hasArticles && (
            <div className="ml-8 mt-1 space-y-1">
              {category.articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                    selectedArticle?.id === article.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary text-muted-foreground'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span className="flex-1 text-left truncate">{article.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Search */}
      <div className="mb-6">
        <h1 className="mb-4">Knowledge Base</h1>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for guidelines, forms, policies, or IT help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Sidebar - Category Tree */}
        <div className="w-72 flex-shrink-0">
          <Card className="h-full">
            <CardContent className="p-4 h-full overflow-y-auto">
              <div className="mb-4">
                <h3 className="px-3 py-2">Categories</h3>
              </div>
              <nav className="space-y-1">
                {renderCategoryTree(knowledgeBaseData)}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {selectedArticle ? (
            /* Article Content */
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Updated {selectedArticle.lastUpdated}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {selectedArticle.views.toLocaleString()} views
                    </div>
                  </div>
                </div>

                {/* Article Content - Markdown-style rendering */}
                <div className="prose prose-sm max-w-none">
                  {selectedArticle.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="mb-4">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="mt-6 mb-3">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={index} className="mt-4 mb-2">{line.substring(4)}</h3>;
                    } else if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4 text-foreground">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line.startsWith('- [ ] ')) {
                      return (
                        <div key={index} className="flex items-center gap-2 ml-4 text-foreground">
                          <input type="checkbox" disabled />
                          <span>{line.substring(6)}</span>
                        </div>
                      );
                    } else if (line.trim() === '') {
                      return <div key={index} className="h-4" />;
                    } else if (line.match(/^\d+\./)) {
                      return <li key={index} className="ml-4 text-foreground">{line.substring(line.indexOf('.') + 2)}</li>;
                    } else {
                      return <p key={index} className="mb-3 text-foreground">{line}</p>;
                    }
                  })}
                </div>

                {/* Article Actions */}
                <div className="mt-8 pt-6 border-t border-border flex gap-3">
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Print Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Popular Categories Grid */
            <div>
              <div className="mb-6">
                <h2 className="mb-2">Popular Categories</h2>
                <p className="text-muted-foreground">
                  Browse our most visited knowledge base sections
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      if (!expandedCategories.includes(category.id)) {
                        setExpandedCategories(prev => [...prev, category.id]);
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        {category.articles} articles
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Links Section */}
              <div className="mt-8">
                <h3 className="mb-4">Quick Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">Employee Handbook</h4>
                        <p className="text-xs text-muted-foreground">Complete guide to company policies</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <Headphones className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">Contact IT Support</h4>
                        <p className="text-xs text-muted-foreground">Get help with technical issues</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
