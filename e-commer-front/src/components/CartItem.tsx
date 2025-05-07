import React from 'react'
import type { ProductCard } from '../contexts/CartContext'


interface CartItemProps {
  item: ProductCard
  onIncrement: (product: ProductCard) => void
  onDecrement: (product: ProductCard) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncrement, onDecrement }) => {
  return (
    <div className="border rounded p-4 bg-white dark:bg-gray-700 shadow flex justify-between items-center">
      <span className="text-gray-900 dark:text-gray-100">{item.name}</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onDecrement(item)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          –
        </button>
        <span className="w-8 h-8 flex justify-center items-center border rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {item.quantity}
        </span>
        <button
          onClick={() => onIncrement(item)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem
