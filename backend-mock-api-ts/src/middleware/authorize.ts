import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';


export const authorize = (...allowedRoles: Array<'admin' | 'user'>) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({
        message: 'Forbidden: insufficient rights'
      });
      return;
    }

    next();
  };
