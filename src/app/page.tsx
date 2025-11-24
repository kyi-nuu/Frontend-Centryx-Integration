import { AuthCard } from '@/components/auth/auth-card';
import { FeatureShowcase } from '@/components/feature-showcase';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
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
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
