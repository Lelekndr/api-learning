# 📚 API de Biblioteca Pessoal

API REST para gerenciamento de biblioteca pessoal, permitindo cadastrar, organizar e acompanhar livros por status de leitura e categoria.

## 🚀 Tecnologias

- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **TypeScript** — Tipagem estática
- **Prisma ORM** — Acesso ao banco de dados
- **PostgreSQL (NeonDB)** — Banco de dados na nuvem
- **JWT** — Autenticação via token
- **bcryptjs** — Hash de senhas
- **Zod** — Validação de dados
- **cookie-parser** — Gerenciamento de cookies

## 📋 Funcionalidades

- ✅ Cadastro e autenticação de usuários
- ✅ CRUD completo de livros
- ✅ Filtro de livros por usuário autenticado
- ✅ Status de leitura: `lido`, `lendo`, `quero_ler`
- ✅ Categorias: `fantasia`, `ficcao_cientifica`, `romance`, `terror`, `biografia`, `autoajuda`, `tecnologia`, `historia`, `outros`
- ✅ Avaliação de livros (1-10)
- ✅ Validação de dados com Zod
- ✅ Rotas protegidas com middleware JWT

## 🗄️ Modelo de Dados

### User
| Campo | Tipo | Descrição |
|---|---|---|
| id | String (cuid) | Identificador único |
| name | String | Nome do usuário |
| email | String | Email único |
| password | String | Senha hasheada |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

### Book
| Campo | Tipo | Descrição |
|---|---|---|
| id | String (cuid) | Identificador único |
| title | String | Título do livro |
| author | String | Autor |
| pages | Int? | Número de páginas (opcional) |
| status | BookStatus | Status de leitura |
| category | BookCategory | Categoria do livro |
| rating | Int? | Avaliação de 1 a 10 (opcional) |
| userId | String | Referência ao usuário |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

## 🔌 Endpoints

### Auth
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cadastrar usuário | ❌ |
| POST | `/auth/login` | Fazer login | ❌ |
| POST | `/auth/logout` | Fazer logout | ❌ |

### Books
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/books` | Listar todos os livros | ✅ |
| GET | `/books/:id` | Buscar livro por ID | ✅ |
| POST | `/books` | Criar livro | ✅ |
| PUT | `/books/:id` | Atualizar livro | ✅ |
| DELETE | `/books/:id` | Deletar livro | ✅ |

## 📦 Como rodar localmente

### Pré-requisitos
- Node.js v18+
- Conta no [NeonDB](https://neon.tech) (PostgreSQL gratuito)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Lelekndr/api-learning.git
cd api-learning

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="sua_connection_string_do_neon"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

### Banco de dados

```bash
# Gerar o Prisma Client
npx prisma generate

# Rodar as migrations
npx prisma migrate dev

# Popular o banco com dados de exemplo (opcional)
npm run seed
```

### Iniciar o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📝 Exemplos de uso

### Registrar usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Fazer login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Criar livro
```http
POST /books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "pages": 431,
  "status": "quero_ler",
  "category": "tecnologia"
}
```

### Atualizar status
```http
PUT /books/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "lendo"
}
```

## 📁 Estrutura do projeto

```
src/
├── config/
│   └── db.ts               # Configuração do Prisma
├── controllers/
│   ├── authController.ts   # Lógica de autenticação
│   └── bookController.ts   # Lógica de livros
├── middlewares/
│   ├── authMiddleware.ts   # Verificação do JWT
│   └── validate.ts         # Validação com Zod
├── routes/
│   ├── authRoutes.ts       # Rotas de autenticação
│   └── bookRoutes.ts       # Rotas de livros
├── utils/
│   ├── generateToken.ts    # Geração de JWT
│   └── setCookies.ts       # Configuração de cookies
├── validators/
│   ├── auth.validator.ts   # Schemas Zod de auth
│   └── book.validator.ts   # Schemas Zod de livros
└── server.ts               # Entrada da aplicação
prisma/
├── migrations/             # Histórico de migrations
├── schema.prisma           # Schema do banco
└── seed.ts                 # Dados de exemplo
```

## 👤 Autor

Feito por [Lelekndr](https://github.com/Lelekndr)
