import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {

  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })

  res.status(201).send(req.body)
})

app.get("/usuarios", async (req, res) => {

  const users = await prisma.user.findMany()

  res.status(200).json(users);
})

app.put("/usuarios/:id", async (req, res) => {

  console.log(req)

  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })

  res.status(201).send(req.body)
})

app.delete("/usuarios/:id", async (req, res) => {

  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).send("Usuário deletado com sucesso!")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})

/* Projeto completo Back-end/Front-end para fixar os conehcimentos em desenvolvimento

  * Entender como funciona uma API
  * Entender como funciona o método HTTP / Status HTTP
  * Entender mais sobre Query Params, Route Params e Request Body
  * Conectar com um banco de dados MongoDB
  * Conectar Back-end com Front-end
  * Entender o que é CORS
  * Entender o que é Prisma
  * Entender o que é Axios
  * Entender o que é React Hooks
  * Entender o que é Vite
  * Entender o que é Express
  * Entender o que é Node.js
  * Entender sobre a estrutura de pastas de um projeto React
  
  * Tecnologias utilizadas:

    Back-end: Node.js, Express, MongoDB, React, Axios, Cors, Prisma, Postman
    Front-end: React, Vite, Axios, React hooks,

*/