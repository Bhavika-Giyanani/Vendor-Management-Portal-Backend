const Vendor = require("../models/vendorModel");

// Create a new Vendor
const createVendor = async (req, res) => {
  try {
    const { vendorName, type, employees, status } = req.body;

    // Validate input
    if (!vendorName || !type || !employees || !status) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newVendor = new Vendor({
      vendorName,
      type,
      employees,
      status,
    });

    // Save the vendor to the database
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all Vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a single Vendor by ID
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a Vendor by ID
const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(updatedVendor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a Vendor by ID
const deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getTotalVendors = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    res.status(200).json({ totalVendors });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getVendorChangeThisMonth = async (req, res) => {
  try {
    const now = new Date();

    // Start of the current month
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Start of the previous month (adjust year when the current month is January)
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1, // Decrease the month to get the previous month
      1
    );

    // If the current month is January, we need to adjust the year for the previous month
    if (now.getMonth() === 0) {
      startOfPreviousMonth.setFullYear(now.getFullYear() - 1); // Set to the previous year
    }

    // Count vendors created in the current month
    const currentMonthCount = await Vendor.countDocuments({
      createdAt: { $gte: startOfCurrentMonth },
    });

    // Count vendors created in the previous month
    const previousMonthCount = await Vendor.countDocuments({
      createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
    });

    // Calculate the change
    const change = currentMonthCount - previousMonthCount;

    // Format the change text
    const changeText =
      change >= 0 ? `+${change} this month` : `${change} this month`;

    // Send the response with the change
    res.status(200).json({ change: changeText });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  getTotalVendors,
  getVendorChangeThisMonth,
};
