'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Logo } from '../logo';

const formSchema = z.object({
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'], // path of error
});


type ResetPasswordFormProps = {
  email?: string;
  uid: string;
  token: string;
  onBack: () => void;
  onSuccess: () => void;
};

export function ResetPasswordForm({ email, uid, token, onBack, onSuccess }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    fetch('https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/password/reset/confirm/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        token,
        new_password1: values.newPassword,
        new_password2: values.confirmPassword,
      }),
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          toast({
            title: 'Password Reset Successful',
            description: 'You can now log in with your new password.',
            variant: 'success',
          });
          onSuccess();
        } else {
          let errorText = await res.text();
          let showGeneric = false;
          try {
            const parsed = JSON.parse(errorText);
            // If the error is an object (e.g. {uid: [...]}) show generic message
            if (typeof parsed === 'object' && parsed !== null) {
              showGeneric = true;
            }
          } catch (e) {
            // Not JSON, show as is
          }
          toast({
            title: 'Error',
            description: showGeneric ? 'An unexpected error occurred.' : errorText || 'Failed to reset password.',
            variant: 'destructive',
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: 'Network Error',
          description: err.message || 'Network error.',
          variant: 'destructive',
        });
      });
  }

  return (
    <>
      <CardHeader className="p-0 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      {...field}
                      className="bg-input h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      {...field}
                      className="bg-input h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full h-12" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            Set New Password
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        <Button variant="link" size="sm" onClick={onBack} className="p-0 h-auto text-primary">
          Back to login
        </Button>
      </div>
    </>
  );
}
