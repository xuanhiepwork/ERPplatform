import { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Star,
  Play,
  CheckCircle2,
  Target,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  Trophy,
  Medal,
  FileText,
  Video,
  Headphones,
  FileCheck,
  AlertCircle,
  ChevronRight,
  UserCheck,
  Briefcase,
  Sparkles,
  TrendingDown,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Building2,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  capacity: number;
  startDate: string;
  format: 'online' | 'in-person' | 'hybrid';
  description: string;
  skills: string[];
  status: 'available' | 'full' | 'upcoming';
  cost: number;
}

interface LearningPath {
  id: string;
  courseTitle: string;
  category: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  completedDate?: string;
  dueDate: string;
  hoursSpent: number;
  totalHours: number;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl: string;
  type: 'completion' | 'achievement' | 'certification';
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic';
}

const courses: Course[] = [
  {
    id: 'c-001',
    title: 'Leadership Fundamentals',
    category: 'Leadership',
    instructor: 'Dr. Sarah Mitchell',
    duration: '4 weeks',
    level: 'intermediate',
    enrolled: 24,
    capacity: 30,
    startDate: 'May 01, 2026',
    format: 'hybrid',
    description: 'Develop core leadership skills including team management, decision-making, and strategic thinking.',
    skills: ['Team Management', 'Strategic Thinking', 'Communication'],
    status: 'available',
    cost: 1200,
  },
  {
    id: 'c-002',
    title: 'Data Analytics with Python',
    category: 'Technical',
    instructor: 'Michael Chen',
    duration: '6 weeks',
    level: 'intermediate',
    enrolled: 18,
    capacity: 25,
    startDate: 'Apr 28, 2026',
    format: 'online',
    description: 'Master data analysis techniques using Python, pandas, and visualization libraries.',
    skills: ['Python', 'Data Analysis', 'Visualization'],
    status: 'available',
    cost: 1500,
  },
  {
    id: 'c-003',
    title: 'Effective Communication Skills',
    category: 'Soft Skills',
    instructor: 'Emily Rodriguez',
    duration: '3 weeks',
    level: 'beginner',
    enrolled: 30,
    capacity: 30,
    startDate: 'Apr 25, 2026',
    format: 'in-person',
    description: 'Enhance your verbal and written communication skills for workplace success.',
    skills: ['Communication', 'Presentation', 'Writing'],
    status: 'full',
    cost: 800,
  },
  {
    id: 'c-004',
    title: 'Project Management Professional',
    category: 'Management',
    instructor: 'David Park',
    duration: '8 weeks',
    level: 'advanced',
    enrolled: 15,
    capacity: 20,
    startDate: 'May 15, 2026',
    format: 'hybrid',
    description: 'Comprehensive PMP certification preparation with real-world project scenarios.',
    skills: ['Project Management', 'Agile', 'Risk Management'],
    status: 'available',
    cost: 2000,
  },
  {
    id: 'c-005',
    title: 'Design Thinking Workshop',
    category: 'Innovation',
    instructor: 'Jessica Lin',
    duration: '2 weeks',
    level: 'beginner',
    enrolled: 22,
    capacity: 25,
    startDate: 'Apr 30, 2026',
    format: 'in-person',
    description: 'Learn human-centered design methodologies to solve complex business problems.',
    skills: ['Design Thinking', 'Innovation', 'Problem Solving'],
    status: 'available',
    cost: 900,
  },
  {
    id: 'c-006',
    title: 'Advanced Excel & Financial Modeling',
    category: 'Technical',
    instructor: 'Alex Thompson',
    duration: '5 weeks',
    level: 'advanced',
    enrolled: 12,
    capacity: 20,
    startDate: 'May 08, 2026',
    format: 'online',
    description: 'Master advanced Excel functions, VBA, and financial modeling techniques.',
    skills: ['Excel', 'Financial Modeling', 'VBA'],
    status: 'available',
    cost: 1300,
  },
];

const learningPaths: LearningPath[] = [
  {
    id: 'lp-001',
    courseTitle: 'Leadership Fundamentals',
    category: 'Leadership',
    progress: 75,
    status: 'in-progress',
    dueDate: 'May 28, 2026',
    hoursSpent: 18,
    totalHours: 24,
  },
  {
    id: 'lp-002',
    courseTitle: 'Effective Communication Skills',
    category: 'Soft Skills',
    progress: 100,
    status: 'completed',
    completedDate: 'Apr 15, 2026',
    dueDate: 'Apr 15, 2026',
    hoursSpent: 15,
    totalHours: 15,
  },
  {
    id: 'lp-003',
    courseTitle: 'Data Analytics with Python',
    category: 'Technical',
    progress: 45,
    status: 'in-progress',
    dueDate: 'Jun 10, 2026',
    hoursSpent: 14,
    totalHours: 30,
  },
  {
    id: 'lp-004',
    courseTitle: 'Design Thinking Workshop',
    category: 'Innovation',
    progress: 0,
    status: 'not-started',
    dueDate: 'May 20, 2026',
    hoursSpent: 0,
    totalHours: 12,
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert-001',
    name: 'Effective Communication Skills',
    issuer: 'Enterprise Learning Academy',
    issueDate: 'Apr 15, 2026',
    certificateUrl: '#',
    type: 'completion',
  },
  {
    id: 'cert-002',
    name: 'Agile Scrum Master',
    issuer: 'Scrum Alliance',
    issueDate: 'Mar 10, 2026',
    expiryDate: 'Mar 10, 2028',
    certificateUrl: '#',
    type: 'certification',
  },
  {
    id: 'cert-003',
    name: 'Customer Service Excellence',
    issuer: 'Enterprise Learning Academy',
    issueDate: 'Feb 20, 2026',
    certificateUrl: '#',
    type: 'achievement',
  },
];

const badges: BadgeData[] = [
  {
    id: 'b-001',
    name: 'Fast Learner',
    description: 'Completed 3 courses in one month',
    earnedDate: 'Apr 15, 2026',
    icon: '⚡',
    rarity: 'rare',
  },
  {
    id: 'b-002',
    name: 'Course Completer',
    description: 'Finished your first training course',
    earnedDate: 'Feb 20, 2026',
    icon: '🎓',
    rarity: 'common',
  },
  {
    id: 'b-003',
    name: 'Perfect Attendance',
    description: '100% attendance in live sessions',
    earnedDate: 'Apr 15, 2026',
    icon: '✨',
    rarity: 'epic',
  },
  {
    id: 'b-004',
    name: 'Knowledge Sharer',
    description: 'Mentored 5 colleagues',
    earnedDate: 'Mar 30, 2026',
    icon: '🤝',
    rarity: 'rare',
  },
];

function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelBadge = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-300">Advanced</Badge>;
    }
  };

  const getFormatIcon = (format: Course['format']) => {
    switch (format) {
      case 'online':
        return <Video className="h-4 w-4" />;
      case 'in-person':
        return <Users className="h-4 w-4" />;
      case 'hybrid':
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Catalog</h2>
        <p className="text-sm text-gray-500">Browse and enroll in training programs</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses or instructors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Leadership">Leadership</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="Soft Skills">Soft Skills</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
            <SelectItem value="Innovation">Innovation</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <div className="p-6 flex-1">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300">
                  {course.category}
                </Badge>
                {getLevelBadge(course.level)}
              </div>

              {/* Course Title */}
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>

              {/* Course Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">{course.instructor}</span>
              </div>

              {/* Course Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Starts {course.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {getFormatIcon(course.format)}
                  <span className="capitalize">{course.format}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {course.enrolled}/{course.capacity} enrolled
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-900">${course.cost}</span>
                <span className="text-xs text-gray-500">per course</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              {course.status === 'full' ? (
                <Button className="w-full" variant="outline" disabled>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Course Full
                </Button>
              ) : (
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Play className="h-4 w-4 mr-2" />
                  Enroll Now
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TrainingRoadmap() {
  const totalCourses = learningPaths.length;
  const completedCourses = learningPaths.filter((lp) => lp.status === 'completed').length;
  const inProgressCourses = learningPaths.filter((lp) => lp.status === 'in-progress').length;
  const totalHours = learningPaths.reduce((sum, lp) => sum + lp.hoursSpent, 0);
  const overallProgress = Math.round(
    (learningPaths.reduce((sum, lp) => sum + lp.progress, 0) / learningPaths.length)
  );

  const getStatusBadge = (status: LearningPath['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'not-started':
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
            <Target className="h-3 w-3 mr-1" />
            Not Started
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Learning Roadmap</h2>
        <p className="text-sm text-gray-500">Track your learning progress and achievements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-indigo-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-xl font-bold text-gray-900">{totalCourses}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-gray-900">{completedCourses}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-bold text-gray-900">{inProgressCourses}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hours Spent</p>
              <p className="text-xl font-bold text-gray-900">{totalHours}h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Overall Learning Progress</h3>
            <p className="text-sm text-gray-600">Keep up the great work!</p>
          </div>
          <div className="text-3xl font-bold text-indigo-600">{overallProgress}%</div>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </Card>

      {/* Learning Path List */}
      <div className="space-y-4">
        {learningPaths.map((path) => (
          <Card key={path.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{path.courseTitle}</h3>
                  {getStatusBadge(path.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {path.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {path.hoursSpent}/{path.totalHours} hours
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {path.dueDate}
                  </span>
                </div>
              </div>
              {path.status === 'completed' && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Completed {path.completedDate}
                  </span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>

            {/* Actions */}
            {path.status !== 'completed' && (
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={path.status === 'not-started'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {path.status === 'not-started' ? 'Not Started' : 'Continue Learning'}
                </Button>
                {path.status === 'not-started' && (
                  <Button size="sm" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Start Course
                  </Button>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function CertificatesBadges() {
  const getBadgeRarityColor = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 border-gray-300';
      case 'rare':
        return 'bg-blue-100 border-blue-300';
      case 'epic':
        return 'bg-purple-100 border-purple-300';
    }
  };

  const getCertTypeIcon = (type: Certificate['type']) => {
    switch (type) {
      case 'completion':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'certification':
        return <Award className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Certifications & Achievements
        </h2>
        <p className="text-sm text-gray-500">
          Your earned certificates and badges
        </p>
      </div>

      {/* Earned Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Earned Badges
          </h3>
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            {badges.length} Total
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <Card
              key={badge.id}
              className={cn(
                'p-6 text-center border-2 hover:shadow-lg transition-all',
                getBadgeRarityColor(badge.rarity)
              )}
            >
              <div className="text-5xl mb-3">{badge.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {badge.rarity}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">Earned: {badge.earnedDate}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificates Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" />
            Certificates
          </h3>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Certificate
          </Button>
        </div>

        <div className="space-y-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    {getCertTypeIcon(cert.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">Issued by {cert.issuer}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Issued: {cert.issueDate}
                      </span>
                      {cert.expiryDate && (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Expires: {cert.expiryDate}
                        </span>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {cert.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagementDashboard() {
  const totalBudget = 125000;
  const spentBudget = 78500;
  const budgetUtilization = Math.round((spentBudget / totalBudget) * 100);
  const remainingBudget = totalBudget - spentBudget;

  const attendanceData = [
    {
      courseTitle: 'Leadership Fundamentals',
      instructor: 'Dr. Sarah Mitchell',
      enrolled: 24,
      attended: 22,
      completed: 18,
      avgRating: 4.7,
      completionRate: 75,
    },
    {
      courseTitle: 'Data Analytics with Python',
      instructor: 'Michael Chen',
      enrolled: 18,
      attended: 17,
      completed: 8,
      avgRating: 4.8,
      completionRate: 44,
    },
    {
      courseTitle: 'Effective Communication Skills',
      instructor: 'Emily Rodriguez',
      enrolled: 30,
      attended: 30,
      completed: 30,
      avgRating: 4.9,
      completionRate: 100,
    },
    {
      courseTitle: 'Project Management Professional',
      instructor: 'David Park',
      enrolled: 15,
      attended: 15,
      completed: 5,
      avgRating: 4.6,
      completionRate: 33,
    },
  ];

  const departmentBudgets = [
    { department: 'Engineering', allocated: 45000, spent: 32000, employees: 45 },
    { department: 'Sales & Marketing', allocated: 35000, spent: 28000, employees: 32 },
    { department: 'Operations', allocated: 25000, spent: 12500, employees: 28 },
    { department: 'Finance', allocated: 20000, spent: 6000, employees: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            L&D Management Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Training budgets and attendance analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-xl font-bold text-gray-900">
                ${totalBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Spent</p>
              <p className="text-xl font-bold text-gray-900">
                ${spentBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="text-xl font-bold text-gray-900">
                ${remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Utilization</p>
              <p className="text-xl font-bold text-gray-900">{budgetUtilization}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Budget Utilization Progress */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Budget Utilization</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              ${spentBudget.toLocaleString()} of ${totalBudget.toLocaleString()}
            </span>
            <span className="font-semibold text-gray-900">{budgetUtilization}%</span>
          </div>
          <Progress value={budgetUtilization} className="h-3" />
        </div>
        <p className="text-xs text-gray-500">
          Budget tracking for current fiscal year
        </p>
      </Card>

      {/* Department Budgets */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-indigo-600" />
          Department Training Budgets
        </h3>
        <div className="space-y-4">
          {departmentBudgets.map((dept, idx) => {
            const utilization = Math.round((dept.spent / dept.allocated) * 100);
            const perEmployee = Math.round(dept.spent / dept.employees);
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{dept.department}</p>
                    <p className="text-xs text-gray-500">
                      {dept.employees} employees · ${perEmployee}/employee
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${dept.spent.toLocaleString()} / ${dept.allocated.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{utilization}% utilized</p>
                  </div>
                </div>
                <Progress value={utilization} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Attendance & Completion Tracking */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-indigo-600" />
          Attendance & Completion Logs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Course Title
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Instructor
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Enrolled
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Attended
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Completed
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Completion %
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Avg Rating
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((course, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900 text-sm">{course.courseTitle}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{course.instructor}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="outline" className="font-mono">
                      {course.enrolled}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 font-mono">
                      {course.attended}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 font-mono">
                      {course.completed}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Progress value={course.completionRate} className="h-2 w-16" />
                      <span className="text-sm font-semibold text-gray-900">
                        {course.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        {course.avgRating}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Feedback
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function LearningDevelopment() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'roadmap' | 'certificates' | 'management'>('catalog');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Learning & Development
              </h1>
              <p className="text-sm text-gray-500">
                Empower your growth with training and skill development
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="catalog">
              <BookOpen className="h-4 w-4 mr-2" />
              Course Catalog
            </TabsTrigger>
            <TabsTrigger value="roadmap">
              <Target className="h-4 w-4 mr-2" />
              My Learning Roadmap
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <Award className="h-4 w-4 mr-2" />
              Certificates & Badges
            </TabsTrigger>
            <TabsTrigger value="management">
              <BarChart3 className="h-4 w-4 mr-2" />
              Management Dashboard
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'catalog' && <CourseCatalog />}
        {activeTab === 'roadmap' && <TrainingRoadmap />}
        {activeTab === 'certificates' && <CertificatesBadges />}
        {activeTab === 'management' && <ManagementDashboard />}
      </div>
    </div>
  );
}