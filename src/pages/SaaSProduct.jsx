import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,CheckSquare,FileText,Briefcase,
  Calendar,  Users,  BarChart3,  Settings, Check,ChevronDown,Zap,TrendingUp,  Shield,ArrowRight,Play,Star,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  primary: '#1C1B1A',
  secondary: '#706C64',
  accent: '#C9A227',
  border: '#E7E1D7',
  success: '#3D7A52',
  error: '#C94C4C',
  btn: '#2B2B2B',
  dark: '#1C1B1A',
};

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Reusable tiny components ─────────────────────────────────────────────────
const Section = ({ children, style = {} }) => (
  <section style={{ width: '100%', ...style }}>{children}</section>
);

const Container = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>
);

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: `${C.accent}18`, color: C.accent,
    fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '5px 12px', borderRadius: 999, fontFamily: 'Inter, sans-serif',
    border: `1px solid ${C.accent}33`,
  }}>{children}</span>
);

const H1 = ({ children }) => (
  <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 700, color: C.primary, lineHeight: 1.12, margin: 0 }}>
    {children}
  </h1>
);

const H2 = ({ children, center = false }) => (
  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: C.primary, lineHeight: 1.2, margin: 0, textAlign: center ? 'center' : 'left' }}>
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: C.primary, margin: 0, lineHeight: 1.3 }}>
    {children}
  </h3>
);

const Body = ({ children, secondary = false, style = {} }) => (
  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.7, color: secondary ? C.secondary : C.primary, margin: 0, ...style }}>
    {children}
  </p>
);

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
const DashboardMockup = () => {
  const bars = [40, 65, 55, 80, 70, 90, 60];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ background: '#181717', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', border: '1px solid #2e2e2e' }}>
      {/* Title bar */}
      <div style={{ background: '#111', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C940', display: 'inline-block' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', marginLeft: 8 }}>SyncFlow — Dashboard</span>
      </div>
      <div style={{ display: 'flex', minHeight: 280 }}>
        {/* Sidebar */}
        <div style={{ width: 56, background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '20px 0', borderRight: '1px solid #222' }}>
          {[LayoutDashboard, CheckSquare, FileText, Briefcase, Calendar, Users, BarChart3, Settings].map((Icon, i) => (
            <div key={i} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: i === 0 ? `${C.accent}22` : 'transparent', cursor: 'pointer' }}>
              <Icon size={16} color={i === 0 ? C.accent : '#555'} />
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Tasks Done', value: '142', color: C.success },
              { label: 'In Progress', value: '38', color: C.accent },
              { label: 'Team Members', value: '24', color: '#7C6CFF' },
              { label: 'Uptime', value: '99.9%', color: '#3DA4C9' },
            ].map((m, i) => (
              <div key={i} style={{ background: '#1e1e1e', borderRadius: 10, padding: '12px 14px', border: '1px solid #2a2a2a' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#666', marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
          {/* Bar chart */}
          <div style={{ background: '#1e1e1e', borderRadius: 10, padding: '16px', border: '1px solid #2a2a2a' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#777', marginBottom: 12 }}>Weekly Activity</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 60 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${h}%`, background: i === 5 ? C.accent : '#333', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#555' }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Task list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Design new onboarding flow', 'Review Q3 analytics report', 'Deploy v2.4.1 to production'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1e1e1e', borderRadius: 8, padding: '8px 12px', border: '1px solid #2a2a2a' }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, border: `2px solid ${i === 0 ? C.accent : '#444'}`, background: i === 0 ? C.accent : 'transparent', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: i === 0 ? '#ccc' : '#555', textDecoration: i === 0 ? 'none' : 'none' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ setActivePage, featuresRef }) => (
  <Section style={{ padding: '100px 0 80px', background: C.bg }}>
    <Container>
      <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}>
        <motion.div variants={fade}>
          <Tag><Star size={11} /> New · AI Task Engine v2</Tag>
        </motion.div>
        <motion.div variants={fade} style={{ maxWidth: 780 }}>
          <H1>The only workspace your team will ever need.</H1>
        </motion.div>
        <motion.div variants={fade} style={{ maxWidth: 560 }}>
          <Body secondary>
            SyncFlow unifies task management, notes, job tracking, shared calendars, and real-time analytics — so your team can move faster without switching tabs.
          </Body>
        </motion.div>
        <motion.div variants={fade} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setActivePage('workspace')}
            style={{ background: C.btn, color: '#fff', border: 'none', borderRadius: 12, padding: '14px 28px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Start Free Trial <ArrowRight size={16} />
          </button>
          <button
            onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'transparent', color: C.primary, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '14px 28px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >
            <Play size={15} /> See How It Works
          </button>
        </motion.div>
        <motion.div variants={fade} style={{ width: '100%', maxWidth: 860, marginTop: 16 }}>
          <DashboardMockup />
        </motion.div>
      </motion.div>
    </Container>
  </Section>
);

// ─── 2. SOCIAL PROOF BAR ─────────────────────────────────────────────────────
const SocialProof = () => (
  <Section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, padding: '28px 0' }}>
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 28 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.secondary, letterSpacing: '0.04em', fontWeight: 500, whiteSpace: 'nowrap' }}>
          Trusted by <strong style={{ color: C.primary }}>12,000+</strong> teams worldwide
        </span>
        <div style={{ width: 1, height: 20, background: C.border }} />
        {['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma'].map(name => (
          <span key={name} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: C.secondary, letterSpacing: '0.02em', padding: '4px 12px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.bg }}>
            {name}
          </span>
        ))}
      </div>
    </Container>
  </Section>
);

// ─── 3. FEATURES BENTO GRID ──────────────────────────────────────────────────
const TerminalBlock = () => (
  <div style={{ background: '#111', borderRadius: 12, padding: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.7, marginTop: 16, overflow: 'hidden' }}>
    <div style={{ color: '#555', marginBottom: 8 }}>// AI Task Engine · auto-assign</div>
    <div><span style={{ color: '#7C6CFF' }}>const</span> <span style={{ color: '#3DA4C9' }}>task</span> <span style={{ color: '#fff' }}>= await</span> <span style={{ color: C.accent }}>syncflow</span><span style={{ color: '#fff' }}>.</span><span style={{ color: '#3DA4C9' }}>createTask</span><span style={{ color: '#fff' }}>(&#123;</span></div>
    <div style={{ paddingLeft: 16 }}><span style={{ color: '#C9A227' }}>title</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#3D7A52' }}>"Launch v2 campaign"</span><span style={{ color: '#fff' }}>,</span></div>
    <div style={{ paddingLeft: 16 }}><span style={{ color: '#C9A227' }}>priority</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#7C6CFF' }}>"high"</span><span style={{ color: '#fff' }}>,</span></div>
    <div style={{ paddingLeft: 16 }}><span style={{ color: '#C9A227' }}>assignee</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#3D7A52' }}>"ai:auto"</span><span style={{ color: '#fff' }}>,</span></div>
    <div><span style={{ color: '#fff' }}>&#125;);</span></div>
    <div style={{ marginTop: 8, color: '#555' }}>// → Assigned to @alina · due Friday</div>
    <div style={{ color: C.success }}>✓ Task #1847 created</div>
  </div>
);

const MiniCalendar = () => {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const dates = [7, 8, 9, 10, 11, 12, 13];
  const events = { 9: C.accent, 11: '#7C6CFF', 12: C.success };
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.secondary, fontWeight: 600, padding: '4px 0' }}>{d}</div>
        ))}
        {dates.map(d => (
          <div key={d} style={{ textAlign: 'center', padding: '6px 2px', borderRadius: 8, background: d === 10 ? C.btn : events[d] ? `${events[d]}20` : 'transparent', position: 'relative' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: d === 10 ? 700 : 400, color: d === 10 ? '#fff' : events[d] ? events[d] : C.primary }}>{d}</span>
            {events[d] && <div style={{ width: 4, height: 4, borderRadius: '50%', background: events[d], margin: '2px auto 0' }} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { time: '10:00', label: 'Product Review', color: C.accent },
          { time: '14:00', label: 'Design Sync', color: '#7C6CFF' },
          { time: '16:30', label: 'Sprint Planning', color: C.success },
        ].map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: `${e.color}12`, border: `1px solid ${e.color}30` }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: e.color, fontWeight: 600 }}>{e.time}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.primary }}>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiniBarChart = () => {
  const data = [30, 58, 42, 75, 88, 62, 95, 70];
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: `${v}%`, background: i === 6 ? C.accent : `${C.accent}40`, borderRadius: '4px 4px 0 0', transition: 'height 0.4s' }} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
        {[{ label: 'Velocity', val: '+34%', color: C.success }, { label: 'Completion', val: '92%', color: C.accent }, { label: 'Blocked', val: '3', color: C.error }].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.secondary }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AvatarActivity = () => {
  const avatarColors = ['#7C6CFF', C.accent, C.success, '#3DA4C9', '#C94C4C'];
  const initials = ['AB', 'AS', 'HF', 'HA', 'HK'];
  const activities = [
    { user: 'Alina', action: 'completed', task: 'Design Spec v2', time: '2m ago', color: C.success },
    { user: 'Arham', action: 'commented on', task: 'Q3 Roadmap', time: '8m ago', color: C.accent },
    { user: 'Hassan', action: 'assigned', task: 'API Integration', time: '15m ago', color: '#7C6CFF' },
  ];
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        {avatarColors.map((c, i) => (
          <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.surface}`, marginLeft: i > 0 ? -10 : 0, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#fff', zIndex: avatarColors.length - i }}>
            {initials[i]}
          </div>
        ))}
        <div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: C.primary }}>24 members active</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.success }}>● Online now</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {activities.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px', borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, marginTop: 5, flexShrink: 0 }} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>
              <strong style={{ color: C.primary }}>{a.user}</strong> {a.action} <strong style={{ color: C.primary }}>{a.task}</strong>
              <span style={{ color: C.secondary, marginLeft: 6 }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesBento = ({ featuresRef }) => (
  <Section ref={featuresRef} style={{ padding: '96px 0', background: C.bg }}>
    <Container>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 48 }}>
          <Tag>Features</Tag>
          <div style={{ marginTop: 16 }}>
            <H2 center>Everything your team needs, nothing it doesn't</H2>
          </div>
        </motion.div>
        <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {/* Card 1 — large */}
          <motion.div variants={fade} style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <Card style={{ height: '100%', padding: 28, borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} color={C.accent} />
                </div>
                <Tag>AI-Powered</Tag>
              </div>
              <H3>AI-Powered Task Engine</H3>
              <Body secondary style={{ marginTop: 8 }}>
                Our AI analyzes your team's workload in real time and intelligently routes tasks to the right people at the right time — no manual assignment needed.
              </Body>
              <TerminalBlock />
            </Card>
          </motion.div>
          {/* Card 2 */}
          <motion.div variants={fade}>
            <Card style={{ padding: 24, borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#7C6CFF18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} color="#7C6CFF" />
                </div>
              </div>
              <H3>Unified Calendar</H3>
              <Body secondary style={{ marginTop: 6 }}>All events, deadlines, and meetings in one shared view.</Body>
              <MiniCalendar />
            </Card>
          </motion.div>
          {/* Card 3 */}
          <motion.div variants={fade}>
            <Card style={{ padding: 24, borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.success}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} color={C.success} />
                </div>
              </div>
              <H3>Real-Time Analytics</H3>
              <Body secondary style={{ marginTop: 6 }}>Live velocity, completion rates, and bottleneck alerts.</Body>
              <MiniBarChart />
            </Card>
          </motion.div>
        </motion.div>
        {/* Card 4 full-width */}
        <motion.div variants={fade} style={{ marginTop: 20 }}>
          <Card style={{ padding: 24, borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#3DA4C918', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#3DA4C9" />
              </div>
            </div>
            <H3>Team Collaboration</H3>
            <Body secondary style={{ marginTop: 6 }}>Live presence, activity feeds, and frictionless handoffs keep everyone aligned.</Body>
            <AvatarActivity />
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  </Section>
);

// ─── 4. PRODUCT PREVIEW (Kanban) ─────────────────────────────────────────────
const KanbanMockup = () => {
  const columns = [
    { title: 'To Do', color: '#555', tasks: ['Write API docs', 'Design email templates', 'Set up CI/CD pipeline'] },
    { title: 'In Progress', color: C.accent, tasks: ['Rebuild onboarding flow', 'Integrate Stripe billing'] },
    { title: 'Done', color: C.success, tasks: ['Launch v2.3', 'Q2 retrospective', 'Hire senior designer'] },
  ];
  return (
    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ minWidth: 220, flex: '0 0 220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col.title}</span>
            <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>{col.tasks.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.tasks.map((t, ti) => (
              <div key={ti} style={{ background: '#1e1e1e', borderRadius: 10, padding: '10px 12px', border: '1px solid #2a2a2a', cursor: 'grab' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ccc', lineHeight: 1.5 }}>{t}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: [C.accent, '#7C6CFF', C.success][ti % 3], opacity: 0.85 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#555' }}>#{1800 + ci * 10 + ti}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductPreview = ({ setActivePage }) => (
  <Section style={{ padding: '96px 0', background: C.surface }}>
    <Container>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 40 }}>
          <Tag>Product</Tag>
          <div style={{ marginTop: 16 }}>
            <H2 center>See SyncFlow in action</H2>
          </div>
          <Body secondary style={{ marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            An entire workspace — tasks, docs, tracking, and analytics — in one beautiful interface.
          </Body>
        </motion.div>
        <motion.div variants={fade}>
          <div style={{ background: '#181717', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', border: '1px solid #2e2e2e' }}>
            {/* Title bar */}
            <div style={{ background: '#111', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #222' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C940', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', marginLeft: 8 }}>SyncFlow — Kanban Board</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#555', background: '#1e1e1e', padding: '3px 8px', borderRadius: 6 }}>Board</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#555', background: '#1e1e1e', padding: '3px 8px', borderRadius: 6 }}>List</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.accent, background: `${C.accent}20`, padding: '3px 8px', borderRadius: 6 }}>Timeline</span>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              {/* Sidebar */}
              <div style={{ width: 200, background: '#111', padding: '20px 0', borderRight: '1px solid #222', minHeight: 340 }}>
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', active: false },
                  { icon: CheckSquare, label: 'Tasks', active: true },
                  { icon: FileText, label: 'Notes', active: false },
                  { icon: Briefcase, label: 'Jobs', active: false },
                  { icon: Calendar, label: 'Calendar', active: false },
                  { icon: Users, label: 'Team', active: false },
                  { icon: BarChart3, label: 'Analytics', active: false },
                  { icon: Settings, label: 'Settings', active: false },
                ].map(({ icon: Icon, label, active }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', background: active ? `${C.accent}15` : 'transparent', borderLeft: active ? `2px solid ${C.accent}` : '2px solid transparent', cursor: 'pointer' }}>
                    <Icon size={14} color={active ? C.accent : '#555'} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: active ? '#ddd' : '#555', fontWeight: active ? 600 : 400 }}>{label}</span>
                  </div>
                ))}
              </div>
              {/* Kanban */}
              <div style={{ flex: 1, padding: '24px 28px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#e0e0e0' }}>Sprint #14 · July 2026</div>
                  <button onClick={() => setActivePage('workspace')} style={{ background: C.accent, color: '#000', border: 'none', borderRadius: 8, padding: '7px 16px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                    Open Workspace
                  </button>
                </div>
                <KanbanMockup />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  </Section>
);

// ─── 5. BENEFITS ─────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={22} color={C.accent} />,
    color: C.accent,
    heading: 'Save 3 hours daily',
    desc: 'Stop toggling between 6 apps. SyncFlow consolidates your entire workflow so you spend time doing, not managing.',
  },
  {
    icon: <Star size={22} color="#7C6CFF" />,
    color: '#7C6CFF',
    heading: 'Zero learning curve',
    desc: 'Onboard in under 10 minutes. Familiar patterns, intuitive UI, and contextual hints mean your team hits the ground running.',
  },
  {
    icon: <Shield size={22} color={C.success} />,
    color: C.success,
    heading: '99.9% uptime SLA',
    desc: 'Enterprise-grade infrastructure with redundant global nodes. Your work is always available — we guarantee it.',
  },
];

const Benefits = () => (
  <Section style={{ padding: '96px 0', background: C.bg }}>
    <Container>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 48 }}>
          <Tag>Benefits</Tag>
          <div style={{ marginTop: 16 }}>
            <H2 center>Built for teams who ship</H2>
          </div>
        </motion.div>
        <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {benefits.map((b, i) => (
            <motion.div key={i} variants={fade}>
              <Card style={{ padding: 28, borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, height: '100%', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${b.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  {b.icon}
                </div>
                <H3>{b.heading}</H3>
                <Body secondary style={{ marginTop: 10 }}>{b.desc}</Body>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  </Section>
);

// ─── 6. PRICING ──────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Starter',
    monthly: 12,
    annual: 9,
    desc: 'Perfect for small teams and solo founders.',
    features: ['Up to 5 team members', '10 active projects', 'AI task suggestions', 'Calendar sync', 'Email support'],
    popular: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    monthly: 29,
    annual: 23,
    desc: 'The full power of SyncFlow for growing teams.',
    features: ['Unlimited team members', 'Unlimited projects', 'AI Task Engine (full)', 'Advanced analytics', 'Integrations (50+)', 'Priority support'],
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'Custom solutions for large organizations.',
    features: ['Dedicated infrastructure', 'SSO & SAML', 'Custom SLA', 'On-premise option', 'Dedicated CSM', 'Custom contracts'],
    popular: false,
    cta: 'Contact Sales',
  },
];

const Pricing = ({ setActivePage }) => {
  const [annual, setAnnual] = useState(false);
  return (
    <Section style={{ padding: '96px 0', background: C.surface }}>
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 48 }}>
            <Tag>Pricing</Tag>
            <div style={{ marginTop: 16 }}>
              <H2 center>Simple, transparent pricing</H2>
            </div>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 12, background: C.bg, borderRadius: 999, padding: '6px 8px', border: `1px solid ${C.border}` }}>
              <button onClick={() => setAnnual(false)} style={{ background: !annual ? C.btn : 'transparent', color: !annual ? '#fff' : C.secondary, border: 'none', borderRadius: 999, padding: '7px 18px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Monthly</button>
              <button onClick={() => setAnnual(true)} style={{ background: annual ? C.btn : 'transparent', color: annual ? '#fff' : C.secondary, border: 'none', borderRadius: 999, padding: '7px 18px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
                Annual
                <span style={{ background: `${C.success}20`, color: C.success, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>–20%</span>
              </button>
            </div>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
            {plans.map((p, i) => (
              <motion.div key={i} variants={fade}>
                <Card style={{
                  padding: 28, borderRadius: 20,
                  border: p.popular ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                  background: p.popular ? '#1C1B1A' : C.surface,
                  boxShadow: p.popular ? `0 8px 40px ${C.accent}22` : '0 2px 16px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'visible',
                }}>
                  {p.popular && (
                    <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: C.accent, color: '#000', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, padding: '3px 14px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: p.popular ? '#fff' : C.primary }}>{p.name}</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    {p.monthly ? (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 700, color: p.popular ? '#fff' : C.primary, lineHeight: 1 }}>
                          ${annual ? p.annual : p.monthly}
                        </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: p.popular ? '#888' : C.secondary, marginBottom: 6 }}>/mo</span>
                      </div>
                    ) : (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color: p.popular ? '#fff' : C.primary }}>Custom</span>
                    )}
                  </div>
                  <Body style={{ color: p.popular ? '#999' : C.secondary, marginBottom: 20, fontSize: 14 }}>{p.desc}</Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${C.success}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={11} color={C.success} />
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: p.popular ? '#ccc' : C.secondary }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActivePage('workspace')}
                    style={{
                      width: '100%', border: 'none', borderRadius: 12, padding: '12px 0',
                      fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'opacity 0.2s',
                      background: p.popular ? C.accent : C.btn,
                      color: p.popular ? '#000' : '#fff',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {p.cta}
                  </button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

// ─── 7. FAQ ACCORDION ────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How does SyncFlow compare to Notion?',
    a: "SyncFlow is purpose-built for team operations — not just note-taking. While Notion excels at knowledge bases, SyncFlow adds AI-powered task routing, real-time analytics, job tracking, and a shared calendar. It's the difference between a notebook and a command center.",
  },
  {
    q: 'Can I import from Jira or Asana?',
    a: 'Yes! SyncFlow supports one-click CSV and API imports from Jira, Asana, Trello, Linear, and Monday.com. Your existing projects, labels, assignees, and due dates migrate in minutes.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. SyncFlow is SOC 2 Type II certified, GDPR compliant, and encrypted at rest (AES-256) and in transit (TLS 1.3). Enterprise plans support SSO, SAML, and private cloud deployments.',
  },
  {
    q: 'Do you offer a free trial?',
    a: 'Yes — all plans include a 14-day free trial with no credit card required. You get full access to every feature, and our team will personally help you onboard.',
  },
  {
    q: 'How does team collaboration work?',
    a: 'SyncFlow shows live presence, real-time cursor activity on shared docs, inline commenting on tasks, and an activity feed so nothing falls through the cracks. Mention teammates with @name, assign tasks in one click, and watch updates stream in instantly.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div style={{ borderBottom: `1px solid ${C.border}`, overflow: 'hidden' }}>
    <button
      onClick={onToggle}
      style={{ width: '100%', background: 'none', border: 'none', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', gap: 16 }}
    >
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.primary, lineHeight: 1.4 }}>{faq.q}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
        <ChevronDown size={20} color={C.secondary} />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ paddingBottom: 20 }}>
            <Body secondary>{faq.a}</Body>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <Section style={{ padding: '96px 0', background: C.bg }}>
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 48 }}>
            <Tag>FAQ</Tag>
            <div style={{ marginTop: 16 }}>
              <H2 center>Questions? We have answers.</H2>
            </div>
          </motion.div>
          <motion.div variants={fade} style={{ maxWidth: 680, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

// ─── 8. CTA BANNER ───────────────────────────────────────────────────────────
const CTABanner = ({ setActivePage }) => (
  <Section style={{ padding: '96px 0', background: C.dark }}>
    <Container>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center' }}>
        <motion.div variants={fade}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, margin: '0 0 20px' }}>
            Start building smarter today.
          </h2>
        </motion.div>
        <motion.div variants={fade}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#888', margin: '0 0 36px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Join 12,000+ teams already using SyncFlow to move faster and stress less.
          </p>
        </motion.div>
        <motion.div variants={fade} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActivePage('workspace')}
            style={{ background: C.accent, color: '#000', border: 'none', borderRadius: 12, padding: '15px 32px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Launch App <ArrowRight size={16} />
          </button>
          <button
            onClick={() => setActivePage('workspace')}
            style={{ background: 'transparent', color: '#ccc', border: '1.5px solid #333', borderRadius: 12, padding: '15px 32px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#555'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
          >
            Start Free Trial
          </button>
        </motion.div>
        <motion.div variants={fade} style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['No credit card required', '14-day free trial', 'Cancel anytime'].map((t, i) => (
            <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={13} color={C.success} /> {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  </Section>
);

// ─── 9. FOOTER ───────────────────────────────────────────────────────────────
const Footer = ({ setActivePage }) => {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['Blog', 'Careers', 'About', 'Press'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookie Policy'],
  };
  return (
    <footer style={{ background: '#111', borderTop: '1px solid #1e1e1e', padding: '56px 0 32px' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, auto)', gap: 48, marginBottom: 48, flexWrap: 'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#000" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>SyncFlow</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#555', maxWidth: 220, lineHeight: 1.7, margin: 0 }}>
              The unified workspace for teams who ship. Tasks, docs, calendar, and analytics — all in one place.
            </p>
          </div>
          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>{section}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#" onClick={e => { e.preventDefault(); }} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#777', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ccc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#777'}
                  >{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#444' }}>© 2026 SyncFlow, Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* SVG social icons inline */}
            {[
              { label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label} style={{ color: '#444', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#888'}
                onMouseLeave={e => e.currentTarget.style.color = '#444'}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function SaaSProduct({ setActivePage }) {
  const featuresRef = useRef(null);

  return (
    <div style={{ background: C.bg, minHeight: '100vh', overflowX: 'hidden' }}>
      <Hero setActivePage={setActivePage} featuresRef={featuresRef} />
      <SocialProof />
      <FeaturesBento featuresRef={featuresRef} />
      <ProductPreview setActivePage={setActivePage} />
      <Benefits />
      <Pricing setActivePage={setActivePage} />
      <FAQ />
      <CTABanner setActivePage={setActivePage} />
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
