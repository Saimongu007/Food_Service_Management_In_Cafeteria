import React from 'react';
import { Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../../types';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const getAvailabilityColor = (available: boolean) =>
    available ? 'bg-green-500' : 'bg-red-500';

  const getSpiceLevelIcon = (level: string) => {
    switch (level) {
      case 'Hot':
        return <Flame className="h-4 w-4 text-red-500" />;
      case 'Medium':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 right-2 h-3 w-3 rounded-full ${getAvailabilityColor(
            item.available
          )}`}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <div className="flex items-center space-x-2">
            {item.dietaryInfo?.includes('Vegetarian') && (
              <Leaf className="h-4 w-4 text-green-500" />
            )}
            {getSpiceLevelIcon(item.spiceLevel)}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            {formatPrice(item.price)}
          </span>
          <Button
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}