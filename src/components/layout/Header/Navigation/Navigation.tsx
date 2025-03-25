'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  return (
    <nav>
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
