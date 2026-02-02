const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/listings
// @desc    Get all listings with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, waterQuality, minPrice, maxPrice, status } = req.query;

    let query = { isActive: true };

    if (city) query['location.city'] = new RegExp(city, 'i');
    if (waterQuality) query.waterQuality = waterQuality;
    if (status) query['availability.status'] = status;
    if (minPrice || maxPrice) {
      query['pricing.pricePerUnit'] = {};
      if (minPrice) query['pricing.pricePerUnit'].$gte = minPrice;
      if (maxPrice) query['pricing.pricePerUnit'].$lte = maxPrice;
    }

    const listings = await Listing.find(query)
      .populate('seller', 'name email phone sellerDetails.businessName')
      .sort('-createdAt');

    res.json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/listings/:id
// @desc    Get single listing
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('seller', 'name email phone sellerDetails rating');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private (Seller only)
router.post('/', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      seller: req.user.id
    });

    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update listing
// @access  Private (Seller/Admin)
router.put('/:id', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete listing
// @access  Private (Seller/Admin)
router.delete('/:id', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check ownership
    if (listing.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await listing.deleteOne();

    res.json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
