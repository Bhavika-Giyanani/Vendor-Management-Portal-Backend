const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  countEmployees,
  countEmployeesHiredThisMonth,
} = require("../controllers/employeeController.js");

const router = express.Router();

//^ Create
router.post("/", createEmployee);

//^ Get All Employee
router.get("/", getAllEmployees);

//^ Count the number of employees
router.get("/count", countEmployees);

//^ Get a single employee by ID
router.get("/:id", getEmployeeById);

//^ Update an employee
router.put("/:id", updateEmployee);

//^ delete an employee
router.delete("/:id", deleteEmployee);

//^ Count the number of employees hired in the current month
router.get("/count/hired-this-month", countEmployeesHiredThisMonth);

module.exports = router;
