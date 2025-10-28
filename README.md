# Book Inventory API

A RESTful API for managing book inventory built with Node.js, Express, and MongoDB.

## Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/book-inventory-backend.git
cd book-inventory-backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file and add your MongoDB URI
```
MONGO_URI=your_mongodb_uri
PORT=5000
```

4. Start the server
```bash
npm start
```

## API Endpoints

- GET / - Welcome message
- GET /api/books - Get all books
- POST /api/books - Add new book