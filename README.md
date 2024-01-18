# Task Force Challenge

A full-stack application built with Node.js/Express backend and React/Vite frontend.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (database)
- JWT Authentication

### Frontend
- React 18
- Vite
- React Router DOM
- Axios

## Getting Started

### Prerequisites
- Node.js >= 14.x
- npm >= 6.x
- MongoDB installed and running

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pascalniri/taskforce-challenge.git
cd taskforce-challenge
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

### Running the Application

#### Backend:
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

#### Frontend:
```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

## Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend `.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`:
```
VITE_API_URL=http://localhost:8000/api/v1
```

5. Open a Pull Request

## License

This project is licensed under the MIT License.