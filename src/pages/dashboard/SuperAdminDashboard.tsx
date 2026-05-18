import { useState } from 'react';
import { Menu, X, LogOut, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function SuperAdminDashboard() {
  const { profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--dq-navy-950)] border-r border-white/10 flex flex-col hidden lg:flex">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">School Manager</h2>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-[var(--dq-orange-500)] flex items-center justify-center text-[14px] leading-[20px] font-medium text-white">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] leading-[20px] font-medium truncate text-white">{profile?.full_name || 'Admin'}</div>
              <div className="text-[12px] leading-[16px] font-normal text-white/60">Administrator</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">School Manager</span>
          <div className="w-10" />
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-background rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <main className="p-6 lg:p-8">
          {/* Overview Content Only */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-[32px] leading-[40px] font-semibold text-[var(--dq-navy-950)] mb-2">Platform Overview</h1>
              <p className="text-[14px] leading-[20px] text-[var(--dq-text-disabled)]">Monitor key metrics and platform performance at a glance</p>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users Card */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                    <Users className="w-6 h-6 text-[var(--dq-orange-500)]" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">12,847</div>
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Total Users</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Active platform members</div>
              </div>

              {/* Published Courses Card */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                    <BookOpen className="w-6 h-6 text-[var(--dq-orange-500)]" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+8%</span>
                  </div>
                </div>
                <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">342</div>
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Published Courses</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Active learning programs</div>
              </div>

              {/* Certifications Card */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                    <Award className="w-6 h-6 text-[var(--dq-orange-500)]" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18%</span>
                  </div>
                </div>
                <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">3,421</div>
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Certifications Issued</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">KHDA verified credentials</div>
              </div>

              {/* Platform Health Card */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)] hover:border-[var(--dq-orange-500)]/30 transition-all hover:shadow-lg group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-xl flex items-center justify-center group-hover:bg-[#ffe9e4] transition-colors">
                    <TrendingUp className="w-6 h-6 text-[var(--dq-orange-500)]" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[12px] leading-[16px] font-medium">
                    <span>99.8%</span>
                  </div>
                </div>
                <div className="text-[36px] leading-[44px] font-bold text-[var(--dq-navy-950)] mb-1">Uptime</div>
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]">Platform Health</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">System operational status</div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)]">
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)] mb-2">AI Tutor Usage</div>
                <div className="text-[28px] leading-[36px] font-bold text-[var(--dq-navy-950)]">8,234</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Active sessions this month</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)]">
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)] mb-2">WhatsApp Engagement</div>
                <div className="text-[28px] leading-[36px] font-bold text-[var(--dq-navy-950)]">45.2%</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Learner engagement rate</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[var(--dq-surface-border-default)]">
                <div className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)] mb-2">Completion Rate</div>
                <div className="text-[28px] leading-[36px] font-bold text-[var(--dq-navy-950)]">78.5%</div>
                <div className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)] mt-1">Average course completion</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
