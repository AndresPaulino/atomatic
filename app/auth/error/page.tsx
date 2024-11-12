// app/auth/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link was invalid or has expired.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-destructive mb-4'>Authentication Error</h1>
        <p className='text-lg text-default-600 mb-8'>{getErrorMessage(error || '')}</p>
        <Button asChild>
          <Link href='/auth/login'>Try Again</Link>
        </Button>
      </div>
    </div>
  );
}
