'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/products/ProductsCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProductsPage() {
  const { products, fetchProducts, loading, likedProductIds } = useProductStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState<number | 'all'>(6);

  useEffect(() => {
    if (products.length === 0) {
      void fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const filteredProducts = showFavorites
    ? products.filter((product) => likedProductIds.includes(product.id))
    : products;

  const totalPages =
    productsPerPage === 'all' ? 1 : Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = productsPerPage === 'all' ? 0 : (currentPage - 1) * productsPerPage;
  const paginatedProducts =
    productsPerPage === 'all'
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [showFavorites]);

  return (
    <div className="products-page py-6 lg:py-10">
      <div className="container">
        <div className="flex items-center mb-4 lg:mb-6">
          <h1 className="!mb-0">Products</h1>
        </div>

        <div className="flex items-center mb-4 lg:mb-6 gap-4">
          <Select
            defaultValue="6"
            onValueChange={(value) => {
              setCurrentPage(1);
              setProductsPerPage(value === 'all' ? 'all' : parseInt(value));
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 per page</SelectItem>
              <SelectItem value="12">12 per page</SelectItem>
              <SelectItem value="24">24 per page</SelectItem>
              <SelectItem value="32">32 per page</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setShowFavorites((prev) => !prev)}
            className="text-sm px-4 py-2 rounded-md border hover:bg-gray-100 transition"
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        {loading && <p>Loading products...</p>}

        {!loading && paginatedProducts.length === 0 && <p>No products to display.</p>}

        <div className="flex flex-wrap gap-y-4 md:gap-4 lg:gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-full md:w-[calc(100%/2-8px)] lg:w-[calc(100%/3-16px)]"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 lg:mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem className="cursor-pointer">
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i} className="cursor-pointer">
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem className="cursor-pointer">
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
