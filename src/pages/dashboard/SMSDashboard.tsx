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

const navItems: { id: SMSTab; label: string; icon: React.ElementType }[] = [
  { id: 'overview',  label: 'Academy Overview',       icon: LayoutDashboard },
  { id: 'courses',   label: 'Courses & Faculty',       icon: BookOpen        },
  { id: 'students',  label: 'Students',             icon: GraduationCap   },
  { id: 'finance',   label: 'Finance & Billing',       icon: Banknote        },
  { id: 'partners',  label: 'Partners & Compliance',   icon: Globe           },
];

export default function SMSDashboard() {
  const [activeTab, setActiveTab] = useState<SMSTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — identical structure to AdminDashboard */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1e2348] to-[#2a3058] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <img src="/dtma-logo.png" alt="DTMA" className="h-[40px] w-auto brightness-0 invert" />
            </Link>
            <p className="mt-2 text-[12px] leading-[16px] font-medium text-white/50 uppercase tracking-wide">
              School Management
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-[16px] leading-[24px] font-normal ${
                  activeTab === item.id
                    ? 'bg-[#ff6b4d] text-white shadow-lg shadow-[#ff6b4d]/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#ff6b4d] flex items-center justify-center text-[14px] leading-[20px] font-medium">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] leading-[20px] font-medium truncate">School Manager</div>
                <div className="text-[12px] leading-[16px] font-normal text-white/60">SMS Portal</div>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">School Management</span>
          <div className="w-10" />
        </header>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-background rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <main className="p-6 lg:p-8">
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
