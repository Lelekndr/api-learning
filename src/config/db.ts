import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try{
    await prisma.$connect()
  console.log('Banco de dados conectado')
  } catch (error){
    console.error(`Erro no banco de dados -> ${error}`)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  await prisma.$disconnect()
  console.log('Banco de dados desconectado')
}


export { prisma, disconnectDB,connectDB };