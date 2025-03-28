'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { ProductCard } from '@/components/products/ProductCard';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProductCatalog() {
  const { products, fetchProducts, loading, likedProductIds } = useProductStore();

  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState<number | 'all'>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    if (products.length === 0) {
      void fetchProducts();
    }
  }, [products.length, fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [showFavorites, selectedCategory, minPrice, maxPrice]);

  let filteredProducts = products;

  if (showFavorites) {
    filteredProducts = filteredProducts.filter((p) => likedProductIds.includes(p.id));
  }

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= parseFloat(maxPrice));
  }

  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const totalPages =
    productsPerPage === 'all' ? 1 : Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = productsPerPage === 'all' ? 0 : (currentPage - 1) * productsPerPage;
  const paginatedProducts =
    productsPerPage === 'all'
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="products-page">
      <div className="container">
        <div className="mb-4 lg:mb-6 flex justify-between items-center flex-wrap gap-4">
          <h1 className="!mb-0">Products</h1>
        </div>

        <div className="flex items-center flex-wrap mb-4 lg:mb-6 gap-3 md:gap-4">
          <Input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-fit"
          />

          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full md:w-[160px]"
          />

          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full md:w-[160px]"
          />

          <Button
            variant="default"
            onClick={() => setShowFavorites((prev) => !prev)}
            className="hidden md:block"
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowFavorites((prev) => !prev)}
            className="block md:hidden"
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </Button>

          <Button
            variant="default"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMinPrice('');
              setMaxPrice('');
              setShowFavorites(false);
              setCurrentPage(1);
            }}
            className="hidden md:block"
          >
            Reset Filters
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMinPrice('');
              setMaxPrice('');
              setShowFavorites(false);
              setCurrentPage(1);
            }}
            className="block md:hidden"
          >
            Reset Filters
          </Button>
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

        <div className="flex flex-col md:flex-row items-center justify-between mt-4 lg:mt-6">
          <Select
            defaultValue="6"
            onValueChange={(value) => {
              setCurrentPage(1);
              setProductsPerPage(value === 'all' ? 'all' : parseInt(value));
            }}
          >
            <SelectTrigger>
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

          {totalPages > 1 && (
            <Pagination className="w-fit mt-4 md:m-0">
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
                      className="cursor-pointer"
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
          )}
        </div>
      </div>
    </div>
  );
}
