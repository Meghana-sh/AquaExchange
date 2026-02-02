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

## 📁 Project Structure

```
AquaExchange/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Listing.js
│   │   ├── Order.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── listings.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Listings.jsx
    │   │   ├── CreateListing.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Profile.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── layouts/
    │   │   └── MainLayout.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🚀 Getting Started

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

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (Seller)
- `PUT /api/listings/:id` - Update listing (Seller)
- `DELETE /api/listings/:id` - Delete listing (Seller)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order (Buyer)
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/assign-transporter` - Assign transporter

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/verify` - Verify user
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Key Features Implementation

### 1. **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Secure password hashing

### 2. **Water Listings**
- Quality categorization (Potable, Industrial, Agricultural)
- Real-time availability tracking
- Test reports and certificates
- Location-based search

### 3. **Order Management**
- Multi-stage order workflow
- Status tracking (Pending → Confirmed → In-Transit → Delivered)
- Automated price calculation
- Payment integration ready

### 4. **Quality Assurance**
- Water quality parameters (pH, TDS, Turbidity)
- Certificate uploads
- Verification system

### 5. **Admin Dashboard**
- User verification management
- System-wide analytics
- Order monitoring
- Revenue tracking

## 🔄 Order Flow

```
1. Buyer browses listings
   ↓
2. Places order with delivery details
   ↓
3. Seller confirms order
   ↓
4. Seller assigns transporter
   ↓
5. Transporter picks up water
   ↓
6. Order status: In-Transit
   ↓
7. Delivery completed
   ↓
8. Buyer confirms & rates
```

## 📊 Database Schema

### User Model
- Personal Information
- Role (Buyer/Seller/Transporter/Admin)
- Verification Status
- Ratings

### Listing Model
- Water Quality Type
- Quantity & Pricing
- Location Details
- Quality Certificates
- Test Reports

### Order Model
- Buyer, Seller, Transporter References
- Quantity & Pricing Breakdown
- Delivery Address
- Status History
- Payment Details

### Transaction Model
- Order Reference
- Amount & Type
- Payment Gateway Details

## 🌟 Future Enhancements

- [ ] Real-time chat between users
- [ ] GPS tracking for deliveries
- [ ] Payment gateway integration
- [ ] Mobile application (React Native)
- [ ] AI-based pricing recommendations
- [ ] Water quality prediction ML model
- [ ] Multi-language support
- [ ] SMS/Email notifications
- [ ] Advanced analytics dashboard
- [ ] Blockchain for transparency

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Helmet.js for HTTP headers
- Input validation
- SQL injection prevention (NoSQL)
- XSS protection

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/aquaexchange
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update MongoDB connection string
3. Deploy backend
4. Note the deployed URL

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to backend URL
2. Build the project: `npm run build`
3. Deploy `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built for solving water scarcity through technology.

## 📞 Support

For support, email support@aquaexchange.com

---

**Made with 💧 for a better water future**
