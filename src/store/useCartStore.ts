import { create } from 'zustand';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItems = currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      set({ items: updatedItems, total: calculateTotal(updatedItems) });
    } else {
      const updatedItems = [...currentItems, { ...item, quantity: 1 }];
      set({ items: updatedItems, total: calculateTotal(updatedItems) });
    }
  },
  removeItem: (itemId) => {
    const updatedItems = get().items.filter((i) => i.id !== itemId);
    set({ items: updatedItems, total: calculateTotal(updatedItems) });
  },
  updateQuantity: (itemId, quantity) => {
    const updatedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    set({ items: updatedItems, total: calculateTotal(updatedItems) });
  },
  clearCart: () => set({ items: [], total: 0 }),
}));

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};