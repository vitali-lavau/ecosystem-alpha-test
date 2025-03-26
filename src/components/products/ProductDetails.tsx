'use client';

import Image from 'next/image';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/button';
import { ProductActions } from '@/components/products/ProductActions';

interface ProductDetailsProps {
  onEdit: () => void;
}

export default ({ onEdit }: ProductDetailsProps) => {
  const { selectedProduct, likedProductIds, toggleLike, removeProduct, setSelectedProduct } =
    useProductStore();
  const isLiked = selectedProduct ? likedProductIds.includes(selectedProduct.id) : false;

  if (!selectedProduct) {
    return <div className="p-10">Product not found.</div>;
  }

  return (
    <div className="product-page">
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
              setSelectedProduct(null);
            }}
            variant="page"
          />

          <Button size="lg" onClick={onEdit} className="mt-4">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
