import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductAPI } from '../pages/ProductsPage';

interface Props {
  product: ProductAPI;
  showAdminActions: boolean;
  onDelete: (id: number) => void;
  onAddToCart: (product: ProductAPI) => void;
}

const ProductCard: React.FC<Props> = ({ product, onDelete, showAdminActions, onAddToCart }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm(`Delete ${product.name}?`)) onDelete(product.id);
  };

  return (
    <div className="border rounded p-4 bg-white dark:bg-gray-700 shadow">

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
      <p className="text-gray-700 dark:text-gray-300">Price: ${product.price}</p>
      <p className="text-gray-700 dark:text-gray-300">Stock: {product.stock}</p>

      <div className="mt-2 flex space-x-2 justify-center">
        {
          showAdminActions ? (
            <>
              <button onClick={() => navigate(`/products/${product.id}`)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </>
          ) : (
            <>
              <button onClick={() => onAddToCart(product)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                Add to Cart
              </button>
            </>
          )
        }
      </div>
    </div>
  );
};

export default ProductCard;
