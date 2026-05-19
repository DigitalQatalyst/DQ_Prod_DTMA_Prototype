import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Banknote,
  CreditCard,
  Globe,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import SMSOverviewPanel from '@/components/sms/SMSOverviewPanel';
import SMSCoursesPanel from '@/components/sms/SMSCoursesPanel';
import SMSFacultyPanel from '@/components/sms/SMSFacultyPanel';
import SMSStudentsPanel from '@/components/sms/SMSStudentsPanel';
import SMSFinancePanel from '@/components/sms/SMSFinancePanel';
import SMSBillingPanel from '@/components/sms/SMSBillingPanel';
import SMSPartnersPanel from '@/components/sms/SMSPartnersPanel';
import SMSCompliancePanel from '@/components/sms/SMSCompliancePanel';
import SMSStaffPanel from '@/components/sms/SMSStaffPanel';

type SMSTab = 'overview' | 'courses' | 'faculty' | 'students' | 'finance' | 'billing' | 'partners' | 'compliance' | 'staff';

const navItems: { id: SMSTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'finance', label: 'Finance', icon: Banknote },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'partners', label: 'Partners', icon: Globe },
  { id: 'compliance', label: 'Accreditation', icon: ShieldCheck },
  { id: 'staff', label: 'Staff', icon: UserCog },
];

export default function SMSDashboard() {
  const [activeTab, setActiveTab] = useState<SMSTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--dq-navy-950)] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <img src="/dtma-logo.png" alt="DTMA" className="h-10 w-auto brightness-0 invert" />
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
                  activeTab === item.id
                    ? 'bg-[var(--dq-orange-500)] text-white shadow-md shadow-[var(--dq-orange-500)]/30'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User footer */}
          <div className="px-3 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">Academy Manager</div>
                <div className="text-xs text-white/60">AMS Portal</div>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start text-xs text-white/70 hover:text-white hover:bg-white/10 h-9">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6 text-gray-900" />
          </button>
          <span className="font-semibold text-gray-900">Academy Management</span>
          <div className="w-10" />
        </header>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-white rounded-lg" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        )}

        <main className="bg-gray-50 min-h-screen px-6 py-8 lg:px-8">
          {activeTab === 'overview' && <SMSOverviewPanel onNavigate={setActiveTab} />}
          {activeTab === 'courses' && <SMSCoursesPanel />}
          {activeTab === 'faculty' && <SMSFacultyPanel />}
          {activeTab === 'students' && <SMSStudentsPanel />}
          {activeTab === 'finance' && <SMSFinancePanel />}
          {activeTab === 'billing' && <SMSBillingPanel />}
          {activeTab === 'partners' && <SMSPartnersPanel />}
          {activeTab === 'compliance' && <SMSCompliancePanel />}
          {activeTab === 'staff' && <SMSStaffPanel />}
        </main>
      </div>
    </div>
  );
}
