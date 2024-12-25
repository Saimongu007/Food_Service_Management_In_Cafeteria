import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    // enum: ['Appetizers', 'Main Course', 'Desserts', 'Drinks', 'Specials']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  available: {
    type: Boolean,
    default: true
  },
  dietaryInfo: [{
    type: String,
    // enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Seafood', 'Non-Vegetarian']
  }],
  spiceLevel: {
    type: String,
    // enum: ['Mild', 'Medium', 'Hot']
  },
  ingredients: [{
    type: String
  }],
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Index for search functionality
menuItemSchema.index({ 
  name: 'text', 
  description: 'text', 
  category: 'text',
  ingredients: 'text' 
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;