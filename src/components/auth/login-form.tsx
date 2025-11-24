'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { login as apiLogin } from '@/lib/api';
import { Eye, EyeOff, Lightbulb, Shield, Video } from 'lucide-react';
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
import { Loader2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Logo } from '../logo';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
  remember: z.boolean().default(false),
});

type LoginFormProps = {
  onSuccess: (email: string) => void;
  onForgotPassword: () => void;
};

export function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      // Call backend login API
      const data = await apiLogin(values.username, values.password);
      // Show success flash for a successful login (even if 2FA is required)
      try {
        toast({
          title: 'Login Successful',
          description: 'You have successfully signed in.',
          variant: 'success',
        });
      } catch (e) {
        // ignore toast errors
      }

      // If backend returned tokens (access+refresh or legacy token), skip 2FA and go to dashboard
      if (data && ((data.access && data.refresh) || data.token)) {
        router.push('/dashboard');
        return;
      }

      // Otherwise continue to 2FA step
      onSuccess(values.username);
    } catch (err: any) {
      let message = 'Login failed';
      if (err && err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed.non_field_errors && Array.isArray(parsed.non_field_errors)) {
            message = parsed.non_field_errors.join(' ');
          } else if (typeof parsed.detail === 'string') {
            message = parsed.detail;
          }
        } catch {
          message = err.message;
        }
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <CardHeader className="p-0 pb-8 text-center flex items-center">
        <Logo />
        <CardDescription className="text-muted-foreground pt-2">
          Smart Lighting & CCTV Control Platform
        </CardDescription>
      </CardHeader>
      <div className="flex justify-center gap-4 mb-6">
        <Button variant="outline" className="bg-secondary hover:bg-secondary/80 text-foreground">
          <Lightbulb className="mr-2 h-4 w-4 text-blue-400" /> Smart Lights
        </Button>
        <Button variant="outline" className="bg-secondary hover:bg-secondary/80 text-foreground">
          <Video className="mr-2 h-4 w-4 text-green-400" /> CCTV
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {error && (
            <div className="text-red-500 text-sm text-center pb-2 whitespace-pre-line">{error}</div>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} className="bg-input h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-input h-9 pr-10"
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
          <div className="flex items-center justify-between pt-1">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={onForgotPassword}
              className="p-0 h-auto text-primary"
            >
              Forgot password?
            </Button>
          </div>
          <Button type="submit" size="default" className="w-full h-9 text-base font-semibold" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Shield />}
            Sign In
          </Button>
        </form>
      </Form>
       <div className="mt-4 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          Secured with 2FA Authentication
        </p>
      </div>
    </>
  );
}
