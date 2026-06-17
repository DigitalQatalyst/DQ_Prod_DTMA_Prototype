import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Briefcase, Save, Camera } from 'lucide-react';
import { toast } from 'sonner';
import {
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCardTitle,
  learnerItemTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

const fieldLabel = 'mb-1.5 flex items-center gap-1.5 text-xs font-medium text-dq-navy';

export const ProfileManagement = () => {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    occupation: profile?.occupation || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <Card className={cn(learnerPanel, 'p-4 lg:p-5')}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className={learnerCardTitle}>Profile Information</h3>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={cn(learnerBtnPrimary, 'h-8 shrink-0 px-3 text-xs')}
          >
            {isEditing ? (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save
              </>
            ) : (
              'Edit Profile'
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          <div className="flex items-center gap-4 lg:w-48 lg:flex-col lg:items-center lg:text-center">
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gray-100 text-sm text-dq-navy">
                  {getInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-dq-orange text-white hover:bg-[#E04020]"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="min-w-0">
              <p className={learnerItemTitle}>{profile?.full_name || 'Learner'}</p>
              <p className={cn(learnerBodyMuted, 'truncate text-xs')}>{profile?.email}</p>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="full_name" className={fieldLabel}>
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!isEditing}
                  className="h-9 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="email" className={fieldLabel}>
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </Label>
                <Input id="email" value={profile?.email || ''} disabled className="h-9 text-sm" />
              </div>

              <div>
                <Label htmlFor="phone" className={fieldLabel}>
                  <Phone className="h-3.5 w-3.5" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="h-9 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="location" className={fieldLabel}>
                  <MapPin className="h-3.5 w-3.5" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="h-9 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="occupation" className={fieldLabel}>
                  <Briefcase className="h-3.5 w-3.5" />
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  disabled={!isEditing}
                  className="h-9 text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className={cn(fieldLabel, 'block')}>
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                className="min-h-[72px] text-sm"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className={cn(learnerPanel, 'p-4')}>
        <h3 className={cn(learnerCardTitle, 'mb-3')}>Account Settings</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          <Button variant="outline" className="h-9 justify-start text-xs">
            Change Password
          </Button>
          <Button variant="outline" className="h-9 justify-start text-xs">
            Privacy Settings
          </Button>
          <Button variant="outline" className="h-9 justify-start text-xs">
            Notification Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};
