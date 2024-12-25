import React from 'react';
import { cn } from '../../lib/utils';

interface CategoryFiltersProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'main-course', label: 'Main Course' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'specials', label: 'Specials' },
];

export function CategoryFilters({ selectedCategories, onToggleCategory }: CategoryFiltersProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-700">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onToggleCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategories.includes(category.id)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}