'use client';

import { useForm } from 'react-hook-form';
import { useProductStore } from '@/store/productStore';
import { ProductForm } from '@/components/products/ProductsForm';

type NewProductForm = {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

interface ProductsCreateProps {
  onSuccess: () => void;
}

export default function ProductsCreate({ onSuccess }: ProductsCreateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductForm>();

  const { addProduct } = useProductStore();

  const onSubmit = (data: NewProductForm) => {
    const newProduct = {
      ...data,
      id: Date.now(),
      rating: {
        rate: 0,
        count: 0,
      },
    };

    addProduct(newProduct);
    onSuccess(); // вернуться назад к каталогу
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1>Create New Product</h1>
      <ProductForm
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
