import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const MOCK_ORDERS = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'completed',
    total: 400,
    items: [
      { name: "Chef's Special Biryani", quantity: 2, price: 180 },
      { name: 'Grilled Chicken Platter', quantity: 1, price: 220 },
    ],
  },
  {
    id: '2',
    date: '2024-03-14',
    status: 'completed',
    total: 150,
    items: [
      { name: 'Vegetarian Thali', quantity: 1, price: 150 },
    ],
  },
];

export function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-lg">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-lg">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Student ID</label>
            <p className="mt-1 text-lg">{user?.studentId}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Order History</h2>
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{order.total}</p>
                  <p className="text-sm capitalize text-green-600">{order.status}</p>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p>
                      {item.name} x {item.quantity}
                    </p>
                    <p>৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}