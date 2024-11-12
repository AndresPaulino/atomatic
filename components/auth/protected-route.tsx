// components/auth/protected-route.tsx
import { getServerSession } from '@/hooks/auth';
import { redirect } from 'next/navigation';

export async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth/login');
  }

  return <>{children}</>;
}
