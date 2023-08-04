import {  PrismaClient } from '@prisma/client'
import express from 'express'
import { router as user } from "./user";
import { router as repository } from "./repository";
import { Octokit } from "octokit";

const prisma = new PrismaClient({ log: ["query"] });
const octokit = new Octokit({});
const app = express();

app.use(express.json());
app.use("/users", user);
app.use("/repositories", repository);


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)

export { prisma ,octokit };