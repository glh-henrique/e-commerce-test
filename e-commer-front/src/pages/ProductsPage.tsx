import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Product { id: number; name: string; price: number; stock: number }

const ProductsPage: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then((res: { data: React.SetStateAction<Product[]>; }) => setItems(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const del = (id: number) => {
    api.delete(`/products/${id}`)
      .then(() => setItems(items.filter(i => i.id !== id)))
      .catch(() => { });
  };

  return loading ? <Loading /> : (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Link to="/products/new" className="p-4 bg-green-500 text-white rounded">+ New Product</Link>
      {items.map(prod => <ProductCard key={prod.id} product={prod} onDelete={del} />)}
    </div>
  );
};

export default ProductsPage;