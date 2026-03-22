import jwt from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
  const payload = { id: userId }

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d' as unknown as number
  })
  
  return token
}

