'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const [passwordType, setPasswordType] = React.useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success('Successfully logged in!');
        router.push('/dashboard');
        router.refresh();
      } catch (error) {
        toast.error('An error occurred during login');
        console.error('Login error:', error);
      }
    });
  };

  const handleGoogleSignIn = async () => {
    startTransition(async () => {
      try {
        await signIn('google', { callbackUrl: '/dashboard' });
      } catch (error) {
        toast.error('An error occurred with Google sign in');
        console.error('Google sign in error:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-5 2xl:mt-7 space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email' className='font-medium text-default-600'>
          Email
        </Label>
        <Input
          size='lg'
          disabled={isPending}
          {...register('email')}
          type='email'
          id='email'
          className={cn('', {
            'border-destructive': errors.email,
          })}
        />
        {errors.email && <div className='text-destructive text-sm'>{errors.email.message}</div>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password' className='font-medium text-default-600'>
          Password
        </Label>
        <div className='relative'>
          <Input size='lg' disabled={isPending} {...register('password')} type={passwordType} id='password' className='peer' />
          <button
            type='button'
            className='absolute top-1/2 -translate-y-1/2 right-4 text-default-400'
            onClick={togglePasswordType}
          >
            <Icon icon={passwordType === 'password' ? 'heroicons:eye' : 'heroicons:eye-slash'} className='w-5 h-5' />
          </button>
        </div>
        {errors.password && <div className='text-destructive text-sm'>{errors.password.message}</div>}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <Checkbox id='remember' {...register('remember')} />
          <Label htmlFor='remember'>Keep Me Signed In</Label>
        </div>
        <Link href='/forgot-password' className='text-sm text-default-800 dark:text-default-400 leading-6 font-medium'>
          Forgot Password?
        </Link>
      </div>

      <Button fullWidth type='submit' disabled={isPending}>
        {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>

      <Button type='button' variant='outline' fullWidth onClick={handleGoogleSignIn} disabled={isPending}>
        <Icon icon='flat-color-icons:google' className='mr-2 h-5 w-5' />
        Continue with Google
      </Button>
    </form>
  );
};

export default LoginForm;
