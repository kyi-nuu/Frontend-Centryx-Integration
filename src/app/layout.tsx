import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Centryx Vision',
  description: 'Unified Smart Lighting and CCTV Monitoring',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z%22 /><path d=%22M15.5 8.5a3.5 3.5 0 1 0-7 0%22 /><path d=%22M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z%22 /><path d=%22M8.5 15.5a3.5 3.5 0 1 0 7 0%22 /><path d=%22M12 2v2%22 /><path d=%22M12 20v2%22 /><path d=%22M22 12h-2%22 /><path d=%22M4 12H2%22 /></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
