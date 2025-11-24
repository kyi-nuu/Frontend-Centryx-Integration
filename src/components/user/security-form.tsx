
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Loader2, ShieldAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TwoFactorSetupDialog } from "./two-factor-setup-dialog";
import { useToast } from "@/hooks/use-toast";

export function SecurityForm() {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setIsDialogOpen(true);
    } else {
      // Here you would add logic to disable 2FA, possibly with a confirmation
      console.log("Disabling 2FA");
      setIsTwoFactorEnabled(false);
    }
  };

  const handleSetupSuccess = () => {
    setIsTwoFactorEnabled(true);
    setIsDialogOpen(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || localStorage.getItem('jwtToken') : null;
      const res = await fetch('https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/password/change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          old_password: currentPassword,
          new_password1: newPassword,
          new_password2: confirmPassword,
        }),
      });
      if (!res.ok) {
        let errorMsg = 'Could not update password.';
        try {
          const errorData = await res.json();
          errorMsg = JSON.stringify(errorData);
        } catch {}
        toast({ title: 'Error', description: errorMsg });
        setIsLoading(false);
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
    } catch (e) {
      toast({ title: 'Error', description: 'Could not update password.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset password fields to empty
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  return (
    <>
      <Card className="w-full max-w-4xl mx-auto border-0 shadow-none">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Alert className="border-primary/50 [&>svg]:text-primary">
            <ShieldAlert className="h-4 w-4" />
            <div className="flex items-center justify-between">
              <div>
                <AlertTitle className="text-primary">Two-Factor Authentication</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Enable 2FA to secure your account
                </AlertDescription>
              </div>
              <Switch 
                id="two-factor-auth" 
                checked={isTwoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
              />
            </div>
          </Alert>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" className="bg-input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" className="bg-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" className="bg-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update Security
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
      <TwoFactorSetupDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSetupSuccess}
      />
    </>
  );
}
