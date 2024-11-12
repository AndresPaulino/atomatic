// hooks/useClientAuth.ts
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useClientAuth(requireAuth = true) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = !!session;

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, requireAuth, isAuthenticated, router]);

  return {
    session,
    isLoading,
    isAuthenticated,
  };
}
