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
}

export function ProductCard({ product }: ProductCardProps) {
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
    <div onClick={handleCardClick} className="cursor-pointer">
      <div className="border p-4 rounded-md shadow-sm bg-white hover:shadow-md transition">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-40 object-contain mb-4"
          priority
        />

        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>

        <div className="flex justify-end gap-2 mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
            className="text-xl"
            title="Like"
          >
            <FiHeart className={isLiked ? 'text-red-500' : 'text-gray-400'} />
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
                <FiTrash2 />
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

        <p className="text-base font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
}
