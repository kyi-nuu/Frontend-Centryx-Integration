'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Phone, Trash2, Mail } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AddUserDialog } from './add-user-dialog';
import { DeleteDeviceDialog } from '../settings/delete-device-dialog';
import { useToast } from '@/hooks/use-toast';
import { fetchAllUsers } from '@/lib/api';
import { apiRequest } from '@/lib/api';

export type Role = 'admin' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  role?: Role;
};

// Initial empty, will fetch from backend
const initialUsersData: User[] = [];

function UserRow({ user, onDelete }: { user: User; onDelete: () => void }) {
  return (
    <Card className="bg-secondary/30 transition-all hover:bg-secondary/50 hover:shadow-md">
      <CardContent className="p-3 flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 items-center gap-x-4 gap-y-1">
          <p className="font-semibold text-sm text-foreground">{user.name}</p>
          <div className='flex items-center gap-1.5'>
            <Mail className="h-3 w-3 text-muted-foreground" />
            <a href={`mailto:${user.email}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {user.email}
            </a>
          </div>
          <div className='flex items-center gap-1.5'>
            <Phone className="h-3 w-3 text-muted-foreground" />
            <a href={`tel:${user.phone}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {user.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                'text-[10px] capitalize px-2 py-0.5',
                user.status === 'active'
                  ? 'border-green-500/50 bg-transparent text-green-400'
                  : 'border-transparent bg-muted text-muted-foreground'
              )}
              variant="outline"
            >
              {user.status}
            </Badge>
            {/* Optionally, you can keep the role badge or remove it if not needed */}
            {/* <Badge variant="outline" className="text-[10px] capitalize px-2 py-0.5">
              {user.role}
            </Badge> */}
            <DeleteDeviceDialog onConfirm={onDelete}>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DeleteDeviceDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from backend on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAllUsers()
      .then(data => {
        // Debug: log the raw data
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log('Fetched users data:', data);
        }
        // Map backend user fields to User type
        const mappedUsers: User[] = (data.results || []).map((u: any) => {
          const name = (u.first_name && u.last_name)
            ? `${u.first_name} ${u.last_name}`.trim()
            : (u.first_name || u.last_name || u.username || '');
          return {
            id: String(u.pk),
            name,
            email: u.email,
            phone: u.phone_number || '',
            avatarUrl: u.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
            status: u.is_active ? 'active' : 'inactive',
            role: u.is_superuser ? 'admin' : 'user',
          };
        });
        setUsers(mappedUsers);
      })
      .catch(err => {
        setError('Failed to fetch users.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddUser = (newUser: Omit<User, 'id' | 'avatarUrl' | 'status'>) => {
    const firstLetter = newUser.name ? newUser.name.trim()[0] : '';
    const user: User = {
      ...newUser,
      id: `usr${Date.now()}`,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}`,
      status: 'active'
    };
    setUsers(prev => [user, ...prev]);
  };
  
  const handleDeleteUser = async (userPk: number) => {
    const userToDelete = users.find(u => Number(u.id) === userPk);
    try {
      await apiRequest(`integration/users/${userPk}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setUsers(prev => prev.filter(user => Number(user.id) !== userPk));
      if (userToDelete) {
        toast({
          title: "User Deleted",
          description: `${userToDelete.name} has been removed from the system.`,
          variant: "destructive"
        });
      }
    } catch (e) {
      toast({
        title: "Delete Failed",
        description: `Could not delete user. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => {
      if (filter === 'all') return true;
      if (filter === 'active') return user.status === 'active';
      if (filter === 'inactive') return user.status === 'inactive';
      if (filter === 'admin') return user.role === 'admin';
      return true;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">User Management</h2>
          <p className="text-sm text-muted-foreground">Manage users and their permissions</p>
        </div>
         <AddUserDialog onAddUser={handleAddUser} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 bg-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading users...</div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">{error}</div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No users found.</p>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map(user => (
                <UserRow key={user.id} user={user} onDelete={() => handleDeleteUser(Number(user.id))} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
