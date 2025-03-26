'use client';

import Logo from '@/components/layout/Header/Logo/Logo';
import Navigation from '@/components/layout/Header/Navigation/Navigation';
import NavigationMobile from '@/components/layout/Header/NavigationMobile/NavigationMobile';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`header py-2 lg:py-4 bg-white border-b border-gray shadow-sm ${className}`}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo className="w-7 h-12 lg:w-12 lg:h-17" />
          <Navigation className="hidden lg:block" />
          <NavigationMobile className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
