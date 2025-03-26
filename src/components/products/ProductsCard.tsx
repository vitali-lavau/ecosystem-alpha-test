'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';
import { useProductStore } from '@/store/productStore';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { likedProductIds, toggleLike, removeProduct } = useProductStore();
  const isLiked = likedProductIds.includes(product.id);
  const router = useRouter();

  const [dialogOpen] = useState(false);

  const handleCardClick = () => {
    if (!dialogOpen) {
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <div
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

      <div className="absolute top-0 right-0 flex items-center gap-4 py-2 px-4 border-b border-l border-accent-custom rounded-bl-2xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product.id);
          }}
          title="Like"
        >
          <FiHeart
            className={`${isLiked ? 'text-red-500' : 'text-gray-400'} w-5 h-5 hover:text-red-500 transition duration-500`}
          />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-xl text-gray-400 hover:text-red-600"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This product will be removed from the list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeProduct(product.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
