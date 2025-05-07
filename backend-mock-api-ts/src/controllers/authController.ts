import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { users, User } from '../data';

const SECRET = 'supersecretkey';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body as Partial<User>;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

  res.json({
    token,
    user: payload
  });
};
