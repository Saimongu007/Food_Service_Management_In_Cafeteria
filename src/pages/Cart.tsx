import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';

export function Cart() {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const { user } = useAuthStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
      </div>
    );
  }

  const handlePayment = async () => {
      navigate("/payment")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value, 10))
                }
                className="rounded border-gray-300"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-indigo-600">
              {formatPrice(total)}
            </span>
          </div>
          <Button onClick={() => handlePayment()} className="w-full">Proceed to Payment</Button>
        </div>
      </div>
    </div>
  );
}