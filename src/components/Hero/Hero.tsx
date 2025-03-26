'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import styles from '@/components/Hero/Hero.module.scss';

export default function Hero() {
  return (
    <div className="hero relative" style={{ backgroundImage: '/images/hero/hero-bg.png' }}>
      <div className="container">
        <div className="min-h-(--hero-min-height-mobile) lg:min-h-(--hero-min-height) flex flex-col justify-center items-start py-6 lg:py-10">
          <div className="w-full lg:w-1/2">
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

      <div className={`${styles.hero__bg} absolute top-0 l-0 h-full w-full z-[-1]`}>
        <Image
          src="/images/hero/hero-bg.png"
          width={3000}
          height={2000}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
