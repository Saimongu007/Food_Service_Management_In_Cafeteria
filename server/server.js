// Import required modules
import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Routes
// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get a user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = { ...users[userIndex], name, email };
  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Mock backend API running at http://localhost:${port}`);
});