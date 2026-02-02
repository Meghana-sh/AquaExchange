const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  waterQuality: {
    type: String,
    enum: ['potable', 'industrial', 'agricultural', 'construction'],
    required: true
  },
  quantity: {
    available: {
      type: Number,
      required: true // in liters
    },
    unit: {
      type: String,
      default: 'liters'
    }
  },
  pricing: {
    pricePerUnit: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  availability: {
    status: {
      type: String,
      enum: ['available', 'limited', 'sold-out'],
      default: 'available'
    },
    deliveryOptions: {
      type: [String],
      enum: ['pickup', 'delivery'],
      default: ['pickup']
    }
  },
  qualityCertificates: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  testReports: {
    ph: Number,
    tds: Number, // Total Dissolved Solids
    turbidity: Number,
    lastTested: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for location-based searches
listingSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
