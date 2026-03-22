import { prisma } from '../src/config/db'

const main = async () => {
  console.log('Populando banco de dados...')

  const user = await prisma.user.findUnique({
    where: { email: 'example@gmail.com' }
  })

  if (!user) {
    console.log('Usuário não encontrado!')
    return
  }

  await prisma.book.deleteMany()

  await prisma.book.createMany({
    data: [
      {
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        pages: 1178,
        status: 'lido',
        category: 'fantasia',
        rating: 10,
        userId: user.id
      },
      {
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J.K. Rowling',
        pages: 264,
        status: 'lido',
        category: 'fantasia',
        rating: 9,
        userId: user.id
      },
      {
        title: 'Duna',
        author: 'Frank Herbert',
        pages: 688,
        status: 'lendo',
        category: 'ficcao_cientifica',
        rating: 9,
        userId: user.id
      },
      {
        title: '1984',
        author: 'George Orwell',
        pages: 328,
        status: 'lido',
        category: 'ficcao_cientifica',
        rating: 10,
        userId: user.id
      },
      {
        title: 'It - A Coisa',
        author: 'Stephen King',
        pages: 1104,
        status: 'quero_ler',
        category: 'terror',
        userId: user.id
      },
      {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        pages: 656,
        status: 'lido',
        category: 'biografia',
        rating: 9,
        userId: user.id
      },
      {
        title: 'O Poder do Hábito',
        author: 'Charles Duhigg',
        pages: 408,
        status: 'lido',
        category: 'autoajuda',
        rating: 8,
        userId: user.id
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        pages: 431,
        status: 'lendo',
        category: 'tecnologia',
        rating: 9,
        userId: user.id
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        pages: 443,
        status: 'quero_ler',
        category: 'historia',
        userId: user.id
      },
      {
        title: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        pages: 432,
        status: 'quero_ler',
        category: 'romance',
        userId: user.id
      }
    ]
  })

  console.log('Seeding completed!')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })