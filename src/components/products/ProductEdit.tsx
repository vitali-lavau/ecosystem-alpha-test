'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProductStore } from '@/store/productStore';
import type { Product } from '@/types/product';
import { ProductForm } from '@/components/products/ProductsForm';

type ProductFormData = Omit<Product, 'id' | 'rating'>;

interface ProductsEditProps {
  productId: number;
  onBack: () => void;
}

export default ({ productId, onBack }: ProductsEditProps) => {
  const { selectedProduct, fetchProductById, updateProduct, loading } = useProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  useEffect(() => {
    void fetchProductById(productId);
  }, [productId]);

  useEffect(() => {
    if (selectedProduct) {
      const { id, rating, ...formData } = selectedProduct;
      reset(formData);
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    updateProduct({
      ...data,
      id: productId,
      rating: selectedProduct?.rating || { rate: 0, count: 0 },
    });
    onBack();
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
};