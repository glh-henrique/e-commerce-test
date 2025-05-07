import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext, type Product } from '../contexts/CartContext';

export type ProductAPI = Omit<Product, 'quantity'> & {
  stock: number;
};

const ProductsPage: React.FC = () => {
  const { isAdmin } = useContext(AuthContext);
  const { addProduct } = useContext(CartContext);
  const [items, setItems] = useState<ProductAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(
        (res: { data: React.SetStateAction<ProductAPI[]>; }) => setItems(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const del = (id: number) => {
    api.delete(`/products/${id}`)
      .then(() => setItems(items.filter(i => i.id !== id)))
      .catch(() => { });
  };

  const handleAddToCart = (product: ProductAPI) => {
    removeProductStock(product);
  };

  const removeProductStock = (product: ProductAPI) => {
    const newStock = product.stock - 1;

    if (newStock >= 0) {
      api.put(`/products/${product.id}`, { stock: newStock })
        .then(() => {
          addProduct({ ...product, quantity: 1 });
          setItems(items.map(i => i.id === product.id ? { ...i, stock: newStock } : i));
        })
        .catch(() => { });
    }
  };

  return loading ? <Loading /> : (
    <>
      <h2 className="text-2xl mb-4 mt-8 text-center">Products Catalog</h2>

      <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map(prod =>
          <ProductCard
            key={prod.id}
            product={prod}
            onDelete={del}
            onAddToCart={handleAddToCart}
            showAdminActions={isAdmin}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
