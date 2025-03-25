'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import Image from 'next/image';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedProduct, fetchProductById, loading, likedProductIds, toggleLike, removeProduct } =
    useProductStore();
  const isLiked = selectedProduct ? likedProductIds.includes(selectedProduct.id) : false;

  useEffect(() => {
    if (id) {
      void fetchProductById(Number(id));
    }
  }, [id, fetchProductById]);

  if (loading || !selectedProduct) {
    return <div className="p-10">Loading product...</div>;
  }

  return (
    <div className="container py-10">
      <button onClick={() => router.back()} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.title}
            width={500}
            height={500}
            className="w-full h-auto object-contain rounded-md"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedProduct.title}</h1>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <p className="text-lg font-semibold mb-2">Price: ${selectedProduct.price}</p>
          <p className="text-sm text-gray-500">
            Category: <span className="italic">{selectedProduct.category}</span>
          </p>
          <p className="text-sm text-gray-500">
            Rating: ⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
          </p>
          <div className="flex gap-4 items-center mb-6">
            <button onClick={() => toggleLike(selectedProduct.id)} title="Like" className="text-xl">
              <FiHeart className={isLiked ? 'text-red-500' : 'text-gray-400'} />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button title="Delete" className="text-xl text-gray-400 hover:text-red-600">
                  <FiTrash2 />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently remove this product from your list.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      removeProduct(selectedProduct.id);
                      router.push('/products');
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
