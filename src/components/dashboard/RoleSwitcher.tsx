import { useNavigate } from 'react-router-dom';
import { useUserRoles } from '@/hooks/useUserRoles';
import { 
  GraduationCap, 
  Presentation, 
  Shield,
  ChevronDown,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type AppRole = 'learner' | 'instructor' | 'admin';

interface RoleSwitcherProps {
  currentRole: 'instructor' | 'admin';
}

const roleConfig = {
  learner: {
    label: 'Learner',
    icon: GraduationCap,
    path: '/dashboard',
    color: 'text-blue-500',
  },
  instructor: {
    label: 'Instructor', 
    icon: Presentation,
    path: '/instructor',
    color: 'text-amber-500',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    path: '/admin',
    color: 'text-red-500',
  },
};

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const navigate = useNavigate();
  const { data: userRoles, isLoading } = useUserRoles();

  // Only show if user is an admin (admins can switch between admin and instructor)
  const isAdmin = userRoles?.includes('admin');
  
  if (isLoading || !userRoles || !isAdmin) {
    return null;
  }

  // Only allow switching between admin and instructor
  const switchableRoles: AppRole[] = ['admin', 'instructor'];
  const availableRoles = switchableRoles.filter(role => userRoles.includes(role));

  if (availableRoles.length <= 1) {
    return null;
  }

  const currentConfig = roleConfig[currentRole];
  const CurrentIcon = currentConfig.icon;

  const handleRoleSwitch = (role: AppRole) => {
    if (role !== currentRole) {
      navigate(roleConfig[role].path);
    }
  };

  // Sidebar variant for admin/instructor dashboards
  return (
    <div className="px-4 py-3 border-b border-primary-foreground/10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between px-3 py-2 h-auto text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <div className="flex items-center gap-2">
              <CurrentIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{currentConfig.label} View</span>
            </div>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-56 bg-popover border border-border shadow-lg z-50"
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Switch Dashboard View
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableRoles.map((role) => {
            const config = roleConfig[role];
            const Icon = config.icon;
            const isActive = role === currentRole;
            
            return (
              <DropdownMenuItem
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className="cursor-pointer"
              >
                <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
                <span className="flex-1">{config.label}</span>
                {isActive && <Check className="w-4 h-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
