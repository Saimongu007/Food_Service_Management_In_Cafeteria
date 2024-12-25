import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Crispy Spring Rolls',
    description: 'Hand-rolled vegetable spring rolls served with sweet chili sauce',
    price: 120,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian'],
    spiceLevel: 'Mild',
    ingredients: ['Cabbage', 'Carrots', 'Glass Noodles', 'Mushrooms'],
    popularity: 4.3,
  },
  {
    id: 'app-2',
    name: 'Prawn Tempura',
    description: 'Light and crispy battered prawns with wasabi mayo',
    price: 220,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Seafood'],
    spiceLevel: 'Mild',
    ingredients: ['Tiger Prawns', 'Tempura Batter', 'Wasabi', 'Mayo'],
    popularity: 4.6,
  },
  {
    id: 'app-3',
    name: 'Mediterranean Mezze Platter',
    description: 'Assortment of hummus, baba ganoush, falafel, and pita bread',
    price: 280,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian', 'Vegan'],
    spiceLevel: 'Mild',
    ingredients: ['Chickpeas', 'Eggplant', 'Tahini', 'Fresh Herbs'],
    popularity: 4.7,
  },

  // Main Courses
  {
    id: 'main-1',
    name: "Chef's Special Biryani",
    description: 'Fragrant basmati rice cooked with tender lamb and aromatic spices',
    price: 320,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Non-Vegetarian'],
    spiceLevel: 'Medium',
    ingredients: ['Lamb', 'Basmati Rice', 'Saffron', 'Indian Spices'],
    popularity: 4.9,
  },
  {
    id: 'main-2',
    name: 'Grilled Salmon Fillet',
    description: 'Fresh Norwegian salmon with lemon herb butter and seasonal vegetables',
    price: 380,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Seafood', 'Gluten-Free'],
    spiceLevel: 'Mild',
    ingredients: ['Salmon', 'Fresh Herbs', 'Seasonal Vegetables', 'Lemon'],
    popularity: 4.7,
  },
  {
    id: 'main-3',
    name: 'Vegetable Buddha Bowl',
    description: 'Quinoa bowl with roasted vegetables, avocado, and tahini dressing',
    price: 260,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    spiceLevel: 'Mild',
    ingredients: ['Quinoa', 'Avocado', 'Sweet Potato', 'Kale'],
    popularity: 4.5,
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Molten Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream',
    price: 180,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian'],
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Vanilla Ice Cream'],
    popularity: 4.8,
  },
  {
    id: 'des-2',
    name: 'Fresh Fruit Pavlova',
    description: 'Light meringue topped with whipped cream and seasonal fruits',
    price: 160,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Meringue', 'Fresh Cream', 'Mixed Berries', 'Passion Fruit'],
    popularity: 4.4,
  },

  // Drinks
  {
    id: 'drk-1',
    name: 'Tropical Paradise Smoothie',
    description: 'Blend of mango, pineapple, and passion fruit with coconut water',
    price: 140,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian', 'Vegan'],
    ingredients: ['Mango', 'Pineapple', 'Passion Fruit', 'Coconut Water'],
    popularity: 4.5,
  },
  {
    id: 'drk-2',
    name: 'Fresh Mint Lemonade',
    description: 'Freshly squeezed lemons with mint leaves and honey',
    price: 90,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian', 'Vegan'],
    ingredients: ['Lemon', 'Mint', 'Honey', 'Sparkling Water'],
    popularity: 4.3,
  },

  // Specials
  {
    id: 'spc-1',
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and truffle oil',
    price: 340,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Vegetarian'],
    spiceLevel: 'Mild',
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan'],
    popularity: 4.8,
  },
  {
    id: 'spc-2',
    name: 'Seafood Paella',
    description: 'Spanish rice dish with mixed seafood, saffron, and bell peppers',
    price: 420,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Seafood'],
    spiceLevel: 'Medium',
    ingredients: ['Bomba Rice', 'Mixed Seafood', 'Saffron', 'Bell Peppers'],
    popularity: 4.9,
  },
  {
    id: 'spc-3',
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with roasted potatoes and cherry sauce',
    price: 450,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&q=80',
    available: true,
    dietaryInfo: ['Non-Vegetarian'],
    spiceLevel: 'Mild',
    ingredients: ['Duck Leg', 'Herbs', 'Potatoes', 'Cherry Sauce'],
    popularity: 4.7,
  },
];