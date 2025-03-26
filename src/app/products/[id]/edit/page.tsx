'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import type { Product } from '@/types/product';
import { ProductForm } from '@/components/products/ProductsForm';

type ProductFormData = Omit<Product, 'id' | 'rating'>;

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedProduct, fetchProductById, updateProduct, loading } = useProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  useEffect(() => {
    if (id) {
      void fetchProductById(Number(id));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [id]);

  useEffect(() => {
    if (selectedProduct) {
      const formData = (({ id, rating, ...rest }) => rest)(selectedProduct);
      reset(formData);
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    updateProduct({
      ...data,
      id: Number(id),
      rating: selectedProduct?.rating || { rate: 0, count: 0 },
    });
    router.push(`/products/${id}`);
  };

  if (loading || !selectedProduct) {
    return <p className="p-6">Loading product...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1>Edit Product</h1>
      <ProductForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        isEdit
      />
    </div>
  );
}
