import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { router as user } from "./user";

const prisma = new PrismaClient({});
const app = express();

app.use(express.json());
app.use("/users", user);


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)

export { prisma };