'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/images/logo.png"
        width={50}
        height={70}
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </Link>
  );
}
