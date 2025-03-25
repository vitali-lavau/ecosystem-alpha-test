'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import type { Product } from '@/types/product';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedProduct, fetchProductById, updateProduct, loading } = useProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (id) {
      void fetchProductById(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedProduct) {
      reset(selectedProduct);
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data: Product) => {
    updateProduct({ ...data, id: Number(id) });
    router.push(`/products/${id}`);
  };

  if (loading || !selectedProduct) {
    return <p className="p-6">Loading product...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register('title', { required: true })} placeholder="Product title" />
          {errors.title && <p className="text-sm text-red-500 mt-1">Title is required</p>}
        </div>

        <div>
          <Textarea {...register('description', { required: true })} placeholder="Description" />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">Description is required</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            step="0.01"
            {...register('price', { required: true, min: 0 })}
            placeholder="Price"
          />
          {errors.price && <p className="text-sm text-red-500 mt-1">Valid price is required</p>}
        </div>

        <div>
          <Input {...register('category', { required: true })} placeholder="Category" />
          {errors.category && <p className="text-sm text-red-500 mt-1">Category is required</p>}
        </div>

        <div>
          <Input {...register('image', { required: true })} placeholder="Image URL" />
          {errors.image && <p className="text-sm text-red-500 mt-1">Image URL is required</p>}
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
