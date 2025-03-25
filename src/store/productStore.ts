import { create } from 'zustand';
import type { Product } from '@/types/product';
import { getProducts, getProductById } from '@/lib/api';

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProduct: null,
  loading: false,

  async fetchProducts() {
    set({ loading: true });
    try {
      const data = await getProducts();
      set({ products: data });
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    } finally {
      set({ loading: false });
    }
  },

  async fetchProductById(id) {
    set({ loading: true });
    try {
      const product = await getProductById(id);
      set({ selectedProduct: product });
    } catch (error) {
      console.error('Ошибка при получении продукта по ID:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
