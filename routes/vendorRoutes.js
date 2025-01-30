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

router.post("/", createVendor);
router.get("/", getVendors);
router.get("/count", getTotalVendors);
router.get("/change", getVendorChangeThisMonth);

router.get("/:id", getVendorById);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

module.exports = router;
