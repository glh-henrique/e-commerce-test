import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { products } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const countProducts = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/products" className="text-xl font-bold text-gray-900 dark:text-white">My Shop</Link>

      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-2">
            {isAdmin ? (
              <Link to="/products/new" className="px-3 py-1 bg-green-500 text-white rounded">
                + New Product
              </Link>
            ) : (
              <Link to="/cart" className="px-3 py-1 bg-blue-500 text-white rounded ">
                Cart
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 ml-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                  {countProducts()}
                </span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-blue-500 text-white rounded">
            Login
          </Link>
        )}


      </div>
    </nav>
  );
}

export default Navbar;
