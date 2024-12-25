import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/utils';

const PAYMENT_METHODS = [
  {
    id: 'bkash',
    name: 'bKash',
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="h-6 w-6" />,
  },
];

export function Payment() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    navigate('/profile');
  };

  if (items.length === 0) {
    navigate('/menu');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-medium">
                  {item.name} x {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <p className="font-bold">Total</p>
            <p className="text-xl font-bold text-indigo-600">
              {formatPrice(total)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
        <div className="space-y-4">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                selectedMethod === method.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="hidden"
              />
              <div className="flex items-center space-x-3">
                <div className="text-indigo-600">{method.icon}</div>
                <span className="font-medium">{method.name}</span>
              </div>
            </label>
          ))}
        </div>

        <form onSubmit={handlePayment} className="mt-6 space-y-4">
          {selectedMethod === 'bkash' && (
            <Input
              label="bKash Number"
              type="tel"
              placeholder="01XXXXXXXXX"
              required
            />
          )}
          {selectedMethod === 'card' && (
            <>
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" type="text" placeholder="MM/YY" required />
                <Input label="CVV" type="text" placeholder="123" required />
              </div>
            </>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
          </Button>
        </form>
      </div>
    </div>
  );
}