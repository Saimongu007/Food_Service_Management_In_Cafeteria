import React, { useState, useMemo } from 'react';
import { useCartStore } from '../store/useCartStore';
import { SearchBar } from '../components/menu/SearchBar';
import { CategoryFilters } from '../components/menu/CategoryFilters';
import { SortOptions } from '../components/menu/SortOptions';
import { MenuCard } from '../components/menu/MenuCard';
import { MENU_ITEMS } from '../data/menuItems';

export function Menu() {
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const filteredItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.ingredients?.some((i) => i.toLowerCase().includes(query))
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      items = items.filter((item) =>
        selectedCategories.includes(item.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    // Apply sorting
    items.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'popularity':
        default:
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return items;
  }, [searchQuery, selectedCategories, sortBy]);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <SortOptions value={sortBy} onChange={setSortBy} />
      </div>

      <CategoryFilters
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} onAddToCart={addItem} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items found matching your criteria
        </div>
      )}
    </div>
  );
}