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
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    <div className="product-page py-6 lg:py-10">
      <div className="container">
        <div className="mb-4 lg:mb-6">
          <Button onClick={() => router.back()} variant="link">
            ← Back to products
          </Button>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 flex shrink-0 items-center justify-center mb-4 md:mb-0 md:mr-8 bg-white rounded-2xl">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.title}
              width={500}
              height={500}
              className="w-[80%] h-[80%] object-contain object-center rounded-md mix-blend-multiply"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="md-4 md:!mb-6">{selectedProduct.title}</h1>
            <p>{selectedProduct.description}</p>
            <p className="font-semibold">Price: ${selectedProduct.price}</p>
            <p>
              <span className="font-semibold">Category:</span>{' '}
              <span className="italic">{selectedProduct.category}</span>
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {selectedProduct.rating.rate} (
              {selectedProduct.rating.count} reviews)
            </p>

            <div className="flex gap-4 items-center mb-4 md:mb-6">
              <button
                onClick={() => toggleLike(selectedProduct.id)}
                title="Like"
                className="text-xl"
              >
                <FiHeart
                  className={`${isLiked ? 'text-red-500' : 'text-gray-400'} w-8 h-8 hover:text-red-500 transition duration-500`}
                />
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button title="Delete" className="text-xl text-gray-400 hover:text-red-600">
                    <FiTrash2 className="w-8 h-8 " />
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

            <Link href={`/products/${selectedProduct.id}/edit`}>
              <Button size="lg">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
