const Project = require("../models/projectModel");
const Vendor = require("../models/vendorModel");

const createProject = async (req, res) => {
  try {
    const { project, vendor, status, completion } = req.body;

    if (!project || !vendor || !status || completion === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingVendor = await Vendor.findById(vendor);
    if (!existingVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newProject = new Project({
      project,
      vendor,
      status,
      completion,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("vendor", "vendorName");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "vendor",
      "vendorName"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("vendor", "vendorName");

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
