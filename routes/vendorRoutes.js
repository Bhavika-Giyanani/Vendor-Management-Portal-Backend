const express = require("express");
const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  getTotalVendors,
  getVendorChangeThisMonth,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/", createVendor); // Create Vendor
router.get("/", getVendors); // Get all Vendors
router.get("/count", getTotalVendors); // Get Total Vendors
router.get("/change", getVendorChangeThisMonth); // Get vendor change this month

router.get("/:id", getVendorById); // Get Vendor by ID
router.put("/:id", updateVendor); // Update Vendor by ID
router.delete("/:id", deleteVendor); // Delete Vendor by ID

module.exports = router;
