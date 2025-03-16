"use client";

import { useAuth } from "@/contexts/auth-context";
import { UserProfile } from "@/components/UserProfile";
import { LoginForm } from "@/components/auth/AuthForms";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Optionally redirect to login page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      // Optional: Uncomment to redirect
      // router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-muted-foreground">
            Sign in to access your profile and manage your account
          </p>
        </div>

        <LoginForm />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <UserProfile />
      </div>
    </main>
  );
}
