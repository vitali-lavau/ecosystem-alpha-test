'use client';

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
import { cn } from '@/lib/utils'; // если есть класс merge, иначе можно не использовать
import { Component } from 'react';

interface ProductActionsProps {
  productId: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onRemove: () => void;
  variant?: 'card' | 'page';
}

export class ProductActions extends Component<ProductActionsProps> {
  render() {
    const { isLiked, onToggleLike, onRemove, variant = 'card' } = this.props;

    const isCard = variant === 'card';
    const iconSize = isCard ? 'w-5 h-5' : 'w-8 h-8';
    const containerClass = isCard
      ? 'absolute top-0 right-0 py-2 px-4 border-b border-l border-accent-custom rounded-bl-2xl bg-white'
      : 'flex gap-4 items-center mt-4 mb-6';

    return (
      <div className={cn('flex items-center gap-4', containerClass)}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          title="Like"
          aria-label="Toggle like"
        >
          <FiHeart
            className={`${isLiked ? 'text-red-500' : 'text-gray-400'} ${iconSize} hover:text-red-500 transition duration-500`}
          />
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button onClick={(e) => e.stopPropagation()} title="Delete" aria-label="Delete product">
              <FiTrash2 className={`text-xl text-gray-400 hover:text-red-600 ${iconSize}`} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This product will be removed from the list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRemove}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
}
