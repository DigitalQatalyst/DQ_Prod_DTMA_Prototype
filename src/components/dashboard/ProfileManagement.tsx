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
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border">
        <div className="flex items-start justify-between mb-6">
          <h3 className="font-semibold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
            Profile Information
          </h3>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white"
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              'Edit Profile'
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-[var(--dq-navy-950)] text-white text-2xl">
                  {getInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--dq-orange-500)] rounded-full flex items-center justify-center text-white hover:bg-[var(--dq-orange-600)]">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                {profile?.full_name || 'Learner'}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                {profile?.email}
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name" className="flex items-center gap-2 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white border-border"
                  style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  value={profile?.email || ''}
                  disabled
                  className="bg-white border-border"
                  style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white border-border"
                  style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
                />
              </div>

              <div>
                <Label htmlFor="location" className="flex items-center gap-2 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white border-border"
                  style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="occupation" className="flex items-center gap-2 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                  <Briefcase className="w-4 h-4" />
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white border-border"
                  style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                className="bg-white border-border min-h-[100px]"
                placeholder="Tell us about yourself..."
                style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-border">
        <h3 className="font-semibold mb-4" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
          Account Settings
        </h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
            Notification Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};
