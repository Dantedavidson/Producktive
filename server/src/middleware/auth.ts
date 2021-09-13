import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  console.log('I went off');
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied! No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECERET as string);
    console.log(decoded);
    req.token = decoded as jwt.JwtPayload;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}
