
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { Loader2 } from 'lucide-react';
import { Logo } from '../logo';

const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: 'Your code must be 6 characters.' })
    .max(6, { message: 'Your code must be 6 characters.' }),
});

type TwoFactorFormProps = {
  email: string;
  onBack: () => void;
};

export function TwoFactorForm({ email, onBack }: TwoFactorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: 'Login Successful',
        description: "You're now logged in.",
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <CardHeader className="p-0 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the 6-digit code from your authenticator app.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456"
                    {...field}
                    maxLength={6}
                    className="h-14 text-center text-2xl tracking-[0.5em] bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full h-12" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & Continue
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
