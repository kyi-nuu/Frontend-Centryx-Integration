
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


type ProfileData = {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  avatarUrl: string | null;
};


const initialProfile: ProfileData = {
  username: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  avatarUrl: null,
};


export function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [savedProfile, setSavedProfile] = useState<ProfileData>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user info on mount
  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || localStorage.getItem('jwtToken') : null;
        const res = await fetch('https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/user/', {
          headers: {
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch user info');
        const data = await res.json();
        setProfile({
          username: data.username || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          avatarUrl: data.profile_image || null,
        });
        setSavedProfile({
          username: data.username || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          avatarUrl: data.profile_image || null,
        });
      } catch (e) {
        toast({ title: 'Error', description: 'Could not load profile info.' });
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || localStorage.getItem('jwtToken') : null;
      let hasImage = false;
      let file: File | null = null;
      if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        file = fileInputRef.current.files[0];
        hasImage = true;
      }
      let res;
      if (hasImage) {
        // Use multipart/form-data for image upload (and optionally other fields)
        const formData = new FormData();
        formData.append('profile_image', file!);
        formData.append('first_name', profile.first_name);
        formData.append('last_name', profile.last_name);
        if (profile.username !== savedProfile.username) {
          formData.append('username', profile.username);
        }
        if (profile.phone_number !== savedProfile.phone_number) {
          formData.append('phone_number', profile.phone_number);
        }
        res = await fetch('https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/user/', {
          method: 'PATCH',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            // 'Content-Type' will be set automatically by the browser for FormData
          },
          credentials: 'include',
          body: formData,
        });
      } else {
        // Use JSON if no image is being uploaded
        const payload: any = {
          first_name: profile.first_name,
          last_name: profile.last_name,
        };
        if (profile.username !== savedProfile.username) {
          payload.username = profile.username;
        }
        if (profile.phone_number !== savedProfile.phone_number) {
          payload.phone_number = profile.phone_number;
        }
        res = await fetch('https://frowsily-hunterlike-eneida.ngrok-free.dev/auth/user/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        let errorMsg = 'Could not update profile info.';
        try {
          const errorData = await res.json();
          errorMsg = JSON.stringify(errorData);
        } catch {}
        toast({ title: 'Error', description: errorMsg });
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setSavedProfile({
        ...profile,
        avatarUrl: data.profile_image || profile.avatarUrl,
      });
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully saved.',
      });
    } catch (e) {
      toast({ title: 'Error', description: 'Could not update profile info.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(savedProfile);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your public profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={handleInputChange}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={profile.first_name}
                onChange={handleInputChange}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={profile.last_name}
                onChange={handleInputChange}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="tel"
                value={profile.phone_number}
                onChange={handleInputChange}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                className="bg-input"
                disabled
              />
            </div>
          </div>

          <div className="space-y-4 flex flex-col items-center justify-start md:pt-8">
            <Label>Profile Picture</Label>
            <div className="relative">
              <Avatar className="h-40 w-40">
                <AvatarImage src={profile.avatarUrl || ''} alt="User avatar" data-ai-hint="person face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="default"
                className="absolute bottom-2 right-2 rounded-full h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-2 mt-8">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
