import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Define types for JWT payload
interface JwtPayload {
  id: number;
  email: string;
}

// Login functionality
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    console.log('JWT_SECRET (login):', process.env.JWT_SECRET); // Corrected placement
    console.log('Generated Token (login):', token); // Log the token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Demo user login functionality
const demoLogin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const demoUserEmail = 'demo@smrt.com';
    let demoUser = await prisma.user.findUnique({ where: { email: demoUserEmail } });

    // Ensure demo user exists
    if (!demoUser) {
      const hashedPassword = await bcrypt.hash('demopassword', 10);
      demoUser = await prisma.user.create({
        data: {
          email: demoUserEmail,
          password: hashedPassword,
          isDemo: true,
        },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: demoUser.id, email: demoUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    console.log('JWT_SECRET (demoLogin):', process.env.JWT_SECRET); // Corrected placement
    console.log('Generated Token (demoLogin):', token); // Log the token
    res.json({ message: 'Demo login successful', token });
  } catch (error) {
    console.error('Error during demo login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User registration functionality
const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isDemo: false,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { login, demoLogin, register };
