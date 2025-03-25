'use client';

import Logo from '@/components/layout/Header/Logo/Logo';
import Navigation from '@/components/layout/Header/Navigation/Navigation';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`header py-4 bg-white border-b border-gray shadow-sm ${className}`}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  );
}
