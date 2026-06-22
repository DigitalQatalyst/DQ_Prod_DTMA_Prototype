export type LiveClassStatus =
  | 'ready-to-join'
  | 'starts-tomorrow'
  | 'registration-open'
  | 'starting-soon';

export type PreparationStatus = 'complete' | 'pending' | 'warning';

export interface PreparationItem {
  label: string;
  status: PreparationStatus;
}

export interface LiveClassSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  durationHours: number;
  participants: number;
  maxParticipants: number;
  preparation: PreparationItem[];
  preparationPercent: number;
  status: LiveClassStatus;
  attendanceStatus: 'Registered' | 'Confirmed' | 'Waitlisted';
}

export interface PastClassSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  attended: boolean;
  recordingAvailable: boolean;
}

export interface LiveNotification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  tone: 'danger' | 'warning' | 'success' | 'info';
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function dateOnly(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(days: number, hour = 14, minute = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export function getSessionStart(session: Pick<LiveClassSession, 'date' | 'startTime'>): Date {
  const [h, m] = session.startTime.split(':').map(Number);
  const d = new Date(session.date);
  d.setHours(h, m, 0, 0);
  return d;
}

export function formatSessionDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTimeRange(start: string, end: string, tz: string): string {
  return `${start}–${end} ${tz}`;
}

export function computeStatus(start: Date): LiveClassStatus {
  const ms = start.getTime() - Date.now();
  const minutes = ms / 60000;
  if (minutes <= 60 && minutes > 0) return 'starting-soon';
  if (minutes <= 0 && minutes > -120) return 'ready-to-join';
  const hours = ms / 3600000;
  if (hours > 0 && hours <= 28) return 'ready-to-join';
  if (hours > 28 && hours <= 52) return 'starts-tomorrow';
  return 'registration-open';
}

export function formatCountdown(target: Date): string {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return 'Starting now';
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  return `Starts in ${minutes}m`;
}

export const STATUS_BADGE: Record<
  LiveClassStatus,
  { label: string; className: string; dotClass: string }
> = {
  'ready-to-join': {
    label: 'Ready to Join',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClass: 'bg-green-500',
  },
  'starts-tomorrow': {
    label: 'Starts Tomorrow',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
    dotClass: 'bg-amber-500',
  },
  'registration-open': {
    label: 'Registration Open',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    dotClass: 'bg-blue-500',
  },
  'starting-soon': {
    label: 'Starting in 30 Minutes',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClass: 'bg-red-500',
  },
};

export function buildUpcomingSessions(): LiveClassSession[] {
  const soonStart = new Date();
  soonStart.setMinutes(soonStart.getMinutes() + 155);
  const soonEnd = new Date(soonStart);
  soonEnd.setHours(soonEnd.getHours() + 2);

  const tomorrow = addDays(1, 10, 0);
  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(tomorrowEnd.getHours() + 2);

  const later = addDays(5, 15, 0);
  const laterEnd = new Date(later);
  laterEnd.setHours(laterEnd.getHours() + 2);

  const sessions: LiveClassSession[] = [
    {
      id: '1',
      title: 'Digital Transformation Strategy Workshop',
      instructor: 'Dr. Ahmed Al-Mansoori',
      date: dateOnly(soonStart),
      startTime: `${pad(soonStart.getHours())}:${pad(soonStart.getMinutes())}`,
      endTime: `${pad(soonEnd.getHours())}:${pad(soonEnd.getMinutes())}`,
      timezone: 'GST',
      durationHours: 2,
      participants: 45,
      maxParticipants: 50,
      preparation: [
        { label: 'Pre-reading Complete', status: 'complete' },
        { label: 'Lesson Review Complete', status: 'complete' },
        { label: 'Assignment Pending', status: 'warning' },
      ],
      preparationPercent: 67,
      status: 'starting-soon',
      attendanceStatus: 'Confirmed',
    },
    {
      id: '2',
      title: 'AI Implementation Best Practices',
      instructor: 'Sarah Johnson',
      date: dateOnly(tomorrow),
      startTime: '10:00',
      endTime: '12:00',
      timezone: 'GST',
      durationHours: 2,
      participants: 38,
      maxParticipants: 40,
      preparation: [
        { label: 'Pre-reading Complete', status: 'pending' },
        { label: 'Lesson Review Complete', status: 'pending' },
        { label: 'Assignment Pending', status: 'pending' },
      ],
      preparationPercent: 0,
      status: 'starts-tomorrow',
      attendanceStatus: 'Registered',
    },
    {
      id: '3',
      title: 'Leadership in Digital Age',
      instructor: 'Mohammed Hassan',
      date: dateOnly(later),
      startTime: '15:00',
      endTime: '17:00',
      timezone: 'GST',
      durationHours: 2,
      participants: 52,
      maxParticipants: 60,
      preparation: [
        { label: 'Pre-reading Complete', status: 'pending' },
        { label: 'Lesson Review Complete', status: 'pending' },
      ],
      preparationPercent: 0,
      status: 'registration-open',
      attendanceStatus: 'Registered',
    },
  ];

  return sessions.map((s) => ({
    ...s,
    status: computeStatus(getSessionStart(s)),
  }));
}

export function buildPastSessions(): PastClassSession[] {
  const past1 = addDays(-12, 14, 0);
  const past2 = addDays(-18, 10, 0);

  return [
    {
      id: 'p1',
      title: 'Introduction to Digital Economy',
      instructor: 'Dr. Fatima Al-Zaabi',
      date: dateOnly(past1),
      startTime: '14:00',
      endTime: '16:00',
      timezone: 'GST',
      attended: true,
      recordingAvailable: true,
    },
    {
      id: 'p2',
      title: 'Data Analytics Fundamentals',
      instructor: 'Omar Khalid',
      date: dateOnly(past2),
      startTime: '10:00',
      endTime: '12:00',
      timezone: 'GST',
      attended: false,
      recordingAvailable: true,
    },
  ];
}

export const WEEKLY_SUMMARY = {
  upcomingClasses: 3,
  assignmentsDue: 2,
  lessonsCompleted: 4,
  attendanceRate: 92,
};

export const LIVE_NOTIFICATIONS: LiveNotification[] = [
  {
    id: '1',
    message: 'Live class starts in 30 minutes',
    timestamp: '30 min',
    read: false,
    tone: 'danger',
  },
  {
    id: '2',
    message: 'Assignment due in 2 days',
    timestamp: '3 hours ago',
    read: false,
    tone: 'warning',
  },
  {
    id: '3',
    message: 'New badge earned',
    timestamp: '2 hours ago',
    read: false,
    tone: 'success',
  },
  {
    id: '4',
    message: 'New lesson available',
    timestamp: '5 hours ago',
    read: true,
    tone: 'info',
  },
];

export const AI_PREP_PROMPTS = [
  'Summarize this upcoming session',
  'Generate study notes',
  'Explain difficult concepts',
  'Quiz me before class',
];

export const NOTIFICATION_TONE_DOT: Record<LiveNotification['tone'], string> = {
  danger: 'bg-red-500',
  warning: 'bg-amber-500',
  success: 'bg-green-500',
  info: 'bg-blue-500',
};
