import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = Router();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Middleware to authenticate user
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  console.log('Authorization Header:', authHeader); // Log the authorization header

  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Log the extracted token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log('Decoded Token Payload:', decoded); // Log the decoded payload
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error authenticating user:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all assets for the authenticated user
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const assets = await prisma.asset.findMany({
      where: { userId },
    });
    res.json(assets);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new asset
router.post('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, type, status, latitude, longitude } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const newAsset = await prisma.asset.create({
      data: {
        name,
        type,
        status,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        userId,
      },
    });
    res.status(201).json(newAsset);
  } catch (err) {
    console.error('Error creating asset:', err);
    res.status(500).json({ message: 'Error creating asset' });
  }
});

// Update an asset
router.put('/:id', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, type, status, latitude, longitude } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const asset = await prisma.asset.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!asset || asset.userId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const updatedAsset = await prisma.asset.update({
      where: { id: parseInt(id, 10) },
      data: { name, type, status, latitude, longitude },
    });
    res.json(updatedAsset);
  } catch (err) {
    console.error('Error updating asset:', err);
    res.status(500).json({ message: 'Error updating asset' });
  }
});

// Delete an asset
router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const asset = await prisma.asset.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!asset || asset.userId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    await prisma.asset.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Asset deleted successfully' });
  } catch (err) {
    console.error('Error deleting asset:', err);
    res.status(500).json({ message: 'Error deleting asset' });
  }
});

export default router;
