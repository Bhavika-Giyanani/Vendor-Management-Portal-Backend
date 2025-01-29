const Employee = require("../models/employeeModel");

//^ Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { employeeName, position, vendor, status } = req.body;

    if (!employeeName || !position || !vendor) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEmployee = new Employee({
      employeeName,
      position,
      vendor,
      status,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee.", error });
  }
};

//^ Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("vendor", "vendorName");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees.", error });
  }
};

//^ Get a single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id).populate(
      "vendor",
      "vendorName"
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee.", error });
  }
};

//^ Update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeName, position, vendor, status } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        employeeName,
        position,
        vendor,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee.", error });
  }
};

//^ Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee.", error });
  }
};

//^ Count the number of employees
const countEmployees = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting employees.", error });
  }
};

//^ Count the number of employees hired in the current month
const countEmployeesHiredThisMonth = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const count = await Employee.countDocuments({
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    });
    const response = {
      change: `+${count} this month`,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting employees hired this month.", error });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  countEmployees,
  countEmployeesHiredThisMonth,
};
