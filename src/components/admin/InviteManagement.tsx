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
    return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
  };

  const activeInvites = invites?.filter(i => !i.used_at && !i.revoked_at && !isPast(new Date(i.expires_at))) || [];
  const usedInvites = invites?.filter(i => i.used_at) || [];
  const expiredOrRevokedInvites = invites?.filter(i => !i.used_at && (i.revoked_at || isPast(new Date(i.expires_at)))) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Invite Management</h2>
          <p className="text-sm text-muted-foreground">
            Generate invite links for new admins and instructors
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invite</DialogTitle>
              <DialogDescription>
                Generate an invite link for a new admin or instructor.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Role</Label>
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
                <Label>Email (optional)</Label>
                <Input
                  type="email"
                  placeholder="Restrict to specific email"
                  value={newInviteEmail}
                  onChange={(e) => setNewInviteEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  If set, only this email can use the invite
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Expires in</Label>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvite} disabled={createInvite.isPending}>
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
        <div className="bg-card rounded-xl p-4 border">
          <div className="text-2xl font-semibold text-blue-600">{activeInvites.length}</div>
          <div className="text-sm text-muted-foreground">Active Invites</div>
        </div>
        <div className="bg-card rounded-xl p-4 border">
          <div className="text-2xl font-semibold text-green-600">{usedInvites.length}</div>
          <div className="text-sm text-muted-foreground">Redeemed</div>
        </div>
        <div className="bg-card rounded-xl p-4 border">
          <div className="text-2xl font-semibold text-muted-foreground">{expiredOrRevokedInvites.length}</div>
          <div className="text-sm text-muted-foreground">Expired/Revoked</div>
        </div>
      </div>

      {/* Invites Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : invites && invites.length > 0 ? (
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Email Restriction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Used By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {invite.role === 'admin' ? (
                        <Shield className="w-4 h-4 text-red-500" />
                      ) : (
                        <Presentation className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="capitalize">{invite.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {invite.email || <span className="text-muted-foreground">Any</span>}
                  </TableCell>
                  <TableCell>{getStatusBadge(invite)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3" />
                      {isPast(new Date(invite.expires_at)) 
                        ? format(new Date(invite.expires_at), 'MMM d, yyyy')
                        : formatDistanceToNow(new Date(invite.expires_at), { addSuffix: true })
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {invite.creator_profile?.full_name || invite.creator_profile?.email || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {invite.used_by_profile ? (
                      <span className="text-sm">
                        {invite.used_by_profile.full_name || invite.used_by_profile.email}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
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
        <div className="text-center py-12 border rounded-xl">
          <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No invites yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first invite to add admins or instructors
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Invite
          </Button>
        </div>
      )}
    </div>
  );
}
