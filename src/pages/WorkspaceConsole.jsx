import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
  LayoutDashboard, CheckSquare, FileText, Briefcase, CalendarDays,
  Users, BarChart3, Settings, Bell, Search, Plus, X, ChevronRight,
  TrendingUp, Clock, Target, Zap, Edit3, Trash2, Check, AlertCircle,
  Circle, MoreHorizontal, ArrowUpRight, ArrowDownRight, Filter,
  Download, Menu, ChevronDown, Star, Folder, Tag, Send, Moon, Sun, LogOut
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  textPrimary: '#1C1B1A',
  textSecondary: '#706C64',
  accent: '#C9A227',
  accentLight: '#F4EEDD',
  border: '#E7E1D7',
  success: '#3D7A52',
  successLight: '#EBF4EE',
  error: '#C94C4C',
  errorLight: '#FCEAEA',
  primaryBtn: '#2B2B2B',
};

const cardStyle = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 16,
  padding: 24,
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
};

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

// ─── Initial Data ─────────────────────────────────────────────────────────────
const initialTasks = [
  { id: 1, title: 'Design new onboarding flow', priority: 'High', column: 'To Do' },
  { id: 2, title: 'Fix authentication bug', priority: 'High', column: 'In Progress' },
  { id: 3, title: 'Write API documentation', priority: 'Medium', column: 'To Do' },
  { id: 4, title: 'Set up CI/CD pipeline', priority: 'Medium', column: 'In Progress' },
  { id: 5, title: 'Review pull requests', priority: 'Low', column: 'In Review' },
  { id: 6, title: 'Update team handbook', priority: 'Low', column: 'Completed' },
  { id: 7, title: 'Conduct user interviews', priority: 'High', column: 'To Do' },
  { id: 8, title: 'Optimize database queries', priority: 'Medium', column: 'In Review' },
];

const initialNotes = [
  { id: 1, title: 'Q3 Sprint Planning', body: 'Key goals for Q3:\n- Ship v2.0 of the dashboard\n- Onboard 3 enterprise clients\n- Reduce churn by 15%', tag: 'Planning', date: 'Jul 10, 2026' },
  { id: 2, title: 'Team Meeting Notes', body: 'Discussed:\n- New hire onboarding process\n- Budget allocation for Q4\n- Product roadmap priorities', tag: 'Meeting', date: 'Jul 9, 2026' },
  { id: 3, title: 'Product Ideas', body: 'Feature ideas:\n- AI task suggestions\n- Time tracking integration\n- Mobile app v2\n- Dark mode improvements', tag: 'Ideas', date: 'Jul 8, 2026' },
  { id: 4, title: 'Client Feedback Summary', body: 'Key feedback from enterprise clients:\n- Need better export options\n- Slack integration requested\n- Performance on large datasets', tag: 'Research', date: 'Jul 7, 2026' },
];

const initialJobs = [
  { id: 1, company: 'Stripe', role: 'Senior Frontend Engineer', salary: '$180k - $220k', date: 'Jul 5, 2026', column: 'Applied' },
  { id: 2, company: 'Linear', role: 'Product Designer', salary: '$140k - $170k', date: 'Jul 3, 2026', column: 'Screening' },
  { id: 3, company: 'Vercel', role: 'Staff Engineer', salary: '$200k - $250k', date: 'Jun 28, 2026', column: 'Interviewing' },
  { id: 4, company: 'Notion', role: 'Frontend Lead', salary: '$160k - $190k', date: 'Jun 25, 2026', column: 'Applied' },
  { id: 5, company: 'Figma', role: 'Senior Engineer', salary: '$170k - $210k', date: 'Jun 20, 2026', column: 'Offered' },
  { id: 6, company: 'GitHub', role: 'Engineering Manager', salary: '$190k - $230k', date: 'Jun 15, 2026', column: 'Screening' },
];

const calendarEvents = [
  { id: 1, day: 1, title: 'Sprint Kickoff', color: C.accent },
  { id: 2, day: 3, title: 'Client Call – Acme', color: C.success },
  { id: 3, day: 7, title: 'Team Standup', color: C.accent },
  { id: 4, day: 10, title: 'Q3 Sprint Review', color: C.error },
  { id: 5, day: 14, title: 'Design Review', color: C.accent },
  { id: 6, day: 14, title: '1:1 with Alina', color: C.success },
  { id: 7, day: 18, title: 'Product Demo', color: C.accent },
  { id: 8, day: 21, title: 'Retrospective', color: C.success },
  { id: 9, day: 24, title: 'Investor Update', color: C.error },
  { id: 10, day: 28, title: 'All-Hands Meeting', color: C.accent },
];

const teamMembers = [
  { id: 1, name: 'Arham Bhatti', role: 'Admin', department: 'Engineering', email: 'alex@syncflow.io', status: 'Active', initials: 'AM' },
  { id: 2, name: 'Alina Sheikh', role: 'Lead Designer', department: 'Design', email: 'sarah@syncflow.io', status: 'Active', initials: 'SC' },
  { id: 3, name: 'Hassan Fareed', role: 'Backend Engineer', department: 'Engineering', email: 'marcus@syncflow.io', status: 'Away', initials: 'MR' },
  { id: 4, name: 'Fatima Ahmed', role: 'Product Manager', department: 'Product', email: 'priya@syncflow.io', status: 'Active', initials: 'PS' },
  { id: 5, name: 'Hamza Ali', role: 'DevOps Engineer', department: 'Engineering', email: 'tom@syncflow.io', status: 'Offline', initials: 'TW' },
  { id: 6, name: 'Mahnoor Ali', role: 'Frontend Engineer', department: 'Engineering', email: 'lisa@syncflow.io', status: 'Active', initials: 'LP' },
  { id: 7, name: 'Jatin Khatri', role: 'Data Analyst', department: 'Analytics', email: 'james@syncflow.io', status: 'Away', initials: 'JO' },
  { id: 8, name: 'Zara Ahmed', role: 'UX Researcher', department: 'Design', email: 'nina@syncflow.io', status: 'Offline', initials: 'NP' },
];

const analyticsData = {
  '7d': {
    productivity: [
      { label: 'Mon', value: 72 }, { label: 'Tue', value: 85 }, { label: 'Wed', value: 68 },
      { label: 'Thu', value: 91 }, { label: 'Fri', value: 77 }, { label: 'Sat', value: 83 }, { label: 'Sun', value: 89 },
    ],
    tasks: [
      { label: 'Mon', value: 5 }, { label: 'Tue', value: 8 }, { label: 'Wed', value: 4 },
      { label: 'Thu', value: 11 }, { label: 'Fri', value: 7 }, { label: 'Sat', value: 6 }, { label: 'Sun', value: 9 },
    ],
    activity: [
      { label: 'Mon', value: 14 }, { label: 'Tue', value: 22 }, { label: 'Wed', value: 18 },
      { label: 'Thu', value: 30 }, { label: 'Fri', value: 24 }, { label: 'Sat', value: 12 }, { label: 'Sun', value: 19 },
    ],
    metrics: { tasks: 50, productivity: 81, active: 6, notes: 12 },
  },
  '30d': {
    productivity: [
      { label: 'Week 1', value: 310 }, { label: 'Week 2', value: 380 }, { label: 'Week 3', value: 290 }, { label: 'Week 4', value: 420 },
    ],
    tasks: [
      { label: 'Week 1', value: 32 }, { label: 'Week 2', value: 41 }, { label: 'Week 3', value: 28 }, { label: 'Week 4', value: 47 },
    ],
    activity: [
      { label: 'Week 1', value: 88 }, { label: 'Week 2', value: 102 }, { label: 'Week 3', value: 79 }, { label: 'Week 4', value: 115 },
    ],
    metrics: { tasks: 148, productivity: 78, active: 7, notes: 34 },
  },
  '90d': {
    productivity: [
      { label: 'Month 1', value: 1200 }, { label: 'Month 2', value: 1480 }, { label: 'Month 3', value: 1650 },
    ],
    tasks: [
      { label: 'Month 1', value: 120 }, { label: 'Month 2', value: 154 }, { label: 'Month 3', value: 178 },
    ],
    activity: [
      { label: 'Month 1', value: 340 }, { label: 'Month 2', value: 420 }, { label: 'Month 3', value: 510 },
    ],
    metrics: { tasks: 452, productivity: 83, active: 8, notes: 97 },
  },
};

const topPerformers = [
  { name: 'Fatima Ahmed', tasks: 42, productivity: 94, trend: 'up' },
  { name: 'Alina Sheikh', tasks: 38, productivity: 91, trend: 'up' },
  { name: 'Mahnoor Ali', tasks: 35, productivity: 87, trend: 'up' },
  { name: 'Hassan Fareed', tasks: 29, productivity: 79, trend: 'down' },
  { name: 'Jatin Khatri', tasks: 24, productivity: 74, trend: 'up' },
];

// ─── Reusable Small Components ─────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const styles = {
    High: { background: C.errorLight, color: C.error },
    Medium: { background: C.accentLight, color: C.accent },
    Low: { background: C.successLight, color: C.success },
  };
  return (
    <span style={{ ...styles[priority], fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, fontFamily: 'Inter, sans-serif' }}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: { bg: C.successLight, color: C.success, dot: C.success },
    Away: { bg: C.accentLight, color: C.accent, dot: C.accent },
    Offline: { bg: '#F0F0EE', color: '#9A9690', dot: '#9A9690' },
  };
  const s = map[status] || map.Offline;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, fontFamily: 'Inter, sans-serif' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 42, height: 24, borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s',
        background: value ? C.accent : '#D0CCC5', position: 'relative', flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#FFF',
        position: 'absolute', top: 3, left: value ? 21 : 3, transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function MetricCard({ icon: Icon, iconColor, iconBg, label, value, change, changeType }) {
  return (
    <div style={{ ...cardStyle }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={iconColor} />
        </div>
        {change && (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600,
            color: changeType === 'up' ? C.success : changeType === 'down' ? C.error : C.textSecondary,
            background: changeType === 'up' ? C.successLight : changeType === 'down' ? C.errorLight : '#F0F0EE',
            padding: '2px 8px', borderRadius: 20,
          }}>
            {changeType === 'up' ? <ArrowUpRight size={12} /> : changeType === 'down' ? <ArrowDownRight size={12} /> : null}
            {change}
          </span>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, fontFamily: 'Playfair Display, serif' }}>{value}</div>
        <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 2, fontFamily: 'Inter, sans-serif' }}>{label}</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD TAB ─────────────────────────────────────────────────────────────
const weeklyData = [
  { day: 'Mon', score: 65 }, { day: 'Tue', score: 80 }, { day: 'Wed', score: 72 },
  { day: 'Thu', score: 88 }, { day: 'Fri', score: 75 }, { day: 'Sat', score: 60 }, { day: 'Sun', score: 84 },
];

const recentActivity = [
  { icon: Check, color: C.success, bg: C.successLight, text: 'Completed "Design system audit"', time: '2 min ago' },
  { icon: FileText, color: C.accent, bg: C.accentLight, text: 'Added note "Q3 Sprint Planning"', time: '14 min ago' },
  { icon: Briefcase, color: '#6B5BD6', bg: '#F0EEFF', text: 'Interview scheduled with Stripe', time: '1 hr ago' },
  { icon: Users, color: C.success, bg: C.successLight, text: 'Zara Ahmed joined the team', time: '3 hr ago' },
  { icon: AlertCircle, color: C.error, bg: C.errorLight, text: 'Deadline approaching: API docs', time: '5 hr ago' },
];

function DashboardTab({ setActiveTab }) {
  const now = new Date(2026, 6, 12);
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <motion.div key="dashboard" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: C.textPrimary, margin: 0 }}>
          Good morning, Arham.
        </h1>
        <p style={{ color: C.textSecondary, marginTop: 4, fontFamily: 'Inter, sans-serif', fontSize: 14 }}>{dateStr}</p>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <MetricCard icon={CheckSquare} iconColor={C.success} iconBg={C.successLight} label="Tasks Completed" value="24" change="+12%" changeType="up" />
        <MetricCard icon={FileText} iconColor={C.accent} iconBg={C.accentLight} label="Notes Created" value="8" change="This week" changeType="neutral" />
        <MetricCard icon={Briefcase} iconColor="#6B5BD6" iconBg="#F0EEFF" label="Active Jobs" value="5" change="2 new" changeType="up" />
        <MetricCard icon={Users} iconColor={C.success} iconBg={C.successLight} label="Team Online" value="3/8" change="Active now" changeType="neutral" />
      </div>

      {/* Charts + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>
            Weekly Productivity
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.accent} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke={C.accent} strokeWidth={2} fill="url(#prodGrad)" dot={{ r: 3, fill: C.accent }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>
            Recent Activity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={15} color={item.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: C.textPrimary, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: C.textSecondary }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={cardStyle}>
        <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>Quick Actions</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Add Task', icon: CheckSquare, tab: 'tasks' },
            { label: 'New Note', icon: FileText, tab: 'notes' },
            { label: 'Log Job', icon: Briefcase, tab: 'jobs' },
            { label: 'View Analytics', icon: BarChart3, tab: 'analytics' },
          ].map(({ label, icon: Icon, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 12,
                padding: '12px 16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, transition: 'opacity 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TASKS TAB ─────────────────────────────────────────────────────────────────
const TASK_COLUMNS = ['To Do', 'In Progress', 'In Review', 'Completed'];

function TasksTab() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', column: 'To Do' });

  const cycleColumn = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const idx = TASK_COLUMNS.indexOf(t.column);
      return { ...t, column: TASK_COLUMNS[(idx + 1) % TASK_COLUMNS.length] };
    }));
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), ...newTask }]);
    setNewTask({ title: '', priority: 'Medium', column: 'To Do' });
    setShowAdd(false);
  };

  return (
    <motion.div key="tasks" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Tasks</h2>
        <button
          onClick={() => setShowAdd(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
        >
          <Plus size={15} /> Add Task
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ ...cardStyle, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}
          >
            <div style={{ flex: 2, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>Task Title</label>
              <input
                value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
                placeholder="Enter task title..."
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', background: C.bg }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>Priority</label>
              <select
                value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg }}
              >
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>Column</label>
              <select
                value={newTask.column} onChange={e => setNewTask(p => ({ ...p, column: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg }}
              >
                {TASK_COLUMNS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addTask} style={{ background: C.accent, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Save</button>
              <button onClick={() => setShowAdd(false)} style={{ background: C.bg, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 10, padding: '9px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {TASK_COLUMNS.map(col => (
          <div key={col} style={{ background: C.bg, borderRadius: 12, padding: 16, minHeight: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{col}</span>
              <span style={{ fontSize: 11, color: C.textSecondary, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: '1px 8px' }}>
                {tasks.filter(t => t.column === col).length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.filter(t => t.column === col).map(task => (
                <motion.div
                  key={task.id} layout
                  style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                  whileHover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  onClick={() => cycleColumn(task.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', color: C.textPrimary, lineHeight: 1.4, flex: 1 }}>{task.title}</span>
                    <button
                      onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: C.textSecondary, flexShrink: 0, lineHeight: 0 }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <PriorityBadge priority={task.priority} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── NOTES TAB ─────────────────────────────────────────────────────────────────
const NOTE_TAG_COLORS = {
  Planning: { bg: '#E8F0FF', color: '#3B5FC0' },
  Meeting: { bg: C.accentLight, color: C.accent },
  Ideas: { bg: '#E8FFF3', color: '#28855A' },
  Research: { bg: '#F5E8FF', color: '#8540C0' },
};

function NotesTab() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState('');
  const [activeNote, setActiveNote] = useState(null);
  const [editBuf, setEditBuf] = useState({});

  const filtered = useMemo(() =>
    notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())),
    [notes, search]
  );

  const openNote = (note) => { setActiveNote(note); setEditBuf(note); };

  const saveNote = () => {
    setNotes(prev => prev.map(n => n.id === editBuf.id ? { ...editBuf } : n));
    setActiveNote(editBuf);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNote?.id === id) { setActiveNote(null); setEditBuf({}); }
  };

  const newNote = () => {
    const n = { id: Date.now(), title: 'Untitled Note', body: '', tag: 'Ideas', date: 'Jul 12, 2026' };
    setNotes(prev => [n, ...prev]);
    openNote(n);
  };

  return (
    <motion.div key="notes" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Notes</h2>
        <button
          onClick={newNote}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
        >
          <Plus size={15} /> New Note
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, minHeight: 520 }}>
        {/* Left panel */}
        <div>
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <Search size={14} color={C.textSecondary} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search notes..."
              style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.surface, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 520, overflowY: 'auto' }}>
            {filtered.map(note => {
              const tagStyle = NOTE_TAG_COLORS[note.tag] || { bg: '#F0F0EE', color: '#706C64' };
              const isActive = activeNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => openNote(note)}
                  style={{
                    background: isActive ? C.accentLight : C.surface, border: `1px solid ${isActive ? C.accent : C.border}`,
                    borderRadius: 12, padding: '14px 14px', cursor: 'pointer', transition: 'all 0.18s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif', flex: 1 }}>{note.title}</span>
                    <button
                      onClick={e => { e.stopPropagation(); deleteNote(note.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: C.textSecondary }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: C.textSecondary, margin: '4px 0 8px', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {note.body}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: tagStyle.bg, color: tagStyle.color, fontFamily: 'Inter, sans-serif' }}>{note.tag}</span>
                    <span style={{ fontSize: 11, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{note.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
          {editBuf.id ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <input
                  value={editBuf.title || ''}
                  onChange={e => setEditBuf(p => ({ ...p, title: e.target.value }))}
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: C.textPrimary, border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
                />
                <button
                  onClick={saveNote}
                  style={{ background: C.accent, color: '#FFF', border: 'none', borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Check size={14} /> Save
                </button>
              </div>
              <div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>Tag:</span>
                <select
                  value={editBuf.tag || 'Ideas'}
                  onChange={e => setEditBuf(p => ({ ...p, tag: e.target.value }))}
                  style={{ padding: '4px 10px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontFamily: 'Inter, sans-serif', background: C.bg, outline: 'none' }}
                >
                  {Object.keys(NOTE_TAG_COLORS).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <textarea
                value={editBuf.body || ''}
                onChange={e => setEditBuf(p => ({ ...p, body: e.target.value }))}
                placeholder="Start writing..."
                style={{ flex: 1, resize: 'none', border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 16px', fontSize: 14, fontFamily: 'Inter, sans-serif', color: C.textPrimary, lineHeight: 1.7, outline: 'none', background: C.bg, minHeight: 320 }}
              />
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.textSecondary }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: C.textSecondary }}>Select a note to view</div>
              <div style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', marginTop: 6 }}>or create a new one to get started</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── JOB TRACKER TAB ──────────────────────────────────────────────────────────
const JOB_COLUMNS = ['Applied', 'Screening', 'Interviewing', 'Offered'];

function JobsTab() {
  const [jobs, setJobs] = useState(initialJobs);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', salary: '', notes: '', column: 'Applied' });

  const cycleJob = (id) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== id) return j;
      const idx = JOB_COLUMNS.indexOf(j.column);
      if (idx === JOB_COLUMNS.length - 1) return j;
      return { ...j, column: JOB_COLUMNS[idx + 1] };
    }));
  };

  const addJob = () => {
    if (!form.company.trim()) return;
    setJobs(prev => [...prev, { id: Date.now(), ...form, date: 'Jul 12, 2026' }]);
    setForm({ company: '', role: '', salary: '', notes: '', column: 'Applied' });
    setShowAdd(false);
  };

  const colColors = { Applied: { bg: '#E8F0FF', color: '#3B5FC0' }, Screening: { bg: C.accentLight, color: C.accent }, Interviewing: { bg: '#F5E8FF', color: '#8540C0' }, Offered: { bg: C.successLight, color: C.success } };

  return (
    <motion.div key="jobs" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Job Tracker</h2>
        <button onClick={() => setShowAdd(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          <Plus size={15} /> Add Application
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
              {[['Company', 'company', 'e.g. Google'], ['Role', 'role', 'e.g. Frontend Engineer'], ['Salary Range', 'salary', 'e.g. $150k - $180k']].map(([lbl, key, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>{lbl}</label>
                  <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={ph}
                    style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg, boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>Notes</label>
              <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any notes about this application..."
                style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addJob} style={{ background: C.accent, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Save</button>
              <button onClick={() => setShowAdd(false)} style={{ background: C.bg, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 10, padding: '9px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {JOB_COLUMNS.map(col => {
          const cs = colColors[col];
          return (
            <div key={col} style={{ background: C.bg, borderRadius: 12, padding: 16, minHeight: 400 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{col}</span>
                <span style={{ fontSize: 11, color: cs.color, background: cs.bg, borderRadius: 20, padding: '1px 8px', fontWeight: 600 }}>
                  {jobs.filter(j => j.column === col).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {jobs.filter(j => j.column === col).map(job => (
                  <motion.div key={job.id} layout
                    onClick={() => cycleJob(job.id)}
                    style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px', cursor: col === 'Offered' ? 'default' : 'pointer', transition: 'box-shadow 0.2s' }}
                    whileHover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>{job.company}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{job.role}</div>
                    <div style={{ fontSize: 12, color: C.success, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{job.salary}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{job.date}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: cs.bg, color: cs.color, fontFamily: 'Inter, sans-serif' }}>{col}</span>
                    </div>
                    {col !== 'Offered' && (
                      <div style={{ fontSize: 10, color: C.textSecondary, marginTop: 8, fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                        Click to advance →
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── CALENDAR TAB ─────────────────────────────────────────────────────────────
function CalendarTab() {
  const [offset, setOffset] = useState(0); // 0 = Jul 2026
  const [selectedDay, setSelectedDay] = useState(null);

  const baseDate = new Date(2026, 6, 1);
  const viewDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + offset, 1);
  const monthName = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = viewDate.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const todayDay = offset === 0 ? 12 : null;

  const dayEvents = useMemo(() => {
    if (offset !== 0) return {};
    const map = {};
    calendarEvents.forEach(ev => {
      if (!map[ev.day]) map[ev.day] = [];
      map[ev.day].push(ev);
    });
    return map;
  }, [offset]);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedEvents = selectedDay && dayEvents[selectedDay] ? dayEvents[selectedDay] : [];

  return (
    <motion.div key="calendar" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Calendar</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.textPrimary }}>{monthName}</span>
          <button onClick={() => setOffset(o => o - 1)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={16} color={C.textSecondary} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button onClick={() => setOffset(o => o + 1)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={16} color={C.textSecondary} />
          </button>
        </div>
      </div>

      <div style={{ ...cardStyle }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0, marginBottom: 8 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: C.textSecondary, fontFamily: 'Inter, sans-serif', padding: '8px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((day, i) => {
            const isToday = day === todayDay;
            const evs = day && dayEvents[day] ? dayEvents[day] : [];
            const isSelected = day === selectedDay;
            return (
              <div key={i}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                style={{
                  minHeight: 72, borderRadius: 10, padding: '8px 6px', cursor: day ? 'pointer' : 'default',
                  background: isToday ? C.accent : isSelected ? C.accentLight : 'transparent',
                  border: isSelected && !isToday ? `1px solid ${C.accent}` : '1px solid transparent',
                  transition: 'background 0.15s',
                }}
              >
                {day && (
                  <>
                    <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? '#FFF' : C.textPrimary, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>{day}</div>
                    {evs.slice(0, 2).map((ev, ei) => (
                      <div key={ei} style={{ fontSize: 10, background: isToday ? 'rgba(255,255,255,0.3)' : ev.color + '22', color: isToday ? '#FFF' : ev.color, borderRadius: 4, padding: '2px 5px', marginBottom: 2, fontFamily: 'Inter, sans-serif', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ev.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedDay && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            style={{ ...cardStyle, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary }}>
                {viewDate.toLocaleString('en-US', { month: 'long' })} {selectedDay}
              </span>
              <button onClick={() => setSelectedDay(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSecondary }}><X size={16} /></button>
            </div>
            {selectedEvents.length === 0 ? (
              <p style={{ color: C.textSecondary, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>No events on this day.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedEvents.map(ev => (
                  <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.bg, borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.textPrimary }}>{ev.title}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── TEAM TAB ─────────────────────────────────────────────────────────────────
function TeamTab() {
  return (
    <motion.div key="team" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Team Members</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>8 members</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          <Plus size={15} /> Invite Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {teamMembers.map(member => {
          const statusColors = { Active: C.success, Away: C.accent, Offline: '#9A9690' };
          return (
            <div key={member.id} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: C.accent }}>
                    {member.initials}
                  </div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: statusColors[member.status], border: '2px solid #FFF', position: 'absolute', bottom: 0, right: 0 }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{member.name}</div>
                  <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{member.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: C.textSecondary, fontFamily: 'Inter, sans-serif', background: C.bg, padding: '3px 10px', borderRadius: 20, border: `1px solid ${C.border}` }}>
                  {member.department}
                </span>
                <StatusBadge status={member.status} />
              </div>
              <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{member.email}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── ANALYTICS TAB ────────────────────────────────────────────────────────────
function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState('7d');
  const data = analyticsData[timeRange];

  return (
    <motion.div key="analytics" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Analytics</h2>
        <div style={{ display: 'flex', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
          {['7d', '30d', '90d'].map(r => (
            <button key={r} onClick={() => setTimeRange(r)} style={{
              padding: '7px 18px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              fontFamily: 'Inter, sans-serif', transition: 'all 0.18s',
              background: timeRange === r ? C.primaryBtn : 'transparent',
              color: timeRange === r ? '#FFF' : C.textSecondary,
            }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <MetricCard icon={CheckSquare} iconColor={C.success} iconBg={C.successLight} label="Tasks Completed" value={data.metrics.tasks} change="+8%" changeType="up" />
        <MetricCard icon={TrendingUp} iconColor={C.accent} iconBg={C.accentLight} label="Avg Productivity" value={`${data.metrics.productivity}%`} change="+3%" changeType="up" />
        <MetricCard icon={Users} iconColor="#6B5BD6" iconBg="#F0EEFF" label="Active Members" value={data.metrics.active} change="" changeType="neutral" />
        <MetricCard icon={FileText} iconColor={C.success} iconBg={C.successLight} label="Notes Created" value={data.metrics.notes} change="+12%" changeType="up" />
      </div>

      {/* Main chart */}
      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>Productivity Score</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data.productivity}>
            <defs>
              <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.3} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke={C.accent} strokeWidth={2.5} fill="url(#analyticsGrad)" dot={{ r: 4, fill: C.accent }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>Tasks Completed</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.tasks}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Bar dataKey="value" fill={C.accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>Team Activity</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data.activity}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke={C.success} strokeWidth={2.5} dot={{ r: 4, fill: C.success }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top performers */}
      <div style={cardStyle}>
        <div style={{ marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: C.textPrimary, fontSize: 15 }}>Top Performers</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Tasks Completed', 'Productivity', 'Trend'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, color: C.textSecondary, fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: '8px 12px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((p, i) => (
                <tr key={p.name} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: '12px 12px', fontSize: 13, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: C.accent }}>
                        {i + 1}
                      </div>
                      {p.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontSize: 13, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{p.tasks}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: C.border, borderRadius: 3 }}>
                        <div style={{ width: `${p.productivity}%`, height: '100%', background: C.accent, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{p.productivity}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: p.trend === 'up' ? C.success : C.error, background: p.trend === 'up' ? C.successLight : C.errorLight, padding: '2px 8px', borderRadius: 20, fontFamily: 'Inter, sans-serif' }}>
                      {p.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {p.trend === 'up' ? 'Up' : 'Down'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const [settingsTab, setSettingsTab] = useState('general');
  const [workspaceName, setWorkspaceName] = useState('SyncFlow Workspace');
  const [timezone, setTimezone] = useState('UTC-5 (Eastern)');
  const [language, setLanguage] = useState('English (US)');
  const [notifs, setNotifs] = useState({ email: true, tasks: true, mentions: false, weekly: true });
  const [twoFA, setTwoFA] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });

  const settingsTabs = [
    { id: 'general', label: 'General' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  const usageBars = [
    { label: 'Storage', used: 45, total: '10 GB' },
    { label: 'API Calls', used: 72, total: '100k/mo' },
    { label: 'Seats', used: 30, total: '3 / 10 seats' },
  ];

  const sessions = [
    { device: 'Chrome on macOS', location: 'New York, US', time: 'Active now' },
    { device: 'Safari on iPhone', location: 'New York, US', time: '2 hrs ago' },
    { device: 'Firefox on Windows', location: 'Boston, US', time: '3 days ago' },
  ];

  return (
    <motion.div key="settings" variants={tabVariants} initial="initial" animate="animate" exit="exit">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: '0 0 24px' }}>Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24 }}>
        {/* Left sidebar */}
        <div style={{ ...cardStyle, padding: 12, alignSelf: 'start' }}>
          {settingsTabs.map(t => (
            <button key={t.id} onClick={() => setSettingsTab(t.id)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px',
              border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 13,
              fontFamily: 'Inter, sans-serif', fontWeight: settingsTab === t.id ? 600 : 400,
              background: settingsTab === t.id ? C.accentLight : 'transparent',
              color: settingsTab === t.id ? C.accent : C.textSecondary,
              transition: 'all 0.18s', marginBottom: 2,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div style={cardStyle}>
          <AnimatePresence mode="wait">
            {settingsTab === 'general' && (
              <motion.div key="gen" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: '0 0 20px' }}>General Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    { label: 'Workspace Name', value: workspaceName, set: setWorkspaceName, type: 'input' },
                  ].map(({ label, value, set, type }) => (
                    <div key={label}>
                      <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 6, fontWeight: 600 }}>{label}</label>
                      <input value={value} onChange={e => set(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg, boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 6, fontWeight: 600 }}>Timezone</label>
                    <select value={timezone} onChange={e => setTimezone(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg }}>
                      {['UTC-8 (Pacific)', 'UTC-5 (Eastern)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+5:30 (IST)', 'UTC+8 (SGT)'].map(tz => <option key={tz}>{tz}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 6, fontWeight: 600 }}>Language</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg }}>
                      {['English (US)', 'English (UK)', 'French', 'German', 'Spanish', 'Japanese'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <button style={{ alignSelf: 'flex-start', background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {settingsTab === 'billing' && (
              <motion.div key="bill" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: '0 0 20px' }}>Billing & Plan</h3>
                <div style={{ background: `linear-gradient(135deg, ${C.primaryBtn} 0%, #4A4A4A 100%)`, borderRadius: 14, padding: 24, color: '#FFF', marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>CURRENT PLAN</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700 }}>Professional</div>
                      <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>$29 / month · Billed annually</div>
                    </div>
                    <div style={{ background: C.accent, borderRadius: 8, padding: '4px 14px', fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Active</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  {usageBars.map(bar => (
                    <div key={bar.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{bar.label}</span>
                        <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{bar.used}% · {bar.total}</span>
                      </div>
                      <div style={{ height: 8, background: C.border, borderRadius: 4 }}>
                        <div style={{ width: `${bar.used}%`, height: '100%', background: bar.used > 70 ? C.error : C.accent, borderRadius: 4, transition: 'width 0.4s' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ background: C.accent, color: '#FFF', border: 'none', borderRadius: 10, padding: '11px 28px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                  Upgrade to Enterprise
                </button>
              </motion.div>
            )}

            {settingsTab === 'notifications' && (
              <motion.div key="notifs" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: '0 0 20px' }}>Notification Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { key: 'email', label: 'Email Digest', desc: 'Receive a daily summary of your workspace activity' },
                    { key: 'tasks', label: 'Task Reminders', desc: 'Get notified when tasks are due or overdue' },
                    { key: 'mentions', label: 'Team Mentions', desc: 'Notify when someone @mentions you in comments' },
                    { key: 'weekly', label: 'Weekly Report', desc: 'Receive weekly productivity and analytics report' },
                  ].map((item, i, arr) => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{item.desc}</div>
                      </div>
                      <Toggle value={notifs[item.key]} onChange={v => setNotifs(p => ({ ...p, [item.key]: v }))} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {settingsTab === 'security' && (
              <motion.div key="sec" variants={tabVariants} initial="initial" animate="animate" exit="exit">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: '0 0 20px' }}>Security</h3>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif', marginBottom: 14 }}>Change Password</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[['Current Password', 'current'], ['New Password', 'newPw'], ['Confirm New Password', 'confirm']].map(([lbl, key]) => (
                      <div key={key}>
                        <label style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4, fontWeight: 600 }}>{lbl}</label>
                        <input type="password" value={pwForm[key]} onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                          style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg, boxSizing: 'border-box' }} />
                      </div>
                    ))}
                    <button style={{ alignSelf: 'flex-start', background: C.primaryBtn, color: '#FFF', border: 'none', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>
                      Update Password
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, marginBottom: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Add an extra layer of security to your account</div>
                    </div>
                    <Toggle value={twoFA} onChange={setTwoFA} />
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif', marginBottom: 14 }}>Active Sessions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {sessions.map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, borderRadius: 10, padding: '12px 16px' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{s.device}</div>
                          <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: 'Inter, sans-serif' }}>{s.location} · {s.time}</div>
                        </div>
                        {i === 0 ? (
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.success, background: C.successLight, padding: '2px 10px', borderRadius: 20, fontFamily: 'Inter, sans-serif' }}>Current</span>
                        ) : (
                          <button style={{ fontSize: 11, color: C.error, background: C.errorLight, border: 'none', padding: '4px 12px', borderRadius: 20, cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function WorkspaceConsole({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'jobs', label: 'Job Tracker', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab setActiveTab={setActiveTab} />;
      case 'tasks': return <TasksTab />;
      case 'notes': return <NotesTab />;
      case 'jobs': return <JobsTab />;
      case 'calendar': return <CalendarTab />;
      case 'team': return <TeamTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'settings': return <SettingsTab />;
      default: return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* ── Sidebar ── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden', height: '100vh', position: 'sticky', top: 0 }}
          >
            {/* Logo */}
            <div style={{ padding: '24px 20px 16px', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} color="#FFF" />
                </div>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.textPrimary }}>SyncFlow</span>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '10px 12px', border: 'none', borderRadius: 10, cursor: 'pointer',
                      background: isActive ? C.accentLight : 'transparent',
                      color: isActive ? C.accent : C.textSecondary,
                      fontWeight: isActive ? 600 : 400, fontSize: 13,
                      fontFamily: 'Inter, sans-serif', marginBottom: 2,
                      transition: 'all 0.18s', textAlign: 'left',
                    }}
                    onMouseOver={e => { if (!isActive) e.currentTarget.style.background = C.bg; }}
                    onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Icon size={17} />
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* User */}
            <div style={{ padding: '14px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: C.accent, flexShrink: 0 }}>
                AM
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Arham Bhatti</div>
                <div style={{ fontSize: 11, color: C.textSecondary }}>Admin</div>
              </div>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSecondary, padding: 4, lineHeight: 0 }}
                onClick={() => setActivePage && setActivePage('landing')}
                title="Log out"
              >
                <LogOut size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.textSecondary, lineHeight: 0, flexShrink: 0 }}
          >
            <Menu size={20} />
          </button>
          <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
            <Search size={14} color={C.textSecondary} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              placeholder="Search anything..."
              style={{ width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: C.bg, boxSizing: 'border-box', color: C.textPrimary }}
            />
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSecondary, padding: 6, lineHeight: 0, position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: C.error, border: '2px solid #FFF' }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <AnimatePresence mode="wait">
            {renderTab()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
