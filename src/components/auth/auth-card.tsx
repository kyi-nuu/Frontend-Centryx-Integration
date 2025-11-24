'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LoginForm } from './login-form';
import { TwoFactorForm } from './two-factor-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { ResetPasswordForm } from './reset-password-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ClientOnly } from '../client-only';

export function AuthCard() {
  const [step, setStep] = useState<'login' | 'two-factor' | 'forgot-password' | 'reset-password'>('login');
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setStep('two-factor');
  };

  const handleForgotPasswordClick = () => {
    setStep('forgot-password');
  };
  
  const handleResetLinkSent = (email: string) => {
    setUserEmail(email);
    setStep('reset-password');
  };

  const handlePasswordResetSuccess = () => {
    setStep('login');
  };

  const handleBackToLogin = () => {
    setStep('login');
  };

  return (
    <Card className="w-full max-w-sm bg-transparent border-0 shadow-none">
      <CardContent className="p-0">
        <ClientOnly>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {step === 'login' && <LoginForm onSuccess={handleLoginSuccess} onForgotPassword={handleForgotPasswordClick} />}
              {step === 'two-factor' && <TwoFactorForm email={userEmail} onBack={handleBackToLogin} />}
              {step === 'forgot-password' && <ForgotPasswordForm onBack={handleBackToLogin} onResetLinkSent={handleResetLinkSent} />}
              {step === 'reset-password' && <ResetPasswordForm email={userEmail} onBack={handleBackToLogin} onSuccess={handlePasswordResetSuccess} />}
            </motion.div>
          </AnimatePresence>
        </ClientOnly>
      </CardContent>
    </Card>
  );
}
