'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { UseFormRegister, FieldErrors, SubmitHandler } from 'react-hook-form';
import type { Product } from '@/types/product';
import React, { Component } from 'react';

type ProductFormData = Omit<Product, 'id' | 'rating'>;

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  handleSubmit: (onValid: SubmitHandler<ProductFormData>) => (e?: React.BaseSyntheticEvent) => void;
  isEdit?: boolean;
}

export class ProductForm extends Component<ProductFormProps> {
  static defaultProps = { isEdit: false };

  render() {
    let { onSubmit, register, errors, handleSubmit, isEdit } = this.props;
    return (
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
          {isEdit ? 'Save Changes' : 'Create Product'}
        </Button>
      </form>
    );
  }
}
