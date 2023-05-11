import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

export function useProductsList() {
  return useContext(ProductsContext);
}
