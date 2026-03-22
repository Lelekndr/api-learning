import { z } from 'zod'

export const createBookSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  author: z.string().min(1, 'Autor é obrigatório'),
  pages: z.number().positive('Páginas deve ser um número positivo').optional(),
  status: z.enum(['lido', 'lendo', 'quero_ler']),
  category: z.enum([
    'fantasia',
    'ficcao_cientifica',
    'romance',
    'terror',
    'biografia',
    'autoajuda',
    'tecnologia',
    'historia',
    'outros'
  ]),
  rating: z.number().min(1).max(10).optional()
})

export const updateBookSchema = createBookSchema.partial()