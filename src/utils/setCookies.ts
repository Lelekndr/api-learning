import { Response } from 'express'

export const setCookie = (res: Response, token: string): void => {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 * 1000// 7 dias em ms
  })
}