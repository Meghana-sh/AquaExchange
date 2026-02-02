const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: 'liters'
    }
  },
  pricing: {
    waterCost: Number,
    transportCost: Number,
    tax: Number,
    totalAmount: Number
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  deliveryType: {
    type: String,
    enum: ['pickup', 'delivery'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'assigned', 'in-transit', 'delivered', 'completed', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    timestamp: Date,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'netbanking'],
    required: true
  },
  scheduledDate: Date,
  deliveredDate: Date,
  rating: {
    buyer: {
      rating: Number,
      review: String
    },
    seller: {
      rating: Number,
      review: String
    },
    transporter: {
      rating: Number,
      review: String
    }
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `AQX${Date.now()}${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
