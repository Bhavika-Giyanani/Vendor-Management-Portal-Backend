const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const vendorRoutes = require("./routes/vendorRoutes");
const projectRoutes = require("./routes/projectRoutes");
const employeeRoutes = require("./routes/employeeRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/vendors", vendorRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server Activated at ${PORT}`);
});
