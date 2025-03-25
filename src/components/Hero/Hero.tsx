'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="min-h-(--hero-min-height) flex flex-col justify-center items-start py-10">
          <div className="w-1/2">
            <h1>Discover, Like & Manage Products</h1>
            <p>
              Explore a curated collection of products from our API or add your own. Like what you
              love, filter what matters.
            </p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
