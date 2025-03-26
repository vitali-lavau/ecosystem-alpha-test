'use client';

import { useForm } from 'react-hook-form';
import { useProductStore } from '@/store/productStore';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductsForm';

type NewProductForm = {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductForm>();
  const { addProduct } = useProductStore();
  const router = useRouter();

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
    router.push('/products');
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
