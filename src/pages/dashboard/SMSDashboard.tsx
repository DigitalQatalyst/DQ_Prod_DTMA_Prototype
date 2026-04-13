import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Banknote,
  Globe,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import SMSOverviewPanel from '@/components/sms/SMSOverviewPanel';
import SMSCoursesPanel from '@/components/sms/SMSCoursesPanel';
import SMSStudentsPanel from '@/components/sms/SMSStudentsPanel';
import SMSFinancePanel from '@/components/sms/SMSFinancePanel';
import SMSPartnersPanel from '@/components/sms/SMSPartnersPanel';

type SMSTab = 'overview' | 'courses' | 'students' | 'finance' | 'partners';

const navItems: { id: SMSTab; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'overview',  label: 'Academy Overview',    icon: LayoutDashboard, description: 'Morning briefing' },
  { id: 'courses',   label: 'Courses & Faculty',   icon: BookOpen,        description: 'Performance & instructors' },
  { id: 'students',  label: 'Students & Certificates', icon: GraduationCap, description: 'Records & exceptions' },
  { id: 'finance',   label: 'Finance & Billing',   icon: Banknote,        description: 'Revenue & payouts' },
  { id: 'partners',  label: 'Partners & Compliance', icon: Globe,          description: 'External relations' },
];

export default function SMSDashboard() {
  const [activeTab, setActiveTab] = useState<SMSTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = navItems.find((n) => n.id === activeTab)!;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1e2348] to-[#2a3058] text-white flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/dtma-logo.png" alt="DTMA" className="h-[36px] w-auto brightness-0 invert" />
          </Link>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            School Management
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/65 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium leading-tight">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Admin Panel
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-slate-900">{active.label}</h1>
              <p className="text-xs text-slate-500 hidden sm:block">{active.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:block">School Manager Portal</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === 'overview'  && <SMSOverviewPanel  onNavigate={setActiveTab} />}
          {activeTab === 'courses'   && <SMSCoursesPanel />}
          {activeTab === 'students'  && <SMSStudentsPanel />}
          {activeTab === 'finance'   && <SMSFinancePanel />}
          {activeTab === 'partners'  && <SMSPartnersPanel />}
        </main>
      </div>
    </div>
  );
}
