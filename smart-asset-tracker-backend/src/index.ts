import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import assetRoutes from './routes/assets.js';
import { login, demoLogin, register } from './routes/auth.js';

config();
const app = express();


app.use(cors());
app.use(json());

// Health Check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Authentication Routes
app.post('/api/login', login);
app.post('/api/demo-login', demoLogin);
app.post('/api/register', register);

// Asset Routes
app.use('/api/assets', assetRoutes);

// Export the app for testing
export default app;

// Start the server (only when not in test environment)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
