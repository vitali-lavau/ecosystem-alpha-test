import type { Product } from '@/types/product';

export interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  likedProductIds: number[];
  removedProductIds: number[];
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  toggleLike: (id: number) => void;
  removeProduct: (id: number) => void;
}
