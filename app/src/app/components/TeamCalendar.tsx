import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users as UsersIcon, Video } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

type CalendarView = 'month' | 'week';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'birthday' | 'townhall' | 'sync' | 'deadline';
  location?: string;
  attendees?: string[];
  calendarId: string;
}

interface CalendarSource {
  id: string;
  name: string;
  type: 'user' | 'room' | 'team';
  color: string;
}

const calendarSources: CalendarSource[] = [
  { id: 'my-calendar', name: 'My Calendar', type: 'user', color: '#2563eb' },
  { id: 'marketing-team', name: 'Marketing Team', type: 'team', color: '#8b5cf6' },
  { id: 'engineering-team', name: 'Engineering Team', type: 'team', color: '#10b981' },
  { id: 'design-team', name: 'Design Team', type: 'team', color: '#f59e0b' },
  { id: 'meeting-room-a', name: 'Meeting Room A', type: 'room', color: '#06b6d4' },
  { id: 'meeting-room-b', name: 'Meeting Room B', type: 'room', color: '#ec4899' },
  { id: 'conference-hall', name: 'Conference Hall', type: 'room', color: '#ef4444' },
];

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Company Townhall',
    date: new Date(2026, 3, 15),
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    type: 'townhall',
    location: 'Conference Hall',
    attendees: ['All Employees'],
    calendarId: 'conference-hall'
  },
  {
    id: 2,
    title: 'Product Roadmap Sync',
    date: new Date(2026, 3, 15),
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    type: 'sync',
    location: 'Meeting Room A',
    attendees: ['Product Team', 'Engineering Team'],
    calendarId: 'meeting-room-a'
  },
  {
    id: 3,
    title: 'Michael Chen Birthday 🎂',
    date: new Date(2026, 3, 16),
    startTime: '3:00 PM',
    endTime: '4:00 PM',
    type: 'birthday',
    location: 'Kitchen Area',
    calendarId: 'my-calendar'
  },
  {
    id: 4,
    title: 'Marketing Strategy Review',
    date: new Date(2026, 3, 14),
    startTime: '9:00 AM',
    endTime: '10:30 AM',
    type: 'meeting',
    location: 'Meeting Room B',
    attendees: ['Marketing Team'],
    calendarId: 'marketing-team'
  },
  {
    id: 5,
    title: 'Design System Workshop',
    date: new Date(2026, 3, 17),
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    type: 'meeting',
    location: 'Meeting Room A',
    attendees: ['Design Team', 'Engineering Team'],
    calendarId: 'design-team'
  },
  {
    id: 6,
    title: 'Sprint Planning',
    date: new Date(2026, 3, 14),
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    type: 'meeting',
    location: 'Conference Hall',
    attendees: ['Engineering Team'],
    calendarId: 'engineering-team'
  },
  {
    id: 7,
    title: 'Client Demo',
    date: new Date(2026, 3, 18),
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    type: 'meeting',
    location: 'Virtual',
    attendees: ['Sales Team', 'Product Team'],
    calendarId: 'my-calendar'
  },
  {
    id: 8,
    title: 'Q2 Budget Review',
    date: new Date(2026, 3, 18),
    startTime: '3:00 PM',
    endTime: '4:30 PM',
    type: 'meeting',
    location: 'Meeting Room B',
    attendees: ['Finance Team', 'Department Heads'],
    calendarId: 'meeting-room-b'
  },
  {
    id: 9,
    title: 'Team Standup',
    date: new Date(2026, 3, 11),
    startTime: '9:30 AM',
    endTime: '10:00 AM',
    type: 'sync',
    location: 'Virtual',
    calendarId: 'engineering-team'
  },
  {
    id: 10,
    title: 'Sarah Johnson Birthday 🎉',
    date: new Date(2026, 3, 19),
    startTime: '4:00 PM',
    endTime: '5:00 PM',
    type: 'birthday',
    location: 'Kitchen Area',
    calendarId: 'my-calendar'
  }
];

export function TeamCalendar() {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 11)); // April 11, 2026
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([
    'my-calendar',
    'marketing-team',
    'engineering-team',
    'meeting-room-a'
  ]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendars(prev =>
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const filteredEvents = sampleEvents.filter(event =>
    selectedCalendars.includes(event.calendarId)
  );

  const getEventColor = (calendarId: string) => {
    const calendar = calendarSources.find(c => c.id === calendarId);
    return calendar?.color || '#6b7280';
  };

  // Generate calendar days for month view
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Generate week days for week view
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return filteredEvents.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setDate(currentDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2026, 3, 11); // Current date from context
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left Sidebar - Calendar Sources */}
      <div className="w-72 flex-shrink-0">
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Book Meeting Button */}
              <Button className="w-full gap-2" size="lg" onClick={() => setShowBookingModal(true)}>
                <Plus className="h-5 w-5" />
                Book Meeting
              </Button>

              {/* Mini Current Month */}
              <div>
                <h3 className="mb-3">
                  {new Date(2026, 3, 11).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="text-center">
                  <div className="text-6xl font-light text-primary mb-1">11</div>
                  <div className="text-sm text-muted-foreground">Friday</div>
                </div>
              </div>

              {/* Calendar Sources */}
              <div>
                <h4 className="mb-3">My Calendars</h4>
                <div className="space-y-3">
                  {calendarSources.filter(c => c.type === 'user').map((calendar) => (
                    <label
                      key={calendar.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCalendars.includes(calendar.id)}
                        onCheckedChange={() => toggleCalendar(calendar.id)}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: calendar.color }}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {calendar.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Team Calendars */}
              <div>
                <h4 className="mb-3">Team Calendars</h4>
                <div className="space-y-3">
                  {calendarSources.filter(c => c.type === 'team').map((calendar) => (
                    <label
                      key={calendar.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCalendars.includes(calendar.id)}
                        onCheckedChange={() => toggleCalendar(calendar.id)}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: calendar.color }}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {calendar.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meeting Rooms */}
              <div>
                <h4 className="mb-3">Meeting Rooms</h4>
                <div className="space-y-3">
                  {calendarSources.filter(c => c.type === 'room').map((calendar) => (
                    <label
                      key={calendar.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCalendars.includes(calendar.id)}
                        onCheckedChange={() => toggleCalendar(calendar.id)}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: calendar.color }}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {calendar.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1>{formatMonthYear()}</h1>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date(2026, 3, 11))}
              >
                Today
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            {view === 'month' ? (
              <div className="h-full flex flex-col">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm text-muted-foreground border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 flex-1" style={{ gridAutoRows: '1fr' }}>
                  {getDaysInMonth().map((date, index) => {
                    const dayEvents = getEventsForDate(date);
                    const isTodayDate = isToday(date);

                    return (
                      <div
                        key={index}
                        className={`border-r border-b last:border-r-0 p-2 ${
                          !date ? 'bg-gray-50' : ''
                        } overflow-y-auto`}
                      >
                        {date && (
                          <>
                            <div className={`text-sm mb-2 ${
                              isTodayDate
                                ? 'bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center'
                                : ''
                            }`}>
                              {date.getDate()}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                  style={{
                                    backgroundColor: getEventColor(event.calendarId) + '15',
                                    borderLeft: `3px solid ${getEventColor(event.calendarId)}`
                                  }}
                                >
                                  <div className="truncate">{event.startTime}</div>
                                  <div className="truncate">{event.title}</div>
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-muted-foreground pl-1">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Week View */
              <div className="h-full flex flex-col">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b">
                  {getWeekDays().map((date) => {
                    const isTodayDate = isToday(date);
                    return (
                      <div key={date.toISOString()} className="p-3 text-center border-r last:border-r-0">
                        <div className="text-sm text-muted-foreground">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className={`text-lg mt-1 ${
                          isTodayDate
                            ? 'bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto'
                            : ''
                        }`}>
                          {date.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Week Events */}
                <div className="grid grid-cols-7 flex-1 overflow-y-auto">
                  {getWeekDays().map((date) => {
                    const dayEvents = getEventsForDate(date);
                    return (
                      <div key={date.toISOString()} className="border-r last:border-r-0 p-3 space-y-2">
                        {dayEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            style={{ borderLeft: `4px solid ${getEventColor(event.calendarId)}` }}
                          >
                            <CardContent className="p-3">
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {event.startTime} - {event.endTime}
                                </div>
                                <div className="text-sm">{event.title}</div>
                                {event.location && (
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    {event.location === 'Virtual' ? (
                                      <Video className="h-3 w-3" />
                                    ) : (
                                      <MapPin className="h-3 w-3" />
                                    )}
                                    {event.location}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
