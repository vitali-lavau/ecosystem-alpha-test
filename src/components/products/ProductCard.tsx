'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';
import { useProductStore } from '@/store/productStore';
import { motion } from 'framer-motion';
import { ProductActions } from '@/components/products/ProductActions';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { likedProductIds, toggleLike, removeProduct, setSelectedProduct } = useProductStore();
  const isLiked = likedProductIds.includes(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product); // теперь это действие вместо router.push
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleCardClick}
      className={`${className} relative flex flex-col border border-accent-custom rounded-2xl cursor-pointer shadow-sm bg-white transition duration-500 transform-gpu hover:-translate-y-2`}
    >
      <div className="shrink-0 py-3 lg:py-4 border-b border-accent-custom">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-40 object-contain object-center mix-blend-multiply"
          priority
        />
      </div>

      <div className="flex-1 flex flex-col p-3 lg:p-4">
        <h3>{product.title}</h3>
        <p className="!mt-auto line-clamp-2">{product.description}</p>
        <p>
          <b>Category:</b> {product.category}
        </p>
        <p className="!mb-0 !text-base lg:!text-lg font-semibold lg:font-bold text-primary-custom text-right">
          ${product.price}
        </p>
      </div>

      <ProductActions
        productId={product.id}
        isLiked={isLiked}
        onToggleLike={() => toggleLike(product.id)}
        onRemove={() => removeProduct(product.id)}
        variant="card"
      />
    </motion.div>
  );
}
