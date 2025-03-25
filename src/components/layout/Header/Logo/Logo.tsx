'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
    </Link>
  );
}
