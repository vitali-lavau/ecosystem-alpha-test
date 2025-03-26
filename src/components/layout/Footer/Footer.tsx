'use client';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`footer py-4 bg-white border-t border-gray shadow-sm  ${className}`}>
      <div className="container">
        <div className="flex items-center justify-end">
          <p className="!m-0 !text-xs lg:text-sm text-text-custom">
            © 2024 Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
