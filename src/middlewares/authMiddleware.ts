import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

export interface AuthRequest extends Request {
  userId?: string
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ error: 'Não autorizado, token não encontrado' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

    req.userId = decoded.id

    next()
  } catch (error) {
    res.status(401).json({ error: 'Não autorizado, token inválido' })
  }
}