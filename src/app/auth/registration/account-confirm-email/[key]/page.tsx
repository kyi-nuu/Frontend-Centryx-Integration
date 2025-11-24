
"use client";
"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';

export default function AccountConfirmEmailPage({ params }: { params: Promise<{ key: string }> }) {
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const { key } = use(params);
  const { toast } = useToast();

  useEffect(() => {
    async function verifyEmail() {
      const decodedKey = decodeURIComponent(key);
      console.log("Verifying email with key:", decodedKey);
      try {
        const res = await fetch(`https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/registration/verify-email/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: decodedKey }),
        });
        console.log("Verification response status:", res.status);
        const responseText = await res.text();
        console.log("Verification response body:", responseText);
        if (res.status === 200) {
          setStatus('success');
          setMessage('Your account has been activated successfully!');
          toast({
            title: 'Account Activated',
            description: 'Your account has been activated successfully!',
            variant: 'success',
          });
          setTimeout(() => {
            window.location.href = 'http://localhost:9002/';
          }, 2000);
        } else if (res.status === 404) {
          setStatus('error');
          setMessage('Activation was unsuccessful.');
          toast({
            title: 'Activation Failed',
            description: 'Activation was unsuccessful.',
            variant: 'destructive',
          });
        } else {
          setStatus('error');
          setMessage('An unexpected error occurred.');
          toast({
            title: 'Error',
            description: 'An unexpected error occurred.',
            variant: 'destructive',
          });
        }
      } catch (err) {
        console.error("Verification fetch error:", err);
        setStatus('error');
        setMessage('Network error.');
        toast({
          title: 'Network Error',
          description: 'Network error.',
          variant: 'destructive',
        });
      }
    }
    verifyEmail();
  }, [key, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="p-0 pb-8 text-center flex items-center">
          <Logo />
          <CardDescription className="text-muted-foreground pt-2">
            Smart Lighting & CCTV Control Platform
          </CardDescription>
        </CardHeader>
        <div className="py-6 text-center">
          {status === 'pending' && <p>Verifying your account...</p>}
          {status !== 'pending' && <p>{message}</p>}
        </div>
      </Card>
    </div>
  );
}
