import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'supersecretkey';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };
    req.user = decoded;

    next();

  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
