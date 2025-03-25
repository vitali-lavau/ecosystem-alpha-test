import { create } from 'zustand';
import { ProductStore } from '@/types/stores/productStore';
import { getProducts, getProductById } from '@/lib/api';

export const useProductStore = create<ProductStore>((set, get) => {
  const savedLikes =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('likedProductIds') || '[]')
      : [];

  const savedRemoved =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('removedProductIds') || '[]')
      : [];

  return {
    products: [],
    selectedProduct: null,
    loading: false,
    likedProductIds: savedLikes,
    removedProductIds: savedRemoved,

    async fetchProducts() {
      set({ loading: true });
      try {
        const data = await getProducts();
        const removed = get().removedProductIds;
        const filtered = data.filter((product) => !removed.includes(product.id));
        set({ products: filtered });
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

    toggleLike(id) {
      const current = get().likedProductIds;
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem('likedProductIds', JSON.stringify(updated));

      set({ likedProductIds: updated });
    },

    removeProduct(id) {
      const currentRemoved = get().removedProductIds;
      const updated = [...currentRemoved, id];

      localStorage.setItem('removedProductIds', JSON.stringify(updated));

      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        removedProductIds: updated,
      }));
    },
  };
});
