const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Listing = require('../models/Listing');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (Buyer)
router.post('/', protect, authorize('buyer', 'admin'), async (req, res) => {
  try {
    const { listingId, quantity, deliveryAddress, deliveryType, paymentMethod } = req.body;

    // Get listing
    const listing = await Listing.findById(listingId).populate('seller');
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check availability
    if (listing.quantity.available < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available'
      });
    }

    // Calculate pricing
    const waterCost = listing.pricing.pricePerUnit * quantity;
    const transportCost = deliveryType === 'delivery' ? 500 : 0; // Fixed transport cost
    const tax = (waterCost + transportCost) * 0.18; // 18% GST
    const totalAmount = waterCost + transportCost + tax;

    // Create order
    const order = await Order.create({
      buyer: req.user.id,
      listing: listingId,
      seller: listing.seller._id,
      quantity: { amount: quantity },
      pricing: { waterCost, transportCost, tax, totalAmount },
      deliveryAddress,
      deliveryType,
      paymentMethod,
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        updatedBy: req.user.id
      }]
    });

    // Update listing quantity
    listing.quantity.available -= quantity;
    if (listing.quantity.available === 0) {
      listing.availability.status = 'sold-out';
    }
    await listing.save();

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/orders
// @desc    Get all orders for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    // Filter based on role
    if (req.user.role === 'buyer') {
      query.buyer = req.user.id;
    } else if (req.user.role === 'seller') {
      query.seller = req.user.id;
    } else if (req.user.role === 'transporter') {
      query.transporter = req.user.id;
    }

    const orders = await Order.find(query)
      .populate('buyer', 'name email phone')
      .populate('seller', 'name email phone')
      .populate('transporter', 'name phone transporterDetails')
      .populate('listing', 'title waterQuality')
      .sort('-createdAt');

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone address')
      .populate('seller', 'name email phone')
      .populate('transporter', 'name phone transporterDetails')
      .populate('listing');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      updatedBy: req.user.id,
      notes
    });

    if (status === 'delivered') {
      order.deliveredDate = new Date();
    }

    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/orders/:id/assign-transporter
// @desc    Assign transporter to order
// @access  Private (Seller/Admin)
router.put('/:id/assign-transporter', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    const { transporterId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.transporter = transporterId;
    order.status = 'assigned';
    order.statusHistory.push({
      status: 'assigned',
      timestamp: new Date(),
      updatedBy: req.user.id,
      notes: 'Transporter assigned'
    });

    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
