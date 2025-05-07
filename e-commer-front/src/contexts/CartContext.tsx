import React, { createContext, useMemo, useState, type ReactNode } from 'react';
import ProductCard from '../components/ProductCard';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductCard extends Product{
  quantity: number;
}

interface CartContextType {
  products: ProductCard[];
  addProduct: (product: ProductCard) => void;
  removeProduct: (product: ProductCard) => void;
  clearCart: () => void;
  totalItems: number;
  totalValue: number;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductCard[]>([]);

  const addProduct = (product: ProductCard) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const removeProduct = (product: ProductCard) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity - product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const clearCart = () => {
    setProducts([]);
  };

  const totalItems = useMemo(
    () => products.reduce((sum, it) => sum + it.quantity, 0),
    [products]
  )

  const totalValue = useMemo(
    () => products.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [products]
  )

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct, clearCart, totalItems, totalValue }}>
      {children}
    </CartContext.Provider>
  );
};

