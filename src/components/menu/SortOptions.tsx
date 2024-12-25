import React from 'react';

interface SortOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}