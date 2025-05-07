import React, { use, useContext, useEffect } from 'react'
import CartItem from '../components/CartItem'
import { CartContext, type ProductCard } from '../contexts/CartContext';


const CartPage: React.FC = () => {
  const { products, addProduct, removeProduct, totalItems, totalValue, clearCart } = useContext(CartContext);

  const handleIncrement = (product: ProductCard) => {
    addProduct({ ...product, quantity: 1 });
  }

  const handleDecrement = (product: ProductCard) => {
    removeProduct({ ...product, quantity: 1 });
  }

  useEffect(() => {
    const clear = () => {
      if(totalItems === 0) {
        clearCart();
      }
    }

    clear();
  }, [totalItems]);

  return (
    <div className="min-h-screen pb-24 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {products.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
        {products.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Your Cart is Empty!
          </p>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-gray-900 dark:text-gray-100">
          Total Itens: <span className="font-semibold"> {totalItems}</span>
        </div>
        <div className="text-gray-900 dark:text-gray-100">
          Price total: <span className="font-semibold">$ {totalValue}</span>
        </div>
        <button
          onClick={() => alert('Finalizando compra...')}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Finish
        </button>
      </div>
    </div>
  )
}

export default CartPage
