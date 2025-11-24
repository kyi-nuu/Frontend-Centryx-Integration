import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from './header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            <DashboardHeader />
            {children}
        </main>
      </div>
    </div>
  );
}
