import { Response } from 'express'
import { prisma } from '../config/db'
import { AuthRequest } from '../middlewares/authMiddleware'

// GET /books
export const getAllBooks = async (req: AuthRequest, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.userId }
    })
    res.status(200).json({ success: true, data: books })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' })
  }
}

// GET /books/:id
export const getBookById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const bookId = id as string
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      res.status(404).json({ error: 'Livro não encontrado' })
      return
    }

    res.status(200).json({ success: true, data: book })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro' })
  }
}

// POST /books
export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const { title, author, pages, status, category, rating } = req.body

    const book = await prisma.book.create({
      data: {
        title,
        author,
        pages,
        status,
        category,
        rating,
        userId: req.userId as string
      }
    })

    res.status(201).json({ success: true, data: book })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar livro' })
  }
}

// PUT /books/:id
export const updateBook = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const bookId = id as string
    const { title, author, pages, status, category, rating } = req.body

    const book = await prisma.book.update({
      where: { id: bookId },
      data: { title, author, pages, status, category, rating }
    })

    res.status(200).json({ success: true, data: book })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar livro' })
  }
}

// DELETE /books/:id
export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const bookId = id as string

    await prisma.book.delete({ where: { id: bookId } })

    res.status(200).json({ success: true, message: 'Livro deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar livro' })
  }
}