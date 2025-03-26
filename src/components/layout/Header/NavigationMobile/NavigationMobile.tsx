'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface NavigationMobileProps {
  className?: string;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/create-product', label: 'Create Product' },
  { href: '/about', label: 'About' },
];

export default function NavigationMobile({ className }: NavigationMobileProps) {
  const [open, setOpen] = useState(false);

  const handleNavigationMobile = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {NAV_LINKS.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link
                onClick={handleNavigationMobile}
                href={link.href}
                className="font-heading uppercase text-text-custom font-semibold transition duration-400 hover:text-primary-custom"
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
