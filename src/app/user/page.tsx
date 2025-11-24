"use client";

import { useEffect } from 'react';
import { requireAuth } from '@/lib/auth';

import { useState } from 'react';
import { UserHeader } from '@/components/user/user-header';
import { ProfileForm } from '@/components/user/profile-form';
import { SecurityForm } from '@/components/user/security-form';
import { UserManagement } from '@/components/user/user-management';

export type ActiveTab = 'profile' | 'security' | 'users';

export default function UserPage() {
  useEffect(() => { requireAuth('/'); }, []);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  return (
    <div className="flex flex-col h-full">
      <UserHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'security' && <SecurityForm />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
}
