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
import { ProductActions } from '@/components/products/ProductActions';

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

            <ProductActions
              productId={selectedProduct.id}
              isLiked={isLiked}
              onToggleLike={() => toggleLike(selectedProduct.id)}
              onRemove={() => {
                removeProduct(selectedProduct.id);
                router.push('/products');
              }}
              variant="page"
            />

            <Link href={`/products/${selectedProduct.id}/edit`}>
              <Button size="lg">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
