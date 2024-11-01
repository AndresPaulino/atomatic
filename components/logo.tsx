'use client';
import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/hooks/use-config';
import { useMediaQuery } from '@/hooks/use-media-query';
import DashCodeLogo from './dascode-logo';

const Logo = () => {
  const [config] = useConfig();
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  if (config.sidebar === 'compact') {
    return (
      <Link href='/dashboard' className='flex gap-2 items-center   justify-center    '>
        <DashCodeLogo />
      </Link>
    );
  }
  if (config.sidebar === 'two-column' || !isDesktop) return null;

  return <div className='flex gap-2 items-center'>{/* Your logo content without the Link wrapper */}</div>;
};

export default Logo;
