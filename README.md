# Food Service Management System - East Delta University Cafeteria

A web-based cafeteria management system for East Delta University students with secure authentication, menu management, and online payment integration.

## Features

- **User Authentication**
  - Student login/signup with EDU email validation
  - Admin panel for user approval
  - Secure session management

- **Menu Management**
  - Browse and search food items
  - Category filtering and sorting options
  - Real-time menu updates

- **Order Processing**
  - Shopping cart functionality
  - Payment integration (Bkash, Visa)
  - Order tracking

- **Admin Dashboard**
  - User approval system
  - Menu item management (CRUD)
  - Order monitoring

## Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI components
  - Zustand for state management

- **Backend**
  - Express.js
  - MongoDB
  - JWT authentication
  - RESTful API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Saimongu007/Food_Service_Management_In_Cafeteria.git
```

2. Install frontend dependencies:
```bash
cd Food_Service_Management_In_Cafeteria
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Configure environment variables:
   - Create `.env` file in server directory
   - Add required environment variables (MongoDB URI, JWT secret, etc.)

5. Start development servers:
```bash
# Frontend
npm run dev

# Backend
cd server
npm run dev
```

## Project Structure

```
src/           # Frontend source files
├── components/    # Reusable UI components
├── pages/         # Main application pages
├── store/         # State management
└── lib/           # Utility functions

server/        # Backend source files
├── controllers/   # Request handlers
├── models/        # Database schemas
├── routes/        # API endpoints
└── middleware/    # Custom middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

