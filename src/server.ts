import express from 'express'
import {config } from "dotenv"
import { connectDB, disconnectDB } from './config/db';


//Import Routes
import bookRoutes from "./routes/bookRoutes"
config();
const app = express()

app.use(express.json())
//APi Routes

app.use("/books",bookRoutes)



const PORT = 3000

const server = app.listen(PORT, async () => {
  await connectDB()
  console.log(`Servidor rodando na porta ${PORT}`)
})
process.on("unhandledRejection",(err) =>{
    console.log("Unhandled Rejection",err)
    server.close(async () =>{
        await disconnectDB()
        process.exit(1)
    })
})

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err)
    await disconnectDB()
    process.exit(1)
})

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully")
    server.close(async () => {
        await disconnectDB()
        process.exit(0)
    })
})