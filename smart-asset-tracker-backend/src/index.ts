import express, { json } from 'express';
import cors, { CorsOptions } from 'cors';
import { config } from 'dotenv';
import assetRoutes from './routes/assets.js';
import { login, demoLogin, register } from './routes/auth.js';

config();
const app = express();

// CORS Configuration
const allowedOrigins: string[] = [
  'https://smrt-kappa.vercel.app',
  'http://localhost:5173',
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// Apply CORS middleware
app.use(cors(corsOptions));
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
