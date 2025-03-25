'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import { useRouter } from 'next/navigation';

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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
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
          Create Product
        </Button>
      </form>
    </div>
  );
}
