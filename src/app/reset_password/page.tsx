

'use client';
import { FeatureShowcase } from '@/components/feature-showcase';
import { ThemeToggle } from '@/components/theme-toggle';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-background overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="hidden bg-card lg:flex items-center justify-center p-12">
          <FeatureShowcase />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <ResetPasswordForm email="" onBack={() => window.location.href = '/'} onSuccess={() => window.location.href = '/'} />
          </div>
        </div>
      </div>
    </div>
  );
}
