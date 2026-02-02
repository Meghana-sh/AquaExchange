const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Listing = require('../models/Listing');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ 
      status: { $in: ['pending', 'confirmed', 'assigned', 'in-transit'] } 
    });

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const recentOrders = await Order.find()
      .populate('buyer', 'name')
      .populate('seller', 'name')
      .sort('-createdAt')
      .limit(10);

    res.json({
      success: true,
      data: {
        statistics: {
          totalUsers,
          totalListings,
          totalOrders,
          activeOrders
        },
        usersByRole,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/admin/users/:id/verify
// @desc    Verify seller or transporter
// @access  Private (Admin)
router.put('/users/:id/verify', async (req, res) => {
  try {
    const { verificationStatus } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role === 'seller') {
      user.sellerDetails.verificationStatus = verificationStatus;
    } else if (user.role === 'transporter') {
      user.transporterDetails.verificationStatus = verificationStatus;
    }

    await user.save();

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private (Admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .populate('transporter', 'name')
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

module.exports = router;
