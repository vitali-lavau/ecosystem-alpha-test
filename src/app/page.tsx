'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import ProductCatalog from '@/components/products/ProductCatalog';
import ProductDetails from '@/components/products/ProductDetails';
import ProductsCreate from '@/components/products/ProductsCreate';
import ProductEdit from '@/components/products/ProductEdit';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { selectedProduct, setSelectedProduct } = useProductStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setShowCreateForm(false);
    setEditMode(false);
  };

  return (
    <div className="app py-6 lg:py-10">
      <div className="container">
        {selectedProduct && editMode ? (
          <>
            <Button onClick={handleBackToCatalog} variant="link">
              ← Back to catalog
            </Button>
            <ProductEdit productId={selectedProduct.id} onBack={handleBackToCatalog} />
          </>
        ) : selectedProduct ? (
          <>
            <Button onClick={handleBackToCatalog} variant="link" className="!mb-6">
              ← Back to catalog
            </Button>
            <ProductDetails onEdit={() => setEditMode(true)} />
          </>
        ) : showCreateForm ? (
          <>
            <Button onClick={handleBackToCatalog} variant="link">
              ← Back to catalog
            </Button>
            <ProductsCreate onSuccess={handleBackToCatalog} />
          </>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button onClick={() => setShowCreateForm(true)}>+ Add Product</Button>
            </div>
            <ProductCatalog />
          </>
        )}
      </div>
    </div>
  );
}
