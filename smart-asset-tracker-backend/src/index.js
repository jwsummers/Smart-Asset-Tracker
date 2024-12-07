const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Get all assets
app.get('/api/assets', async (req, res) => {
    const assets = await prisma.asset.findMany();
    res.json(assets);
  });
  
  // Create a new asset
  app.post('/api/assets', async (req, res) => {
    const { name, type, status, latitude, longitude } = req.body;
    const newAsset = await prisma.asset.create({
      data: {
        name,
        type,
        status,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.json(newAsset);
  });
  
  // Update an asset
  app.put('/api/assets/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type, status, latitude, longitude } = req.body;
    const updatedAsset = await prisma.asset.update({
      where: { id: parseInt(id) },
      data: { name, type, status, latitude, longitude },
    });
    res.json(updatedAsset);
  });
  
  // Delete an asset
  app.delete('/api/assets/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.asset.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Asset deleted' });
  });
  