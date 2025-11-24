import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-muted/40">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-24">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
