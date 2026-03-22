import express from 'express'
import { protect } from '../middlewares/authMiddleware'
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController'
import { validate } from '../middlewares/validate'
import { createBookSchema, updateBookSchema } from '../validators/book.validator'

const router = express.Router()

router.get('/', protect, getAllBooks)
router.get('/:id', protect, getBookById)
router.post('/', protect, validate(createBookSchema), createBook)
router.put('/:id', protect, validate(updateBookSchema), updateBook)
router.delete('/:id', protect, deleteBook)

export default router