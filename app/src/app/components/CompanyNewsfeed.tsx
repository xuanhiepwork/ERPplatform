import { useState } from 'react';
import { NewsPost } from './NewsPost';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Calendar,
  MapPin,
  UserPlus,
  Mail,
  Filter,
  TrendingUp,
  Search,
} from 'lucide-react';

export function CompanyNewsfeed() {
  const [filterType, setFilterType] = useState('all');

  // Mock posts data
  const allPosts = [
    {
      id: 'POST-001',
      author: {
        name: 'HR Administration',
        role: 'Human Resources',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      },
      timestamp: '2026-04-10T08:30:00',
      content: `We are thrilled to announce Sarah Mitchell as our Employee of the Month for March 2026! 🎉

Sarah has demonstrated exceptional dedication to her role in the Product Development team, consistently going above and beyond to deliver outstanding results. Her innovative approach to problem-solving and collaborative spirit have made a significant impact on our recent project launches.

Join us in congratulating Sarah on this well-deserved recognition!`,
      type: 'spotlight' as const,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop',
      likes: 127,
      comments: 24,
      isPinned: true,
    },
    {
      id: 'POST-002',
      author: {
        name: 'Management Team',
        role: 'Executive Leadership',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Management',
      },
      timestamp: '2026-04-09T14:15:00',
      content: `📢 Important Policy Update: Remote Work Guidelines

Effective May 1st, 2026, we're introducing our enhanced Hybrid Work Policy to provide greater flexibility and work-life balance.

Key highlights:
• Employees can work remotely up to 3 days per week
• Core collaboration hours: 10 AM - 3 PM (your local timezone)
• Monthly team meetups required for all departments

Please review the complete policy document attached below. If you have any questions, reach out to your direct manager or HR.`,
      type: 'policy' as const,
      attachment: {
        name: 'Hybrid_Work_Policy_2026.pdf',
        type: 'PDF',
        size: '2.4 MB',
      },
      likes: 89,
      comments: 31,
      isPinned: true,
    },
    {
      id: 'POST-003',
      author: {
        name: 'Corporate Communications',
        role: 'Communications',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Comms',
      },
      timestamp: '2026-04-09T10:00:00',
      content: `🎊 Celebrating Our Q1 2026 Achievements!

Thanks to the incredible hard work and dedication of our entire team, we've achieved remarkable milestones this quarter:

✅ Revenue grew by 32% compared to Q1 2025
✅ Successfully launched 4 major product features
✅ Onboarded 45 talented new team members
✅ Customer satisfaction score reached 94%

This success belongs to each and every one of you. Let's keep this momentum going into Q2!`,
      type: 'announcement' as const,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      likes: 203,
      comments: 47,
    },
    {
      id: 'POST-004',
      author: {
        name: 'IT Department',
        role: 'Information Technology',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=IT',
      },
      timestamp: '2026-04-08T16:45:00',
      content: `⚠️ System Maintenance Notice

Our IT infrastructure will undergo scheduled maintenance this Saturday, April 12th, from 2:00 AM - 6:00 AM EST.

During this window:
• Email services will be temporarily unavailable
• VPN access may be intermittent
• Internal applications will be offline

We apologize for any inconvenience and appreciate your understanding as we work to improve our systems.`,
      type: 'announcement' as const,
      likes: 34,
      comments: 8,
    },
    {
      id: 'POST-005',
      author: {
        name: 'Learning & Development',
        role: 'HR - L&D',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Learning',
      },
      timestamp: '2026-04-07T11:20:00',
      content: `📚 New Training Programs Now Available!

We're excited to announce our Spring 2026 professional development courses:

1. Advanced Leadership Skills (6-week program)
2. Data Analytics Fundamentals
3. Effective Communication in Remote Teams
4. Project Management Certification Prep

All courses are available through our Learning Management System. Enroll today and invest in your career growth!`,
      type: 'announcement' as const,
      attachment: {
        name: 'Spring_2026_Course_Catalog.pdf',
        type: 'PDF',
        size: '1.8 MB',
      },
      likes: 76,
      comments: 19,
    },
    {
      id: 'POST-006',
      author: {
        name: 'Wellness Committee',
        role: 'Employee Wellness',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wellness',
      },
      timestamp: '2026-04-06T09:00:00',
      content: `🧘‍♀️ Wellness Wednesday: Mental Health Resources

Your wellbeing matters to us! Remember that our Employee Assistance Program offers:

• Free confidential counseling (up to 6 sessions)
• 24/7 mental health hotline
• Meditation and mindfulness apps
• Financial wellness coaching

Take care of yourself - you deserve it! 💙`,
      type: 'general' as const,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
      likes: 112,
      comments: 15,
    },
  ];

  // Filter posts
  const filteredPosts = filterType === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.type === filterType);

  // Upcoming events
  const upcomingEvents = [
    {
      id: 'EVT-1',
      title: 'All-Hands Town Hall Meeting',
      date: '2026-04-15',
      time: '2:00 PM EST',
      location: 'Virtual (Zoom)',
      attendees: 245,
    },
    {
      id: 'EVT-2',
      title: 'Team Building Workshop',
      date: '2026-04-18',
      time: '10:00 AM EST',
      location: 'Conference Room A',
      attendees: 32,
    },
    {
      id: 'EVT-3',
      title: 'Product Launch Celebration',
      date: '2026-04-22',
      time: '5:00 PM EST',
      location: 'Main Office',
      attendees: 156,
    },
    {
      id: 'EVT-4',
      title: 'Quarterly Business Review',
      date: '2026-04-25',
      time: '9:00 AM EST',
      location: 'Virtual (Teams)',
      attendees: 89,
    },
  ];

  // New hires
  const newHires = [
    {
      id: 'NH-1',
      name: 'Alexandra Rodriguez',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      startDate: '2026-04-08',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    {
      id: 'NH-2',
      name: 'Marcus Johnson',
      role: 'Product Manager',
      department: 'Product',
      startDate: '2026-04-08',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    {
      id: 'NH-3',
      name: 'Priya Patel',
      role: 'UX Designer',
      department: 'Design',
      startDate: '2026-04-01',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    },
    {
      id: 'NH-4',
      name: 'James Chen',
      role: 'Data Analyst',
      department: 'Analytics',
      startDate: '2026-04-01',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Company News</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest announcements and company updates
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search news and announcements..."
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                  <SelectItem value="policy">Policy Updates</SelectItem>
                  <SelectItem value="spotlight">Employee Spotlight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <NewsPost key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <p>No posts found matching your filter.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h4 className="text-sm mb-2">{event.title}</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-5 w-5 rounded-full bg-gray-300 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-xs">+{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* New Hires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserPlus className="h-5 w-5 text-green-600" />
              Welcome New Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {newHires.map((hire) => (
              <div
                key={hire.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={hire.avatar} />
                  <AvatarFallback>{hire.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm truncate">{hire.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {hire.role}
                  </p>
                  <p className="text-xs text-muted-foreground">{hire.department}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Started{' '}
                    {new Date(hire.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All New Hires
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Posts</span>
              <span className="text-xl font-semibold">{allPosts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Hires</span>
              <span className="text-xl font-semibold">{newHires.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Upcoming Events</span>
              <span className="text-xl font-semibold">{upcomingEvents.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
