const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Get all assets
app.get("/api/assets", async (req, res) => {
  try {
    const assets = await prisma.asset.findMany();
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new asset
app.post("/api/assets", async (req, res) => {
  const { name, type, status, latitude, longitude } = req.body;
  try {
    const newAsset = await prisma.asset.create({
      data: {
        name,
        type,
        status,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.status(201).json(newAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating asset" });
  }
});

// Update an asset
app.put("/api/assets/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type, status, latitude, longitude } = req.body;
  try {
    const updatedAsset = await prisma.asset.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        status,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating asset" });
  }
});

// Delete an asset
app.delete("/api/assets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.asset.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Asset deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting asset" });
  }
});

// Export the app for testing
module.exports = app;

// Start the server (only when not in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
