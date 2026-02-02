# 💧 AquaExchange - Water Trading Platform

A comprehensive digital platform for structured water trading that connects buyers, sellers, and transporters to solve water scarcity through efficient distribution.

## 📋 Problem Statement

Water scarcity and uneven distribution are critical challenges in many regions. While some areas face acute shortages, others have surplus water that goes unused due to lack of structured exchange mechanisms. Existing water distribution systems are manual, fragmented, and inefficient, leading to:

- ❌ Water wastage and unfair pricing
- ❌ Lack of accountability and transparency
- ❌ Poor coordination between stakeholders
- ❌ No centralized tracking system

## ✨ Our Solution

**AquaExchange** is a centralized digital platform that provides:

- ✅ **Structured Water Trading** - Marketplace for buying and selling water
- ✅ **Role-Based Access** - Separate dashboards for Buyers, Sellers, Transporters, and Admins
- ✅ **Real-Time Tracking** - Live availability and order status updates
- ✅ **Quality Assurance** - Water quality certificates and test reports
- ✅ **Transparent Pricing** - Fair market-based pricing mechanism
- ✅ **Administrative Oversight** - Complete system monitoring and analytics

## 🏗️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **TailwindCSS** for styling
- **Axios** for API calls
- **React Query** for data fetching

##  Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aquaexchange
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

6. Run the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Run the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 👥 User Roles

### 1. **Buyer**
- Browse available water listings
- Place orders for water
- Track order status
- Rate sellers and transporters

### 2. **Seller**
- Create water listings with quality details
- Manage inventory and pricing
- Assign transporters to orders
- View sales analytics

### 3. **Transporter**
- View available delivery requests
- Accept and manage deliveries
- Update delivery status
- Track earnings

### 4. **Admin**
- Verify sellers and transporters
- Monitor all transactions
- View system analytics
- Manage users and listings

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Helmet.js for HTTP headers
- Input validation
- SQL injection prevention (NoSQL)
- XSS protection

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

**Made with 💧 for a better water future**
