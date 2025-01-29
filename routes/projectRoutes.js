const express = require("express");
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // Create Project
router.get("/", getProjects); // Get all Projects
router.get("/:id", getProjectById); // Get Project by ID
router.put("/:id", updateProject); // Update Project by ID
router.delete("/:id", deleteProject); // Delete Project by ID

module.exports = router;
