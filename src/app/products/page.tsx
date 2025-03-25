'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/products/ProductsCard';

export default function ProductsPage() {
  const { products, fetchProducts, loading, likedProductIds } = useProductStore();
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = showFavorites
    ? products.filter((product) => likedProductIds.includes(product.id))
    : products;

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="text-sm px-4 py-2 rounded-md border hover:bg-gray-100 transition"
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>

      {loading && <p>Loading products...</p>}

      {filteredProducts.length === 0 && !loading && <p>No products to display.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
