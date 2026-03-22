import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { setCookie } from "../utils/setCookies";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ error: "Usuário já existe" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    //Generate JWT
    const token = generateToken(user.id);
    setCookie(res, token)
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(401).json({ error: 'Email ou senha inválidos' })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Email ou senha inválidos' })
      return
    }

    const token = generateToken(user.id)
    setCookie(res, token)
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
}

const logout = async (req: Request, res: Response) => {
  res.cookie("jwt","", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({
    status: "sucess",
    message: "Logged out Successfully"
  })
}



export { register, login, logout};
