import { useState } from 'react';
import { useInvites, useCreateInvite, useRevokeInvite, Invite } from '@/hooks/useInvites';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Copy, 
  Check, 
  X, 
  Clock, 
  UserPlus,
  Shield,
  Presentation,
  Loader2
} from 'lucide-react';
import { format, formatDistanceToNow, isPast } from 'date-fns';

export function InviteManagement() {
  const { data: invites, isLoading } = useInvites();
  const createInvite = useCreateInvite();
  const revokeInvite = useRevokeInvite();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInviteRole, setNewInviteRole] = useState<'admin' | 'instructor'>('instructor');
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [newInviteExpiry, setNewInviteExpiry] = useState('7');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateInvite = async () => {
    await createInvite.mutateAsync({
      role: newInviteRole,
      email: newInviteEmail || undefined,
      expiresInDays: parseInt(newInviteExpiry),
    });
    setIsDialogOpen(false);
    setNewInviteEmail('');
    setNewInviteRole('instructor');
    setNewInviteExpiry('7');
  };

  const copyInviteLink = async (invite: Invite) => {
    const baseUrl = window.location.origin;
    const path = invite.role === 'admin' ? '/auth/admin' : '/auth/instructor';
    const link = `${baseUrl}${path}?invite=${invite.code}`;
    
    await navigator.clipboard.writeText(link);
    setCopiedId(invite.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (invite: Invite) => {
    if (invite.used_at) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Used</Badge>;
    }
    if (invite.revoked_at) {
      return <Badge variant="destructive">Revoked</Badge>;
    }
    if (isPast(new Date(invite.expires_at))) {
      return <Badge variant="outline" className="text-muted-foreground">Expired</Badge>;
    }
    return <Badge className="bg-[#ff6b4d]/10 text-[#ff6b4d] border-[#ff6b4d]/20">Active</Badge>;
  };

  const activeInvites = invites?.filter(i => !i.used_at && !i.revoked_at && !isPast(new Date(i.expires_at))) || [];
  const usedInvites = invites?.filter(i => i.used_at) || [];
  const expiredOrRevokedInvites = invites?.filter(i => !i.used_at && (i.revoked_at || isPast(new Date(i.expires_at)))) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] leading-[28px] font-medium text-[#1e2348]">Invite Management</h2>
          <p className="text-[14px] leading-[20px] font-normal text-[#4B5563]">
            Generate invite links for new admins and instructors
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ff6b4d] hover:bg-[#fff0ed] hover:text-[#ff6b4d] text-white transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Create Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[20px] leading-[28px] font-medium text-[#1e2348]">Create New Invite</DialogTitle>
              <DialogDescription className="text-[14px] leading-[20px] font-normal text-[#4B5563]">
                Generate an invite link for a new admin or instructor.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-[14px] leading-[20px] font-normal text-[#1e2348]">Role</Label>
                <Select value={newInviteRole} onValueChange={(v) => setNewInviteRole(v as 'admin' | 'instructor')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instructor">
                      <div className="flex items-center gap-2">
                        <Presentation className="w-4 h-4" />
                        Instructor
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[14px] leading-[20px] font-normal text-[#1e2348]">Email (optional)</Label>
                <Input
                  type="email"
                  placeholder="Restrict to specific email"
                  value={newInviteEmail}
                  onChange={(e) => setNewInviteEmail(e.target.value)}
                  className="text-[16px] leading-[24px] font-normal border-[#E5E7EB] focus:ring-[#ff6b4d]/40"
                />
                <p className="text-[12px] leading-[16px] font-medium text-[#9CA3AF]">
                  If set, only this email can use the invite
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[14px] leading-[20px] font-normal text-[#1e2348]">Expires in</Label>
                <Select value={newInviteExpiry} onValueChange={setNewInviteExpiry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[#E5E7EB] text-[#4B5563]">
                Cancel
              </Button>
              <Button onClick={handleCreateInvite} disabled={createInvite.isPending} className="bg-[#ff6b4d] hover:bg-[#fff0ed] hover:text-[#ff6b4d] text-white transition-colors">
                {createInvite.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Invite
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
          <div className="text-[24px] leading-[32px] font-medium text-[#ff6b4d]">{activeInvites.length}</div>
          <div className="text-[14px] leading-[20px] font-normal text-[#4B5563]">Active Invites</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
          <div className="text-[24px] leading-[32px] font-medium text-green-600">{usedInvites.length}</div>
          <div className="text-[14px] leading-[20px] font-normal text-[#4B5563]">Redeemed</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
          <div className="text-[24px] leading-[32px] font-medium text-[#9CA3AF]">{expiredOrRevokedInvites.length}</div>
          <div className="text-[14px] leading-[20px] font-normal text-[#4B5563]">Expired/Revoked</div>
        </div>
      </div>

      {/* Invites Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#9CA3AF]" />
        </div>
      ) : invites && invites.length > 0 ? (
        <div className="border border-[var(--dq-surface-border-default)] rounded-xl overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--dq-navy-950)] hover:bg-[var(--dq-navy-950)]">
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="text-white">Email Restriction</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Expires</TableHead>
                <TableHead className="text-white">Created By</TableHead>
                <TableHead className="text-white">Used By</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite, idx) => (
                <TableRow key={invite.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--dq-gray-50)]'} hover:bg-[var(--dq-gray-50)]`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {invite.role === 'admin' ? (
                        <Shield className="w-4 h-4 text-red-500" />
                      ) : (
                        <Presentation className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="capitalize text-[#1e2348]">{invite.role}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#4B5563]">
                    {invite.email || <span className="text-[#9CA3AF]">Any</span>}
                  </TableCell>
                  <TableCell>{getStatusBadge(invite)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-[#4B5563]">
                      <Clock className="w-3 h-3" />
                      {isPast(new Date(invite.expires_at)) 
                        ? format(new Date(invite.expires_at), 'MMM d, yyyy')
                        : formatDistanceToNow(new Date(invite.expires_at), { addSuffix: true })
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-[#4B5563]">
                      {invite.creator_profile?.full_name || invite.creator_profile?.email || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {invite.used_by_profile ? (
                      <span className="text-sm text-[#4B5563]">
                        {invite.used_by_profile.full_name || invite.used_by_profile.email}
                      </span>
                    ) : (
                      <span className="text-[#9CA3AF]">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!invite.used_at && !invite.revoked_at && !isPast(new Date(invite.expires_at)) && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyInviteLink(invite)}
                            className="border-[#E5E7EB] hover:bg-[#F5F6FA]"
                          >
                            {copiedId === invite.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeInvite.mutate(invite.id)}
                            disabled={revokeInvite.isPending}
                            className="border-[#E5E7EB] hover:bg-[#F5F6FA]"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border border-[#E5E7EB] rounded-xl bg-white">
          <UserPlus className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-[20px] leading-[28px] font-medium mb-2 text-[#1e2348]">No invites yet</h3>
          <p className="text-[14px] leading-[20px] font-normal text-[#4B5563] mb-4">
            Create your first invite to add admins or instructors
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-[#ff6b4d] hover:bg-[#fff0ed] hover:text-[#ff6b4d] text-white transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create Invite
          </Button>
        </div>
      )}
    </div>
  );
}
