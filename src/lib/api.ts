import axios from 'axios';
import type { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
  return response.data;
}
