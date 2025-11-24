'use client';


import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { apiRequest } from '@/lib/api';


export function DashboardHeader() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await apiRequest('auth/user/', { method: 'GET' });
        setUser(data);
      } catch (e) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <Card className="p-3">
      <div className="flex items-start justify-between">
        <div className="text-left">
          <p className="font-semibold text-foreground text-sm">Welcome back,</p>
          <p className="text-xl text-muted-foreground font-bold">{user ? `${user.first_name} ${user.last_name}` : '...'}</p>
        </div>
        <Avatar className="h-10 w-10">
          {user?.profile_image ? (
            <AvatarImage src={user.profile_image} alt="User avatar" />
          ) : null}
          <AvatarFallback>
            {user
              ? `${(user.first_name?.[0] || '').toUpperCase()}${user.last_name ? ' ' + user.last_name[0].toUpperCase() : ''}`.trim() || user.username.slice(0,2).toUpperCase()
              : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-3 mt-2">
        {user?.is_superuser && (
          <Badge variant="outline" className="border-primary text-primary text-xs font-normal px-2 py-0.5">Admin</Badge>
        )}
        <div className="text-left">
          <p className="text-xs font-medium">{user ? user.email : '...'}</p>
          <p className="text-[10px] text-muted-foreground">Username: {user ? user.username : '...'}</p>
        </div>
      </div>
    </Card>
  );
}
