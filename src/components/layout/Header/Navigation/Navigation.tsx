'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/create-product', label: 'Create Product' },
  { href: '/about', label: 'About' },
];

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-heading uppercase text-text-custom font-semibold text-lg transition duration-400 hover:text-primary-custom"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
